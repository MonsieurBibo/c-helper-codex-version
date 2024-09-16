<template>
	<CdxDialog
		v-model:open="open"
		title="C-helper"
		:primary-action="{
			label: 'Appliquer',
			actionType: 'progressive'
		}"
		:default-action="{ label: 'Fermer' }"
		@primary="onPrimaryAction"
		@default="onDefaultAction">
		<div>
			<div role="group" aria-labelledby="cdx-demo-checkbox-group-label">
				<CdxLabel id="cdx-demo-checkbox-group-label">
					Checkbox group demo
				</CdxLabel>

				<div v-for="i in [1, 2, 3]">
					{{ i }}
				</div>

				<CdxCheckbox
					v-for="checkbox in checkboxes"
					:key="'checkbox-' + checkbox.value"
					v-model="checkboxValue"
					:input-value="checkbox.value">
					{{ checkbox.label }}
				</CdxCheckbox>
			</div>
		</div>
	</CdxDialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { CdxCheckbox, CdxDialog, CdxLabel } from '@wikimedia/codex';

export default defineComponent( {
	components: { CdxDialog, CdxCheckbox, CdxLabel },
	setup() {

		const bandeaux = [
			{
				category: 'Mise en forme',
				display: 'À catégoriser',
				template: '{{À catégoriser|date={{subst:CURRENTMONTHNAME}} {{subst:CURRENTYEAR}}}}',
				help: ''
			},
			{
				category: 'Mise en forme',
				display: 'À dater',
				template: '{{À dater|date={{subst:CURRENTMONTHNAME}} {{subst:CURRENTYEAR}}}}',
				help: ''
			},
			{
				category: 'Mise en forme',
				display: 'À déjargoniser',
				template: '{{À déjargoniser|date={{subst:CURRENTMONTHNAME}} {{subst:CURRENTYEAR}}}}',
				help: ''
			},
			{
				category: 'Mise en forme',
				display: 'À délister',
				template: '{{À délister|date={{subst:CURRENTMONTHNAME}} {{subst:CURRENTYEAR}}}}',
				help: ''
			},
			{
				category: 'Mise en forme',
				display: 'À désacadémiser',
				template: '{{À désacadémiser|date={{subst:CURRENTMONTHNAME}} {{subst:CURRENTYEAR}}}}',
				help: ''
			},
			{
				category: 'Mise en forme',
				display: 'À désangliciser',
				template: '{{À désangliciser|date={{subst:CURRENTMONTHNAME}} {{subst:CURRENTYEAR}}}}',
				help: ''
			},
			{
				category: 'Mise en forme',
				display: 'À fusionner',
				template: '{{À fusionner|$(extra)|date={{subst:CURRENTMONTHNAME}} {{subst:CURRENTYEAR}}}}',
				extra: 'Liste des articles à fusionner, séparés par des « | » :',
				help: ''
			},
			{
				category: 'Mise en forme',
				display: 'À illustrer',
				template: '{{À illustrer|date={{subst:CURRENTMONTHNAME}} {{subst:CURRENTYEAR}}}}',
				help: ''
			},
			{
				category: 'Mise en forme',
				display: 'À recycler',
				template: '{{À recycler|date={{subst:CURRENTMONTHNAME}} {{subst:CURRENTYEAR}}}}',
				help: ''
			},
			{
				category: 'Les plus utilisés',
				display: 'À sourcer',
				template: '{{À sourcer|date={{subst:CURRENTMONTHNAME}} {{subst:CURRENTYEAR}}}}',
				help: ''
			},
			{
				category: 'Mise en forme',
				display: 'À TeXifier',
				template: '{{À TeXifier|date={{subst:CURRENTMONTHNAME}} {{subst:CURRENTYEAR}}}}',
				help: ''
			},
			{
				category: 'Sourçage',
				display: 'À vérifier',
				template: '{{À vérifier|date={{subst:CURRENTMONTHNAME}} {{subst:CURRENTYEAR}}}}',
				help: ''
			},
			{
				category: 'Les plus utilisés',
				display: 'À wikifier',
				template: '{{À wikifier|date={{subst:CURRENTMONTHNAME}} {{subst:CURRENTYEAR}}}}',
				help: ''
			},
			{
				category: 'Les plus utilisés',
				display: 'Admissibilité',
				template: '{{Admissibilité}}',
				help: 'Attention, il faut à la suite de la pose de ce bandeau ouvrir manuellement la procédure de DDA. Suivez les explications qui apparaîtront sur le bandeau.'
			},
			{
				category: 'Les plus utilisés',
				display: 'Admissibilité à vérifier',
				template: '{{Admissibilité à vérifier|date={{subst:CURRENTMONTHNAME}} {{subst:CURRENTYEAR}}|motif=$(reason)}}',
				reason: 'Motif :',
				help: ''
			},
			{
				category: 'Mise en forme',
				display: 'Alerte langue',
				template: '{{Alerte langue|$(reason)|$(extra)}}',
				extra: 'Nom de la langue, tel qu\'utilisé dans l\'article relatif à cette langue :',
				reason: 'nom de la langue utilisée ainsi qu\'au moins une lettre de cette langue qui pourrait poser des problèmes d\'affichage :',
				help: ''
			},
			{
				category: 'Neutralité',
				display: 'Anecdotes',
				template: '{{Anecdotes}}',
				help: ''
			},
			{
				category: 'Neutralité',
				display: 'Anthropocentrisme',
				template: '{{Anthropocentrisme|date={{subst:CURRENTMONTHNAME}} {{subst:CURRENTYEAR}}}}',
				help: ''
			},
			{
				category: 'Mise en forme',
				display: 'Article court',
				template: '{{Article court|$(extra)}}',
				extra: 'Article dans lequel le sujet est plus développé :',
				help: ''
			},
			{
				category: 'Les plus utilisés',
				display: 'Article en sursis',
				template: '{{Article en sursis|timestamp={{subst:CURRENTTIMESTAMP}}}}',
				help: ''
			},
			{
				category: 'Les plus utilisés',
				display: 'Article incompréhensible',
				template: '{{Article incompréhensible|date={{subst:CURRENTMONTHNAME}} {{subst:CURRENTYEAR}}}}',
				help: ''
			},
			{
				category: 'Mise en forme',
				display: 'Article mal proportionné',
				template: '{{Article mal proportionné}}',
				help: ''
			},
			{
				category: 'Neutralité',
				display: 'Article non neutre',
				template: '{{Article non neutre|date={{subst:CURRENTMONTHNAME}} {{subst:CURRENTYEAR}}}}',
				help: ''
			},
			{
				category: 'Mise en forme',
				display: 'Av. J.-C.',
				template: '{{Av. J.-C.}}',
				help: ''
			},
			{
				category: 'Les plus utilisés',
				display: 'Avantage non déclaré',
				template: '{{Avantage non déclaré|date={{subst:CURRENTMONTHNAME}} {{subst:CURRENTYEAR}}|motif=$(reason)}}',
				reason: 'Motif :',
				help: ''
			},
			{
				category: 'Mise en forme',
				display: 'Avertissement liste wikidata',
				template: '{{Avertissement liste wikidata}}',
				help: ''
			},
			{
				category: 'Mise en forme',
				display: 'Confusion',
				template: '{{Confusion|$(reason)}}',
				reason: 'Lien(s) vers un ou plusieurs autres articles, séparés par des « | » :',
				help: ''
			},
			{
				category: 'Sourçage',
				display: 'Conventions bibliographiques',
				template: '{{Conventions bibliographiques|date={{subst:CURRENTMONTHNAME}} {{subst:CURRENTYEAR}}}}',
				help: ''
			},
			{
				category: 'Les plus utilisés',
				display: 'Copie à vérifier',
				template: '{{Copie à vérifier|1=$(reason)|date={{subst:CURRENTMONTHNAME}} {{subst:CURRENTYEAR}}}}',
				reason: 'Adresse du site copié :',
				help: ''
			},
			{
				category: 'Neutralité',
				display: 'Désaccord de neutralité',
				template: '{{Désaccord de neutralité|date={{subst:CURRENTMONTHNAME}} {{subst:CURRENTYEAR}}}}',
				help: ''
			},
			{
				category: 'Neutralité',
				display: 'Désaccord de pertinence',
				template: '{{Désaccord de pertinence|date={{subst:CURRENTMONTHNAME}} {{subst:CURRENTYEAR}}}}',
				help: ''
			},
			{
				category: 'Sourçage',
				display: 'Détournement de sources',
				template: '{{Détournement de sources}}',
				help: ''
			},
			{
				category: 'Les plus utilisés',
				display: 'En travaux',
				template: '{{En travaux|$(user)|date={{subst:CURRENTDAY}} {{subst:CURRENTMONTHNAME}} {{subst:CURRENTYEAR}}|commentaire=$(extra)}}',
				extra: 'Commentaire facultatif :',
				help: ''
			},
			{
				category: 'Mise en forme',
				display: 'Fusion technique',
				template: '{{Fusion technique|$(extra)}}',
				extra: 'Liste des articles qui font l\'objet de la fusion, sparés par des « | » :',
				help: ''
			},
			{
				category: 'Les plus utilisés',
				display: 'Internationaliser',
				template: '{{Internationaliser|date={{subst:CURRENTMONTHNAME}} {{subst:CURRENTYEAR}}}}',
				help: ''
			},
			{
				category: 'Neutralité',
				display: 'Introduction régionale',
				template: '{{Introduction régionale|date={{subst:CURRENTMONTHNAME}} {{subst:CURRENTYEAR}}}}',
				help: ''
			},
			{
				category: 'Sourçage',
				display: 'Lien internet incomplet',
				template: '{{Lien internet incomplet}}',
				help: ''
			},
			{
				category: 'Mise en forme',
				display: 'Lire d\'abord',
				template: '{{Lire d\'abord|$(extra)}}',
				extra: 'Liste des articles à lire d\'abord, séparés par des « | » :',
				help: ''
			},
			{
				category: 'Les plus utilisés',
				display: 'Mettre à jour',
				template: '{{Mettre à jour|$(reason)|date={{subst:CURRENTMONTHNAME}} {{subst:CURRENTYEAR}}|commentaire=$(extra)}}',
				extra: 'Justification de la présence du bandeau (facultatif) :',
				reason: 'Date de dernière mise à jour (facultatif) :',
				help: ''
			},
			{
				category: 'Admissibilité',
				display: 'Notoriété art',
				template: '{{Notoriété art|date={{subst:CURRENTMONTHNAME}} {{subst:CURRENTYEAR}}}}',
				help: ''
			},
			{
				category: 'Les plus utilisés',
				display: 'Orthographe',
				template: '{{Orthographe|date={{subst:CURRENTMONTHNAME}} {{subst:CURRENTYEAR}}}}',
				help: ''
			},
			{
				category: 'Sourçage',
				display: 'Pas de liens externes',
				template: '{{Pas de liens externes}}',
				help: ''
			},
			{
				category: 'Mise en forme',
				display: 'Plan',
				template: '{{Plan|date={{subst:CURRENTMONTHNAME}} {{subst:CURRENTYEAR}}}}',
				help: ''
			},
			{
				category: 'Mise en forme',
				display: 'Plusieurs en cours',
				template: '{{Plusieurs en cours}}',
				help: ''
			},
			{
				category: 'Neutralité',
				display: 'Point de vue interne',
				template: '{{Point de vue interne|date={{subst:CURRENTMONTHNAME}} {{subst:CURRENTYEAR}}}}',
				help: ''
			},
			{
				category: 'Admissibilité',
				display: 'Pour Wikiquote',
				template: '{{Pour Wikiquote}}',
				help: ''
			},
			{
				category: 'Neutralité',
				display: 'POV fork',
				template: '{{POV fork}}',
				help: ''
			},
			{
				category: 'Les plus utilisés',
				display: 'Promotionnel',
				template: '{{Promotionnel|date={{subst:CURRENTMONTHNAME}} {{subst:CURRENTYEAR}}}}',
				help: ''
			},
			{
				category: 'Les plus utilisés',
				display: 'R3R',
				template: '{{R3R|1=~~~~}}',
				help: ''
			},
			{
				category: 'Mise en forme',
				display: 'Redirect confusion',
				template: '{{Redirect confusion|$(reason)|$(extra)}}',
				extra: 'Confusion possible avec l\'article :',
				reason: 'Nom de la redirection :',
				help: ''
			},
			{
				category: 'Mise en forme',
				display: 'Résumé introductif',
				template: '{{Résumé introductif|date={{subst:CURRENTMONTHNAME}} {{subst:CURRENTYEAR}}}}',
				help: ''
			},
			{
				category: 'Mise en forme',
				display: 'Résumé introductif trop court',
				template: '{{Résumé introductif trop court|date={{subst:CURRENTMONTHNAME}} {{subst:CURRENTYEAR}}}}',
				help: ''
			},
			{
				category: 'Mise en forme',
				display: 'Résumé introductif trop long',
				template: '{{Résumé introductif trop long|date={{subst:CURRENTMONTHNAME}} {{subst:CURRENTYEAR}}}}',
				help: ''
			},
			{
				category: 'Sourçage',
				display: 'Sans source',
				template: '{{Sans source|date={{subst:CURRENTMONTHNAME}} {{subst:CURRENTYEAR}}}}',
				help: ''
			},
			{
				category: 'Neutralité',
				display: 'Scrutin en cours',
				template: '{{Scrutin en cours}}',
				help: ''
			},
			{
				category: 'Sourçage',
				display: 'Sources à lier',
				template: '{{Sources à lier|date={{subst:CURRENTMONTHNAME}} {{subst:CURRENTYEAR}}}}',
				help: ''
			},
			{
				category: 'Sourçage',
				display: 'Sources obsolètes',
				template: '{{Sources obsolètes|date={{subst:CURRENTMONTHNAME}} {{subst:CURRENTYEAR}}}}',
				help: ''
			},
			{
				category: 'Les plus utilisés',
				display: 'Sources secondaires',
				template: '{{Sources secondaires|date={{subst:CURRENTMONTHNAME}} {{subst:CURRENTYEAR}}}}',
				help: ''
			},
			{
				category: 'Les plus utilisés',
				display: 'Style non encyclopédique',
				template: '{{Style non encyclopédique|date={{subst:CURRENTMONTHNAME}} {{subst:CURRENTYEAR}}}}',
				help: ''
			},
			{
				category: 'Mise en forme',
				display: 'Synopsis',
				template: '{{Synopsis|date={{subst:CURRENTMONTHNAME}} {{subst:CURRENTYEAR}}}}',
				help: ''
			},
			{
				category: 'Mise en forme',
				display: 'Titre incorrect',
				template: '{{Titre incorrect|1=$(reason)}}',
				reason: 'Titre souhaité :',
				help: ''
			},
			{
				category: 'Les plus utilisés',
				display: 'Travail inédit',
				template: '{{Travail inédit|date={{subst:CURRENTMONTHNAME}} {{subst:CURRENTYEAR}}|Cet article peut contenir}}',
				help: ''
			},
			{
				category: 'Mise en forme',
				display: 'Trop d\'images',
				template: '{{Trop d\'images|date={{subst:CURRENTMONTHNAME}} {{subst:CURRENTYEAR}}}}',
				help: ''
			},
			{
				category: 'Mise en forme',
				display: 'Trop de citations',
				template: '{{Trop de citations|date={{subst:CURRENTMONTHNAME}} {{subst:CURRENTYEAR}}}}',
				help: ''
			},
			{
				category: 'Mise en forme',
				display: 'Trop de liens',
				template: '{{Trop de liens|date={{subst:CURRENTMONTHNAME}} {{subst:CURRENTYEAR}}}}',
				help: ''
			},
			{
				category: 'Mise en forme',
				display: 'Trop de wikiliens',
				template: '{{Trop de wikiliens|date={{subst:CURRENTMONTHNAME}} {{subst:CURRENTYEAR}}}}',
				help: ''
			},
			{
				category: 'Mise en forme',
				display: 'Trop long',
				template: '{{Trop long}}',
				help: ''
			},
			{
				category: 'Les plus utilisés',
				display: 'Typographie',
				template: '{{Typographie|date={{subst:CURRENTMONTHNAME}} {{subst:CURRENTYEAR}}}}',
				help: ''
			},
			{
				category: 'Admissibilité',
				display: 'Vérifiabilité',
				template: '{{Vérifiabilité|date={{subst:CURRENTMONTHNAME}} {{subst:CURRENTYEAR}}}}',
				help: ''
			},
			{
				category: 'Admissibilité',
				display: 'Vie privée',
				template: '{{Vie privée|date={{subst:CURRENTMONTHNAME}} {{subst:CURRENTYEAR}}}}',
				help: ''
			}
		];

		const checkboxValue = ref( [] );
		const open = ref( true );
		const checkboxes = bandeaux.map( ( bandeau ) => ( {
			label: bandeau.display,
			value: bandeau.display
		} ) );

		const generateTemplates = ( checkboxesValue: string[] ) => {
			let outputTemplates = '';
			checkboxesValue.forEach( ( value ) => {
				for ( const bandeau of bandeaux ) {
					if ( value !== bandeau.display ) {
						continue;
					}

					outputTemplates += bandeau.template + '\n';
				}
			} );
			return outputTemplates;
		};

		const sendRequest = ( templates: string ) => {
			const page = mw.config.get( 'wgPageName' );
			const params = {
				action: 'edit',
				title: page,
				summary: 'TEST C helper Codex version',
				prependtext: templates,
				tags: 'C-helper'
			};

			new mw.Api().postWithEditToken( params )
				.done( function ( /* data */ ) {
					mw.notify( 'Bandeau(x) ajouté(s), rechargement de la page...', { title: 'C-helper', type: 'success' } );
				} )
				.fail( function ( jqXHR ) {
					mw.notify( 'Erreur Réseau', { title: 'C-helper', type: 'error' } );
					console.debug( jqXHR );
				} );

		};

		function onPrimaryAction() {
			open.value = false;
			const templates = generateTemplates( checkboxValue.value );
			sendRequest( templates );
			// console.debug( 'FINISHED ?' );
			setTimeout( () => {
				location.reload();
			}, 5000 );
		}

		function onDefaultAction() {
			open.value = false;
		}
		return {
			checkboxes,
			checkboxValue,
			open,
			onPrimaryAction,
			onDefaultAction
		};
	},
	unmounted() {
	}
} );

</script>
