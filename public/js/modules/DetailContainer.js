import { EVENTS } from "../constants";
import * as CONFIG from "../config";
import globalEmitter from "./Emitter";

const WORD_DETAIL_MAP = CONFIG.wordDetailMap;

export default class DetailContainer {

	constructor() {
		this._textContainer = document.getElementById( 'text-container' );
		this._body = document.getElementsByTagName( "body" )[ 0 ];
		this._videoWrap = document.getElementById( 'video-wrap' );
		this._imageWrap = document.getElementById( 'image-wrap' );
		this._mediaContainerId = 'media-container';
		this._isYouTubeAPIReady = false;
		this._videoPlayer = null;
		this._button = document.getElementById( 'detail-button' );
		this._image = null;

		globalEmitter.subscribe( EVENTS.RESOLUTION_WINNER, ( e, text ) => this.showContainer( text ) );
		this._button.addEventListener( 'click', this._onButtonClick.bind( this ) );
		window.addEventListener( 'resize', this._onWindowResize.bind( this ) );

		this._onWindowResize();
	}

	showContainer( text ) {

		let textId = btoa( text );

		this._currentDetail = WORD_DETAIL_MAP[ text ];

		this._videoWrap.style.display = 'none';
		this._imageWrap.style.display = 'none';

		if ( !this._currentDetail ) {
			globalEmitter.invoke( EVENTS.PLAY_WORD_SLIDER );
			throw( `::DetailContainer:: Invalid detail from word ${text}` );
		}

		this._insertText();

		switch ( this._currentDetail.type ) {
			case "video":
				this._loadVideoContainer();
				break;

			case "image":
				this._loadImageContainer();
				break;

			default:
				globalEmitter.invoke( EVENTS.PLAY_WORD_SLIDER );
				alert( `No text or details found for ${text}` );
				throw( `::DetailContainer:: Invalid type check from word ${text}` );
		}

		history.pushState( textId, document.title, `/${textId}` );

	}

	static getYoutubeURL( url ) {
		let videoid = url.match( /(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/ );

		if ( videoid !== null ) {
			return videoid[ 1 ];
		}

		return null;
	}

	_onWindowResize( e ) {
		let winHeight = window.innerHeight;
		let maxHeight = winHeight * 0.3;
		let finalWidth = maxHeight * 16 / 9;

		this._videoWrap.style.maxWidth = finalWidth + 'px';
		this._videoWrap.style.height = maxHeight + 'px';
	}

	async _onButtonClick( e ) {
		e.preventDefault();

		if ( this._videoPlayer ) {
			this._videoPlayer.stopVideo();
			this._videoPlayer = null;
			this._videoWrap.innerHTML = "";
		}

		if ( this._image ) {
			this._image = null;
			this._imageWrap.innerHTML = "";
		}
		history.pushState( "", document.title, `/` );

		await this._slideOutContainer();

		globalEmitter.invoke( EVENTS.PLAY_WORD_SLIDER );
	}

	_insertText() {
		this._textContainer.innerText = this._currentDetail.text;
	}

	async _loadImageContainer() {
		await new Promise( ( resolve ) => {
			this._image = new Image();
			this._image.src = '/images/' + this._currentDetail.contentURL;
			this._image.onload = resolve;
		} );

		this._imageWrap.style.display = 'block';
		this._imageWrap.appendChild( this._image );

		await this._slideInContainer();
	}

	async _loadVideoContainer() {
		if ( !this._isYouTubeAPIReady ) {
			await new Promise( this._loadYouTubeAPIPromise.bind( this ) );
			this._isYouTubeAPIReady = true;
		}

		this._videoWrap.style.display = 'block';

		await this._slideInContainer();

		await this._createVideoInstance();

		this._videoPlayer.playVideo();
	}

	_createVideoInstance() {
		return new Promise( ( resolve ) => {
			let newVideoWrap = document.createElement( 'div' );
			newVideoWrap.id = this._mediaContainerId;
			this._videoWrap.innerHTML = "";
			this._videoWrap.appendChild( newVideoWrap );

			this._videoPlayer = new YT.Player( this._mediaContainerId, {
				width: '100%',
				height: '100%',
				videoId: DetailContainer.getYoutubeURL( this._currentDetail.contentURL ),
				playerVars: {
					controls: 0,
					loop: 1,
					showinfo: 0,
					modestbranding: 1
				},
				events: {
					'onReady': resolve
				}
			} );
		} );
	}

	_slideOutContainer() {
		return new Promise( ( resolve ) => {
			this._body.className = '';
			setTimeout( resolve, 1000 );
		} );
	}

	_slideInContainer() {
		return new Promise( ( resolve ) => {
			this._body.className = 'slide-in';
			setTimeout( resolve, 1000 );
		} );
	}

	_loadYouTubeAPIPromise( resolve, reject ) {
		let tag = document.createElement( 'script' );
		tag.src = "https://www.youtube.com/iframe_api";
		var firstScriptTag = document.getElementsByTagName( 'script' )[ 0 ];
		firstScriptTag.parentNode.insertBefore( tag, firstScriptTag );
		window[ 'onYouTubeIframeAPIReady' ] = resolve;
	}

}