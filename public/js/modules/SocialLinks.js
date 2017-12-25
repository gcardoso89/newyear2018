import { EVENTS } from "../constants";
import globalEmitter from "./Emitter";

export default class SocialLinks {

	constructor() {
		this._shareUrl = null;
		this._baseUrl = `${location.protocol}//${location.host}/`;
		this._twitter = document.getElementById( 'social-twitter' );
		this._facebook = document.getElementById( 'social-facebook' );
		this._mail = document.getElementById( 'social-mail' );
		this._credits = document.getElementById( 'credits-link' );
		this._creditsText = document.getElementById( 'credits-text' );
		this._creditsTextLink = document.getElementById( 'credits-text-link' );

		globalEmitter.subscribe( EVENTS.SET_SOCIAL_LINKS, ( e, word ) => this._setSocialLinks( btoa( word ) ) );

		this._credits.addEventListener( 'click', (e) => { 
			e.preventDefault();
			this._creditsText.style.display = 'inline-block';
			this._credits.style.display = 'none';
		} );
	}

	_setTwitterLink() {
		let baseUrl = 'https://twitter.com/intent/tweet';
		let shareUrl = encodeURIComponent( this._shareUrl );
		baseUrl += '?url=' + shareUrl;
		baseUrl += "&text=" + encodeURIComponent( "Enfin une bonne idée pour de bonnes résolutions de début d’année. À tester sans tarder ! Merci @4aout" );

		this._twitter.addEventListener( 'click', ( e ) => {
			e.preventDefault();
			let width = 575,
				height = 400,
				left = (window.innerWidth - width) / 2,
				top = (window.innerHeight - height) / 2,
				opts = 'status=1' +
					',width=' + width +
					',height=' + height +
					',top=' + top +
					',left=' + left;
			window.open( baseUrl, 'twitter', opts );
			return false;
		} );

	}

	_setFacebookLink() {
		this._facebook.addEventListener( 'click', ( e ) => {
			e.preventDefault();
			FB.ui( {
				method: 'share',
				href: this._shareUrl
			} );
		} );
	}

	_setMailLink() {
		let subject = encodeURIComponent( 'En 2017, promis j’arrête…' );
		let bodyText = encodeURIComponent( 'Enfin une bonne idée pour de bonnes résolutions de début d’année. À tester sans tarder !' );
		this._mail.setAttribute( 'href', 'mailto:?subject=' + subject + '&body=' + bodyText );
	}

	_setSocialLinks( shareId ) {
		this._shareUrl = this._baseUrl + shareId;
		this._setTwitterLink();
		this._setFacebookLink();
		this._setMailLink();
	}
}

