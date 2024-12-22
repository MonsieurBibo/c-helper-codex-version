import { createApp } from 'vue';
import BandeauxManager from './BandeauxManager.vue';
import UserMessageManager from './UserMessageManager.vue';

function displayBandeauxManagerDialog() {

	const toolboxId = 'p-tb',
		toolbox = document.getElementById( toolboxId );
		// console.debug(toolbox)
	if ( !toolbox ) {
		return;
	}

	const portletLink = mw.util.addPortletLink(
		toolboxId,
		'#',
		'C-helper Bandeaux',
		'c-helper-codex-version'
	);

	portletLink.addEventListener( 'click', ( e: Event ) => {
		// Prevent scrolling that would normally occur with '#' anchor
		e.preventDefault();
		// this.open = true;

		createApp( BandeauxManager ).mount( '#app' );

		// eslint-disable-next-line no-console
		console.debug( 'mount !' );
	} );
}

function displayUserMessageManagerDialog() {

	const toolboxId = 'p-tb',
		toolbox = document.getElementById( toolboxId );
		// console.debug(toolbox)
	if ( !toolbox ) {
		return;
	}

	const portletLink = mw.util.addPortletLink(
		toolboxId,
		'#',
		'C-helper User Message',
		'c-helper-codex-version'
	);

	portletLink.addEventListener( 'click', ( e: Event ) => {
		// Prevent scrolling that would normally occur with '#' anchor
		e.preventDefault();
		// this.open = true;

		createApp( UserMessageManager ).mount( '#app' );

		// eslint-disable-next-line no-console
		console.debug( 'mount !' );
	} );
}

if ( !document.getElementById( 'app' ) ) {

	const namespace: number = mw.config.get( 'wgNamespaceNumber' );

	const appMount = document.createElement( 'div' );
	appMount.setAttribute( 'id', 'app' );
	document.querySelector( '#mw-content-text' )
		?.insertAdjacentElement( 'beforebegin', appMount );

	mw.loader.using( 'mediawiki.util' ).then( function () {

	} );
	switch ( namespace ) {
		case 0: // Espace principal
			displayBandeauxManagerDialog();
			break;

		case 1: // Discussion:
			break;

		case 2: // Utilisateur:
			// displayUserMessageManagerDialog();
			displayBandeauxManagerDialog();
			break;
		case 3: // Discussion Utilisateur :
			break;

		default:
			break;
	}

}
