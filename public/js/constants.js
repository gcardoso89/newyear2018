import questions from './questions';

export const PIXEL_RATIO = (function () {
	var ctx = document.createElement( "canvas" ).getContext( "2d" ),
		dpr = window.devicePixelRatio || 1,
		bsr = ctx.webkitBackingStorePixelRatio ||
			ctx.mozBackingStorePixelRatio ||
			ctx.msBackingStorePixelRatio ||
			ctx.oBackingStorePixelRatio ||
			ctx.backingStorePixelRatio || 1;
	return dpr / bsr;

})();

export const RESPONSIVE_WIDTH_ARRAY = [ 1980, 1080, 1024, 768, 728, 480, 380 ];

export const EVENTS = {
	GO_TO_SECTION: 'GO_TO_SECTION', //arg1: text {string}
	PLAY_WORD_SLIDER: 'PLAY_WORD_SLIDER',
	SET_SOCIAL_LINKS: 'SET_SOCIAL_LINKS' //arg1: shareId {string}
};

