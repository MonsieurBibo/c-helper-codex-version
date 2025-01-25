import { createApp } from 'vue';
import BandeauxManager from './BandeauxManager.vue';
import UserMessageManager from './UserMessageManager.vue';

const modules = {
	bandeaux: {
		id: 'c-helper-codex-bandeaux',
		title: 'Apposer des bandeaux de maintenance',
		label: 'Bandeaux'
	},
	messages: {
		id: 'c-helper-codex-messages',
		title: 'Laisser un message sur la pdd de l\'utilisateur',
		label: 'Message'
	}
};

function createMountPoint( id: string ): HTMLDivElement | null {
	const mountPoint = document.createElement( 'div' );
	mountPoint.setAttribute( 'id', id );
	const contentText = document.querySelector( '#mw-content-text' );
	if ( !contentText ) {
		return null;
	}
	contentText.insertAdjacentElement( 'beforebegin', mountPoint );
	return mountPoint;
}

function createMenuItem( module: typeof modules[keyof typeof modules], callback: () => void, isMinerva = false ) {
	const $item = $( '<li>' )
		.addClass( isMinerva ? 'toggle-list-item mw-list-item-js' : 'mw-list-item' )
		.attr( 'id', module.id );

	const $link = $( '<a>' )
		.addClass( isMinerva ? 'toggle-list-item__anchor' : '' )
		.attr( {
			href: '#',
			title: module.title
		} )
		.on( 'click', ( e ) => {
			e.preventDefault();
			callback();
		} );

	if ( isMinerva ) {
		$link.append(
			$( '<span>' ).addClass( 'minerva-icon' ),
			$( '<span>' ).addClass( 'toggle-list-item__label' ).text( module.label )
		);
	} else {
		$link.text( module.label );
	}

	return $item.append( $link );
}

function setupModules() {
	const skin = mw.config.get( 'skin' );
	const namespace: number = mw.config.get( 'wgNamespaceNumber' );

	const moduleCallbacks: Record<string, () => void> = {
		bandeaux: () => createApp( BandeauxManager ).mount( '#app-bandeaux' ),
		messages: () => createApp( UserMessageManager ).mount( '#app-messages' )
	};

	if ( skin === 'minerva' ) {
		const $overflowList = $( '.page-actions-overflow-list' );
		if ( !$overflowList.length ) {
			return;
		}

		switch ( namespace ) {
			case 0:
				$overflowList.append( createMenuItem( modules.bandeaux, moduleCallbacks.bandeaux, true ) );
				break;
			case 1:
				$overflowList.append( createMenuItem( modules.messages, moduleCallbacks.messages, true ) );
				break;
			case 2:
				$overflowList.append(
					createMenuItem( modules.bandeaux, moduleCallbacks.bandeaux, true ),
					createMenuItem( modules.messages, moduleCallbacks.messages, true )
				);
				break;
			case 3:
				$overflowList.append( createMenuItem( modules.messages, moduleCallbacks.messages, true ) );
				break;
		}
	} else {
		const $cactions = $( '#p-cactions' );
		if ( !$cactions.length ) {
			return;
		}

		const $clone = $cactions.clone();
		const $ul = $clone.find( 'ul' );

		$clone.removeAttr( 'id' )
			.addClass( 'vector-menu' )
			.attr( 'title', 'C-helper' )
			.find( '.vector-menu-heading' )
			.text( 'Č (version Codex)' );

		$ul.empty();

		switch ( namespace ) {
			case 0:
				$ul.append( createMenuItem( modules.bandeaux, moduleCallbacks.bandeaux ) );
				break;
			case 1:
				$ul.append( createMenuItem( modules.messages, moduleCallbacks.messages ) );
				break;
			case 2:
				$ul.append(
					createMenuItem( modules.bandeaux, moduleCallbacks.bandeaux ),
					createMenuItem( modules.messages, moduleCallbacks.messages )
				);
				break;
			case 3:
				$ul.append( createMenuItem( modules.messages, moduleCallbacks.messages ) );
				break;
		}

		if ( $ul.children().length ) {
			$clone.insertAfter( $cactions );
		}
	}
}

function initializeApp() {
	if ( $( '#app-bandeaux, #app-messages' ).length ) {
		return;
	}

	const namespace: number = mw.config.get( 'wgNamespaceNumber' );
	if ( namespace < 0 ) {
		return;
	}

	$( '<div id="app-bandeaux">' ).insertBefore( '#mw-content-text' );
	$( '<div id="app-messages">' ).insertBefore( '#mw-content-text' );
	setupModules();
}

$( initializeApp );
