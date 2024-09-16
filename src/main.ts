import { createApp } from 'vue';
import App from './App.vue';

if ( !document.getElementById( 'app' ) ) {

	const appMount = document.createElement( 'div' );
	appMount.setAttribute( 'id', 'app' );
	document.querySelector( '#mw-content-text' )
		?.insertAdjacentElement( 'beforebegin', appMount );

	mw.loader.using( 'mediawiki.util' ).then( function () {

		const toolboxId = 'p-tb',
			toolbox = document.getElementById( toolboxId );
			// console.debug(toolbox)
		if ( !toolbox ) {
			return;
		}

		( async () => {} )();

		const portletLink = mw.util.addPortletLink(
			toolboxId,
			'#',
			'C-helper Codex version',
			'c-helper-codex-version'
		);

		// console.debug( portletLink );

		// let appInstance = null;

		portletLink.addEventListener( 'click', ( e: Event ) => {
			// Prevent scrolling that would normally occur with '#' anchor
			e.preventDefault();
			// this.open = true;

			/* appInstance = */ createApp( App ).mount( '#app' );

			// appInstance.

			// eslint-disable-next-line no-console
			console.debug( 'mount !' );
		} );

	} );

}
