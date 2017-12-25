import Property from "./Property";
import { PIXEL_RATIO, CANVAS_DIMENSIONS } from "../constants";

const DEFAULT_OPTIONS = {
	animDuration: 100,
	fontSize: 50
};

export default class Text {

	constructor( text, options ) {
		this._options = { ...DEFAULT_OPTIONS, ...options };

		this._startTime = null;
		this._currentTime = null;
		this._text = text;
		this._currentFontSize = this._options.fontSize;
		this._canvas = document.createElement( 'canvas' );
		this._canvas.width = CANVAS_DIMENSIONS.width * PIXEL_RATIO;
		this._canvas.height = CANVAS_DIMENSIONS.height * PIXEL_RATIO;
		this._ctx = this._canvas.getContext( '2d' );
		this._ctx.setTransform( PIXEL_RATIO, 0, 0, PIXEL_RATIO, 0, 0 );
		this._ctx.font = this._getCurrentFontExpression();
		this._ctx.textAlign = 'center';
		this._ctx.textBaseline = 'middle';
		this._ctx.fillStyle = 'white';
		this._ctx.imageSmoothingEnabled = true;
		this._textWidth = CANVAS_DIMENSIONS.width;

		this._currentDuration = this._options.animDuration;

		this._offsetX = ( this._textWidth / 2 );
		this._offsetY = CANVAS_DIMENSIONS.height / 2;
		this._isPaused = false;
		this._isActive = false;
		this._opacity = new Property( { start: 0.5, duration: this._options.animDuration } );
		this._scale = new Property( { start: 0.9, duration: this._options.animDuration } );
	}

	start() {
		this._isActive = true;
		this._opacity.start();
		this._scale.start();
		this._startTime = null;
		this._currentTime = 0;
		this._isPaused = false;
	}

	pause() {
		this._isPaused = true;
	}

	resume() {
		this._isPaused = false;
	}

	stop() {
		this._isActive = false;
		this._currentTime = this._currentDuration;
		this._isPaused = false;
	}

	update( timeDelta, timestamp ) {
		if ( this._isActive && !this._isPaused ) {
			this._startTime = this._startTime || timestamp;
			this._currentTime += timeDelta;
			if ( this._currentTime >= this._currentDuration ) {
				this._currentTime = this._currentDuration;
			}
			this._opacity.update( timeDelta, timestamp );
			this._scale.update( timeDelta, timestamp );
		}

	}

	draw( ctx ) {
		this._ctx.save();
		this._ctx.clearRect( 0, this._offsetY - ( this._currentFontSize * 1.2 ) / 2, this._canvas.width, this._currentFontSize * 1.2 );
		this._ctx.translate( this._offsetX, this._offsetY );
		this._ctx.fillText( this._text, 0, 0 );
		this._ctx.restore();
		ctx.drawImage( this._canvas, 0, 0, this._canvas.width, this._canvas.height );
	}


	setFontSize( fontSize ) {
		this._currentFontSize = fontSize;
		this._ctx.font = this._getCurrentFontExpression();
		this._ctx.clearRect( 0, 0, this._canvas.width, this._canvas.height );
	}

	setDuration( duration ) {
		this._currentDuration = duration;
		this._opacity.setDuration( duration );
		this._scale.setDuration( duration );
	}

	isActive() {
		return this._isActive;
	}

	_getCurrentFontExpression() {
		return `normal normal 900 ${this._currentFontSize}px 'Source Sans Pro'`;
	}
}