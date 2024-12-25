<template>
	<CdxDialog
		v-model:open="open"
		title="C helper - Informer un utilisateur"
		:primary-action="{
			label: 'Valider la requête',
			actionType: 'progressive'
		}"
		:default-action="{ label: 'Fermer' }"
		@primary="onPrimaryAction"
		@default="onDefaultAction"
	>
		<div class="message-manager">
			<div v-if="shouldShowPageInput" class="page-input-section">
				<CdxLabel for="page-input">
					Article modifié :
				</CdxLabel>
				<CdxTextInput
					id="page-input"
					v-model="pageInput"
				></CdxTextInput>
			</div>

			<div class="subst-section">
				<CdxCheckbox
					v-model="substCheckbox"
					class="subst-checkbox"
				>
					Substituer les modèles
				</CdxCheckbox>
			</div>

			<template v-for="( templates, category ) in groupedTemplates" :key="category">
				<div class="message-group">
					<CdxLabel class="group-label">
						{{ category }}
					</CdxLabel>

					<CdxCheckbox
						v-for="template in templates"
						:key="template.display"
						v-model="selectedTemplates"
						:input-value="template.display"
						class="template-checkbox"
					>
						{{ template.display }}
						<template v-if="template.help" #description>
							{{ template.help }}
						</template>
					</CdxCheckbox>

					<div
						v-for="template in templates"
						v-show="selectedTemplates.indexOf( template.display ) >= 0 &&
							template.extra"
						:key="`extra-${template.display}`"
						class="extra-input"
					>
						<CdxLabel :for="`extra-${template.display}`">
							{{ template.extra }}
						</CdxLabel>
						<CdxTextInput
							:id="`extra-${template.display}`"
							v-model="extraInputs[template.display]"
						></CdxTextInput>
					</div>
				</div>
			</template>
		</div>
	</CdxDialog>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { CdxCheckbox, CdxDialog, CdxLabel, CdxTextInput } from '@wikimedia/codex';
import { templates, categories } from './messageTemplates';

interface Template {
	category: number;
	display: string;
	template: string;
	help: string;
	extra?: string;
	reason?: string;
}

export default defineComponent( {
	name: 'UserMessageManager',
	components: {
		CdxCheckbox,
		CdxDialog,
		CdxLabel,
		CdxTextInput
	},
	setup() {
		const open = ref( true );
		const pageInput = ref( '' );
		const substCheckbox = ref( true );
		const selectedTemplates = ref<string[]>( [] );
		const extraInputs = ref<Record<string, string>>( {} );

		const shouldShowPageInput = computed( () => {
			const namespace = mw.config.get( 'wgNamespaceNumber' );
			return namespace === 2 || namespace === 3;
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
				mw.notify( `Erreur lors de la récupération de la révision : ${ error }`,
					{ type: 'error' } );
				return '';
			}
		};

		const generateTemplateText = async () => {
			// eslint-disable-next-line es-x/no-string-prototype-replaceall
			const targetPage = pageInput.value || mw.config.get( 'wgPageName' ).replaceAll( '_', ' ' );
			let targetUser = '';

			if ( document.querySelector( '.diff' ) ) {
				targetUser = ( document.querySelector( '.diff-ntitle .mw-userlink' ) as HTMLElement )?.textContent || '';
			} else {
				targetUser = mw.config.get( 'wgRelevantUserName' ) || '';
			}

			let revertedEdit = '';
			let outputText = '';

			for ( const templateName of selectedTemplates.value ) {
				const template = templates.find( ( t ) => t.display === templateName );
				if ( !template ) {
					continue;
				}

				let templateText = template.template;

				// eslint-disable-next-line unicorn/prefer-includes
				if ( templateText.indexOf( '$(diff)' ) >= 0 && !revertedEdit && targetPage ) {
					revertedEdit = await getLastEditOnPage( targetPage, targetUser );
				}

				// eslint-disable-next-line es-x/no-string-prototype-replaceall
				templateText = templateText
					.replaceAll( '$(day)', '{{subst:CURRENTDAY}}' )
					.replaceAll( '$(month)', '{{subst:CURRENTMONTHNAME}}' )
					.replaceAll( '$(year)', '{{subst:CURRENTYEAR}}' )
					.replaceAll( '$(page)', targetPage )
					.replaceAll( '$(diff)', revertedEdit )
					.replaceAll( '$(user)', mw.config.get( 'wgUserName' ) || '' )
					.replaceAll( '$(extra)', extraInputs.value[ templateName ] || '' );

				const subst = substCheckbox.value ? 'subst:' : '';
				outputText += `\n\n{{${ subst }${ templateText }}}`;
			}

			return { outputText: outputText + '\n~~~~', targetUser };
		};

		const onPrimaryAction = async () => {
			open.value = false;

			if ( selectedTemplates.value.length === 0 ) {
				return;
			}

			const { outputText, targetUser } = await generateTemplateText();

			try {
				await new mw.Api().postWithToken( 'csrf', {
					action: 'edit',
					title: `Discussion utilisateur:${ targetUser }`,
					appendtext: outputText,
					summary: `Message utilisateur : ${ selectedTemplates.value.join( ', ' ) }`,
					tags: 'C-helper'
				} );

				mw.notify( 'Les messages ont bien été ajoutés.',
					{ title: 'C-helper', type: 'success' } );
			} catch ( error ) {
				mw.notify( 'Erreur lors de l\'ajout des messages.',
					{ title: 'C-helper', type: 'error' } );
			}
		};

		const onDefaultAction = () => {
			open.value = false;
		};

		return {
			open,
			pageInput,
			substCheckbox,
			selectedTemplates,
			extraInputs,
			shouldShowPageInput,
			groupedTemplates,
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

.page-input-section,
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

.template-checkbox {
	margin: 0.5em 0;
}

.extra-input {
	margin: 0.5em 0 0.5em 1.5em;
}
</style>
