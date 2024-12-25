import { createApp } from 'vue';
import BandeauxManager from './BandeauxManager.vue';
import UserMessageManager from './UserMessageManager.vue';

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
		createApp( BandeauxManager ).mount( '#app-bandeaux' );
	} );
}

function displayUserMessageManagerDialog() {
	const toolboxId = 'p-tb';
	const toolbox = document.getElementById( toolboxId );

	if ( !toolbox ) {
		mw.notify( 'Erreur: Impossible de trouver la boîte à outils', { type: 'error' } );
		return;
	}

	const portletLink = mw.util.addPortletLink(
		toolboxId,
		'#',
		'C-helper Messages',
		'c-helper-codex-messages'
	);

	if ( !portletLink ) {
		mw.notify( 'Erreur: Impossible d\'ajouter le lien dans la boîte à outils', { type: 'error' } );
		return;
	}

	portletLink.addEventListener( 'click', ( e: Event ) => {
		e.preventDefault();
		createApp( UserMessageManager ).mount( '#app-messages' );
	} );
}

function initializeApp() {
	if ( document.getElementById( 'app-bandeaux' ) || document.getElementById( 'app-messages' ) ) {
		return;
	}

	const bandeauxMount = document.createElement( 'div' );
	bandeauxMount.setAttribute( 'id', 'app-bandeaux' );

	const messagesMount = document.createElement( 'div' );
	messagesMount.setAttribute( 'id', 'app-messages' );

	const contentText = document.querySelector( '#mw-content-text' );
	if ( !contentText ) {
		mw.notify( 'Erreur: Impossible de trouver l\'élément de contenu', { type: 'error' } );
		return;
	}

	contentText.insertAdjacentElement( 'beforebegin', bandeauxMount );
	contentText.insertAdjacentElement( 'beforebegin', messagesMount );

	const namespace: number = mw.config.get( 'wgNamespaceNumber' );

	switch ( namespace ) {
		case 0: // Espace principal
			displayBandeauxManagerDialog();
			// displayUserMessageManagerDialog();
			break;
		case 1: // Discussion:
			// displayUserMessageManagerDialog();
			break;
		case 2: // Utilisateur:
			displayBandeauxManagerDialog();
			displayUserMessageManagerDialog();
			break;
		case 3: // Discussion Utilisateur :
			displayUserMessageManagerDialog();
			break;
		default:
			break;
	}
}

initializeApp();
