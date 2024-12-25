<template>
	<CdxDialog
		v-model:open="open"
		title="C helper - Informer un utilisateur"
		:primary-action="{
			label: 'Valider la requête',
			actionType: 'progressive',
			disabled: !canSubmit
		}"
		:default-action="{ label: 'Fermer' }"
		@primary="onPrimaryAction"
		@default="onDefaultAction"
	>
		<div class="message-manager">
			<div class="subst-section">
				<CdxCheckbox v-model="substCheckbox">
					Substituer les modèles
				</CdxCheckbox>
			</div>

			<template v-for="( templates, category ) in groupedTemplates" :key="category">
				<div class="message-group">
					<CdxLabel class="group-label">
						{{ category }}
					</CdxLabel>

					<div
						v-for="template in templates"
						:key="template.display"
						class="template-container"
					>
						<CdxRadio
							v-model="selectedTemplate"
							:input-value="template.display"
							name="message-radio"
							class="template-radio"
						>
							{{ template.display }}
							<template v-if="template.help" #description>
								{{ template.help }}
							</template>
						</CdxRadio>

						<div
							v-show="selectedTemplate === template.display && template.required?.includes( 'page' )"
							class="page-input-container"
						>
							<CdxField :status="getPageInputStatus( template )">
								<CdxLabel>Article modifié :</CdxLabel>
								<CdxTextInput v-model="pageInput"></CdxTextInput>
							</CdxField>
						</div>

						<div
							v-show="selectedTemplate === template.display && template.extra"
							class="extra-input"
						>
							<CdxField
								:status="getExtraInputStatus( template.display )"
							>
								<CdxLabel>{{ template.extra }}</CdxLabel>
								<CdxTextInput
									v-model="extraInputs[template.display]"
									:disabled="selectedTemplate !== template.display"
								></CdxTextInput>
							</CdxField>
						</div>
					</div>
				</div>
			</template>
		</div>
	</CdxDialog>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { CdxCheckbox, CdxDialog, CdxLabel, CdxTextInput, CdxRadio, CdxField } from '@wikimedia/codex';
import { templates, categories } from './messageTemplates';

interface Template {
	category: number;
	display: string;
	template: string;
	help: string;
	extra?: string;
	reason?: string;
	required?: string[];
}

export default defineComponent( {
	name: 'UserMessageManager',
	components: {
		CdxCheckbox,
		CdxDialog,
		CdxLabel,
		CdxTextInput,
		CdxRadio,
		CdxField
	},
	setup() {
		const open = ref( true );
		const pageInput = ref( '' );
		const substCheckbox = ref( true );
		const selectedTemplate = ref( '' );
		const extraInputs = ref<Record<string, string>>( {} );

		const currentTemplate = computed( () => {
			return templates.find( ( t ) => t.display === selectedTemplate.value );
		} );

		const getPageInputStatus = ( template: Template ) => {
			if ( !template.required?.includes( 'page' ) ) {
				return 'default';
			}
			if ( selectedTemplate.value === template.display && !pageInput.value ) {
				return 'error';
			}
			return 'default';
		};

		const getExtraInputStatus = ( templateDisplay: string ) => {
			// Toujours retourne 'default' car l'extra est facultatif
			return 'default';
		};

		const canSubmit = computed( () => {
			if ( !selectedTemplate.value ) {
				return false;
			}

			const template = currentTemplate.value;
			if ( !template ) {
				return false;
			}

			if ( template.required?.includes( 'page' ) && !pageInput.value ) {
				return false;
			}
			// On retire la vérification des champs extra car ils sont facultatifs

			return true;
		} );

		const groupedTemplates = computed( () => {
			return templates.reduce( ( acc: Record<string, Template[]>, template ) => {
				const category = categories[ template.category ].display;
				if ( !acc[ category ] ) {
					acc[ category ] = [];
				}
				acc[ category ].push( template );
				return acc;
			}, {} );
		} );

		const getLastEditOnPage = async ( page: string, user: string ): Promise<string> => {
			try {
				const data = await new mw.Api().get( {
					action: 'query',
					prop: 'revisions',
					titles: page,
					rvuser: user,
					rvlimit: 1,
					rvprop: 'ids',
					formatversion: 2
				} );

				if ( !data.query.pages ) {
					throw new Error( 'Titre de page erroné' );
				}

				const pageData = data.query.pages[ 0 ];
				if ( !pageData.revisions ) {
					if ( pageData.missing ) {
						throw new Error( 'Page non trouvée' );
					}
					if ( pageData.invalid ) {
						throw new Error( 'Titre de page invalide' );
					}
					throw new Error( 'Révision non trouvée' );
				}

				return String( pageData.revisions[ 0 ].revid );
			} catch ( error ) {
				mw.notify( `Erreur lors de la récupération de la révision : ${ error }`, { type: 'error' } );
				return '';
			}
		};

		const generateTemplateText = async () => {
			const targetPage = pageInput.value || mw.config.get( 'wgPageName' ).replaceAll( '_', ' ' );
			const targetUser = document.querySelector( '.diff' ) ?
				( document.querySelector( '.diff-ntitle .mw-userlink' ) as HTMLElement )?.textContent || '' :
				mw.config.get( 'wgRelevantUserName' ) || '';

			let revertedEdit = '';
			const template = templates.find( ( t ) => t.display === selectedTemplate.value );
			if ( !template ) {
				return { outputText: '', targetUser };
			}

			let templateText = template.template;

			if ( templateText.includes( '$(diff)' ) && !revertedEdit && targetPage ) {
				revertedEdit = await getLastEditOnPage( targetPage, targetUser );
			}

			templateText = templateText
				.replaceAll( '$(day)', '{{subst:CURRENTDAY}}' )
				.replaceAll( '$(month)', '{{subst:CURRENTMONTHNAME}}' )
				.replaceAll( '$(year)', '{{subst:CURRENTYEAR}}' )
				.replaceAll( '$(page)', targetPage )
				.replaceAll( '$(diff)', revertedEdit )
				.replaceAll( '$(user)', mw.config.get( 'wgUserName' ) || '' )
				.replaceAll( '$(extra)', extraInputs.value[ template.display ] || '' );

			const subst = substCheckbox.value ? 'subst:' : '';
			return {
				outputText: `\n\n{{${ subst }${ templateText }}}\n~~~~`,
				targetUser
			};
		};

		const onPrimaryAction = async () => {
			if ( !canSubmit.value ) {
				return;
			}

			open.value = false;
			const { outputText, targetUser } = await generateTemplateText();

			try {
				await new mw.Api().postWithToken( 'csrf', {
					action: 'edit',
					title: `Discussion utilisateur:${ targetUser }`,
					appendtext: outputText,
					summary: `Message utilisateur : ${ selectedTemplate.value }`,
					tags: 'C-helper'
				} );

				mw.notify( 'Le message a bien été ajouté.', { title: 'C-helper', type: 'success' } );
			} catch ( error ) {
				mw.notify( 'Erreur lors de l\'ajout du message.', { title: 'C-helper', type: 'error' } );
			}
		};

		const onDefaultAction = () => {
			open.value = false;
		};

		return {
			open,
			pageInput,
			substCheckbox,
			selectedTemplate,
			extraInputs,
			groupedTemplates,
			canSubmit,
			getPageInputStatus,
			getExtraInputStatus,
			onPrimaryAction,
			onDefaultAction
		};
	}
} );
</script>

<style>
.message-manager {
	max-height: 70vh;
	overflow-y: auto;
	padding: 1em;
}

.subst-section {
	margin-bottom: 1em;
}

.message-group {
	margin-bottom: 1.5em;
}

.group-label {
	font-weight: bold;
	margin-bottom: 0.5em;
	color: #54595d;
}

.template-container {
	margin: 0.5em 0;
}

.page-input-container,
.extra-input {
	margin: 0.5em 0 0.5em 1.5em;
}
</style>
