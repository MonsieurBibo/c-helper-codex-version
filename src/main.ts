import { createApp } from 'vue';
import BandeauxManager from './BandeauxManager.vue';

function displayBandeauxManagerDialog() {
	const toolboxId = 'p-tb';
	const toolbox = document.getElementById( toolboxId );

	if ( !toolbox ) {
		mw.notify( 'Erreur: Impossible de trouver la boîte à outils', { type: 'error' } );
		return;
	}

	const portletLink = mw.util.addPortletLink(
		toolboxId,
		'#',
		'C-helper Bandeaux',
		'c-helper-codex-version'
	);

	if ( !portletLink ) {
		mw.notify( 'Erreur: Impossible d\'ajouter le lien dans la boîte à outils', { type: 'error' } );
		return;
	}

	portletLink.addEventListener( 'click', ( e: Event ) => {
		e.preventDefault();
		createApp( BandeauxManager ).mount( '#app' );
	} );
}

function initializeApp() {
	if ( document.getElementById( 'app' ) ) {
		return;
	}

	const namespace: number = mw.config.get( 'wgNamespaceNumber' );
	const appMount = document.createElement( 'div' );
	appMount.setAttribute( 'id', 'app' );

	const contentText = document.querySelector( '#mw-content-text' );
	if ( !contentText ) {
		mw.notify( 'Erreur: Impossible de trouver l\'élément de contenu', { type: 'error' } );
		return;
	}

	contentText.insertAdjacentElement( 'beforebegin', appMount );

	switch ( namespace ) {
		case 0: // Espace principal
			displayBandeauxManagerDialog();
			break;
		case 1: // Discussion:
			break;
		case 2: // Utilisateur:
			displayBandeauxManagerDialog();
			break;
		case 3: // Discussion Utilisateur :
			break;
		default:
			break;
	}
}

// Démarrage de l'application
initializeApp();
