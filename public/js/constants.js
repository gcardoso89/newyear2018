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

export const CANVAS_DIMENSIONS = {
	width: 1024,
	height: 540
};

export const RESPONSIVE_WIDTH_ARRAY = [ 1980, 1080, 1024, 768, 728, 480, 380 ];
export const FONT_SIZE_LIST = [ 138, 112, 88, 88, 56, 56, 45 ];

export const EVENTS = {
	RESOLUTION_WINNER: 'RESOLUTION_WINNER', //arg1: text {string}
	PLAY_WORD_SLIDER: 'PLAY_WORD_SLIDER',
	SET_SOCIAL_LINKS: 'SET_SOCIAL_LINKS' //arg1: shareId {string}
};

