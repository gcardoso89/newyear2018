import Text from "./Text";
import { RESPONSIVE_WIDTH_ARRAY, FONT_SIZE_LIST, EVENTS, PIXEL_RATIO } from "../constants";
import * as CONFIG from "../config";
import globalEmitter from "./Emitter";

const TIME_BETWEEN_TEXTS = 100;
const OVERLAP_TIME_TEXTS = 0;

const DELAY_DURATION = 4635;
const FINAL_SPEED = 1000;
const DECREASE_SPEED = 2;

const FONT_SIZE_MAP = (function ( fontSizeList ) {
	let map = {};

	for ( let i = 0; i < RESPONSIVE_WIDTH_ARRAY.length; i++ ) {
		let width = RESPONSIVE_WIDTH_ARRAY[ i ];
		map[ width ] = fontSizeList[ i ];
	}

	return map;
})( FONT_SIZE_LIST );

const DELAY_BEFORE_SHOW_DETAIL = 1000;

const WORD_LIST = CONFIG.wordList;

export default class WordSlider {

	constructor() {
		this._isActive = false;
		this._startTime = null;
		this._currentText = 0;
		this._currentTime = 0;
		this._currentSpeed = TIME_BETWEEN_TEXTS;
		this._startDecreasingSpeed = null;
		this._currentTimeStamp = null;
		this._currentFontSize = null;
		this._textArr = WordSlider.createTextArray();
		this._button = document.getElementById( 'stop-slider' );
		this._win = window;

		this._resizeHandlerTimeout = null;

		this._button.addEventListener( 'click', this._stopSlider.bind( this ) );
		this._win.addEventListener( 'resize', () => {
			if ( this._resizeHandlerTimeout ) {
				clearTimeout( this._resizeHandlerTimeout );
				this._resizeHandlerTimeout = null;
			}
			this._resizeHandlerTimeout = setTimeout( this._handleResize.bind( this ), 500 );
		} );

		globalEmitter.subscribe( EVENTS.PLAY_WORD_SLIDER, () => this.start() );
	}

	_stopSlider( e ) {
		e.preventDefault();
		if ( !this._startDecreasingSpeed ) {
			this._startDecreasingSpeed = this._currentTimeStamp;
		}
		if ( this._button.className.indexOf( " inactive" ) === -1 ){
			this._button.className += " inactive";
		}
	}

	_handleResize() {
		let newFontSize;
		this._currentWidth = this._win.innerWidth;
		if ( this._currentWidth >= RESPONSIVE_WIDTH_ARRAY[ 0 ] ) {
			newFontSize = FONT_SIZE_MAP[ RESPONSIVE_WIDTH_ARRAY[ 0 ] ];
		} else {
			for ( let i = 0; i < RESPONSIVE_WIDTH_ARRAY.length; i++ ) {
				if ( this._currentWidth < RESPONSIVE_WIDTH_ARRAY[ i ] ) {
					let indNormalized = ( ( i + 1 ) === RESPONSIVE_WIDTH_ARRAY.length ) ? i : ( i + 1 );
					newFontSize = FONT_SIZE_MAP[ RESPONSIVE_WIDTH_ARRAY[ indNormalized ] ];
				}
			}
		}

		if ( newFontSize !== this._currentFontSize ) {
			this._currentFontSize = newFontSize;
			this.changeFontSize();
		}
	}

	start() {
		this._handleResize();
		this._isActive = true;
		this._startTime = Date.now();
		this._currentText = 0;
		this._currentTime = 0;
		this._currentSpeed = TIME_BETWEEN_TEXTS;
		this._button.className = this._button.className.replace(" inactive", "");
		for ( let i = 0; i < this._textArr.length; i++ ) {
			this._textArr[ i ].stop();
			this._textArr[ i ].setDuration( this._currentSpeed + OVERLAP_TIME_TEXTS );
		}
		this._button.blur();
		this._textArr[ this._currentText ].start();
	}

	update( timeDelta, timestamp ) {
		if ( this._isActive ) {

			if ( this._currentTime >= this._currentSpeed ) {
				this._currentTime = 0;
				this._textArr[ this._currentText ].stop();
				this._currentText = ( this._currentText + 1 === WORD_LIST.length ? 0 : this._currentText + 1 );
				this._textArr[ this._currentText ].start();
			}

			this._currentTime += timeDelta;

			if ( this._startDecreasingSpeed ) {
				this._currentSpeed = this._currentSpeed >= FINAL_SPEED ? FINAL_SPEED : this._currentSpeed + DECREASE_SPEED;
			}

			for ( let i = 0; i < this._textArr.length; i++ ) {
				let text = this._textArr[ i ];
				if ( this._startDecreasingSpeed ) {
					text.setDuration( this._currentSpeed + OVERLAP_TIME_TEXTS );
				}
				text.update( timeDelta, timestamp );
			}

			if ( this._startDecreasingSpeed && timestamp - this._startDecreasingSpeed > DELAY_DURATION ) {
				this._startDecreasingSpeed = false;
				this._isActive = false;
				setTimeout( () => globalEmitter.invoke( EVENTS.RESOLUTION_WINNER, this._textArr[ this._currentText ]._text ), DELAY_BEFORE_SHOW_DETAIL );
			}

		}
		this._currentTimeStamp = timestamp;
	}

	draw( ctx, canvas ) {
		for ( let i = 0; i < this._textArr.length; i++ ) {
			let currentText = this._textArr[ i ];
			if ( currentText.isActive() ){
				currentText.draw( ctx, canvas );
			}
		}
	}

	static createTextArray() {
		let arr = [];
		for ( let i = 0; i < WORD_LIST.length; i++ ) {
			arr.push( new Text( WORD_LIST[ i ], { animDuration: TIME_BETWEEN_TEXTS + OVERLAP_TIME_TEXTS } ) );
		}
		return arr;
	}

	changeFontSize() {
		for ( let i = 0; i < this._textArr.length; i++ ) {
			this._textArr[ i ].setFontSize( this._currentFontSize );
		}
	}
}