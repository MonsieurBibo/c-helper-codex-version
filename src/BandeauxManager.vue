<template>
	<CdxDialog
		v-model:open="open"
		title="C-helper"
		:primary-action="{
			label: 'Appliquer',
			actionType: 'progressive',
			disabled: !canSubmit
		}"
		:default-action="{ label: 'Fermer' }"
		@primary="onPrimaryAction"
		@default="onDefaultAction">
		<div class="bandeaux-manager">
			<div class="search-section">
				<CdxTextInput
					v-model="searchQuery"
					placeholder="Rechercher un bandeau..."
					:clear-button="{ label: 'Effacer' }"
					class="search-input"
				></CdxTextInput>
			</div>

			<div v-if="selectedBandeaux.length > 0" class="selected-bandeaux">
				<CdxMessage type="notice">
					<template #header>
						Bandeaux sélectionnés ({{ selectedBandeaux.length }})
					</template>
					<span class="selection-list">
						{{ selectedBandeauxDisplay }}
					</span>
				</CdxMessage>
			</div>

			<template v-for="( groupBandeaux, category ) in filteredBandeaux" :key="category">
				<div
					v-if="groupBandeaux.length > 0"
					class="bandeau-group"
				>
					<CdxLabel class="group-label">
						{{ category }} ({{ groupBandeaux.length }})
					</CdxLabel>

					<div
						v-for="bandeau in groupBandeaux"
						:key="bandeau.template"
						class="bandeau-item">
						<CdxCheckbox
							v-model="checkboxValue"
							:input-value="bandeau.display"
							:disabled="!canSelectMore && !isSelected( bandeau.display )"
						>
							{{ bandeau.display }}
							<template v-if="bandeau.help" #description>
								{{ bandeau.help }}
							</template>
						</CdxCheckbox>

						<div v-if="isSelected( bandeau.display ) && bandeau.reason" class="input-field">
							<CdxField label-icon="info">
								<template #label>
									{{ bandeau.reason }}
								</template>
								<CdxTextInput
									v-model="reasonInputs[bandeau.display]"
									placeholder="Requis"
									:status="getReasonStatus( bandeau.display )"
								></CdxTextInput>
							</CdxField>
						</div>

						<div v-if="isSelected( bandeau.display ) && bandeau.extra" class="input-field">
							<CdxField label-icon="info">
								<template #label>
									{{ bandeau.extra }}
								</template>
								<CdxTextInput
									v-model="extraInputs[bandeau.display]"
									placeholder="Optionnel"
								></CdxTextInput>
							</CdxField>
						</div>
					</div>
				</div>
			</template>

			<CdxMessage
				v-if="Object.keys( filteredBandeaux ).length === 0"
				type="notice"
			>
				Aucun bandeau ne correspond à votre recherche
			</CdxMessage>
		</div>
	</CdxDialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import {
	CdxCheckbox,
	CdxDialog,
	CdxField,
	CdxLabel,
	CdxMessage,
	CdxTextInput
} from '@wikimedia/codex';
import { bandeaux, type Bandeau, getBandeau } from './bandeauxStore';

const MAX_SELECTIONS = 5;
const open = ref( true );
const searchQuery = ref( '' );
const checkboxValue = ref<string[]>( [] );
const reasonInputs = ref<Record<string, string>>( {} );
const extraInputs = ref<Record<string, string>>( {} );

const selectedBandeaux = computed( () =>
	bandeaux.filter( ( b ) => checkboxValue.value.includes( b.display ) )
);

const canSelectMore = computed( () =>
	checkboxValue.value.length < MAX_SELECTIONS
);

const selectedBandeauxDisplay = computed( () =>
	selectedBandeaux.value
		.map( ( b ) => b.display )
		.join( ', ' )
);

const filteredBandeaux = computed( () => {
	const query = searchQuery.value.toLowerCase().trim();
	const filtered = query ?
		bandeaux.filter( ( b ) =>
			b.display.toLowerCase().includes( query ) ||
			b.help.toLowerCase().includes( query )
		) :
		bandeaux;

	return filtered.reduce( ( acc: Record<string, Bandeau[]>, bandeau ) => {
		if ( !acc[ bandeau.category ] ) {
			acc[ bandeau.category ] = [];
		}
		acc[ bandeau.category ].push( bandeau );
		return acc;
	}, {} );
} );

const isSelected = ( display: string ) => checkboxValue.value.includes( display );

const getReasonStatus = ( display: string ) => {
	const bandeau = getBandeau( display );
	if ( !bandeau?.reason ) {
		return 'default';
	}
	// Si le message contient "facultatif", le champ n'est pas requis
	if ( bandeau.reason.toLowerCase().includes( 'facultatif' ) ) {
		return 'default';
	}
	return reasonInputs.value[ display ]?.trim() ? 'default' : 'error';
};

const canSubmit = computed( () => {
	if ( selectedBandeaux.value.length === 0 ) {
		return false;
	}

	return selectedBandeaux.value.every( ( bandeau ) => {
		// Si pas de reason ou si reason est facultatif, on valide
		if ( !bandeau.reason ||
            bandeau.reason.toLowerCase().includes( 'facultatif' ) ) {
			return true;
		}
		return reasonInputs.value[ bandeau.display ]?.trim();
	} );
} );

const generateTemplates = () => {
	return selectedBandeaux.value.map( ( bandeau ) => {
		let template = bandeau.template;
		if ( bandeau.reason ) {
			template = template.replace( '$(reason)', reasonInputs.value[ bandeau.display ] || '' );
		}
		if ( bandeau.extra ) {
			template = template.replace( '$(extra)', extraInputs.value[ bandeau.display ] || '' );
		}
		return template;
	} ).join( '\n' );
};

const onPrimaryAction = async () => {
	if ( !canSubmit.value ) {
		return;
	}

	open.value = false;
	const templates = generateTemplates();

	try {
		await new mw.Api().postWithToken( 'csrf', {
			action: 'edit',
			title: mw.config.get( 'wgPageName' ),
			prependtext: templates + '\n',
			summary: 'Ajout de bandeaux de maintenance via C-helper',
			tags: 'C-helper'
		} );

		mw.notify(
			'Bandeau(x) ajouté(s), rechargement de la page...',
			{ type: 'success', tag: 'c-helper' }
		);

		setTimeout( () => location.reload(), 2000 );
	} catch ( error ) {
		mw.notify(
			'Erreur lors de l\'ajout des bandeaux',
			{ type: 'error', tag: 'c-helper' }
		);
	}
};

const onDefaultAction = () => {
	open.value = false;
};
</script>

<style>
.bandeaux-manager {
	max-height: 70vh;
	overflow-y: auto;
	padding: 1em;
}

.search-section {
	position: sticky;
	top: 0;
	background-color: var(--background-color-base);
	padding: 1em 0;
	margin: -1em -1em 1em;
	z-index: 2;
}

.search-input {
	padding: 0 1em;
}

.selected-bandeaux {
	margin-bottom: 1.5em;
}

.group-label {
	font-weight: bold;
	color: var(--color-subtle);
	margin: 1em 0 0.5em;
}

.bandeau-group {
	margin-bottom: 1em;
}

.bandeau-item {
	padding: 0.5em 0;
}

.input-field {
	margin: 0.5em 0 0.5em 1.5em;
}

.selection-list {
	font-size: 0.875em;
	line-height: 1.25;
}
</style>
