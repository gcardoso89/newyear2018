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
	RESTART_QUIZ: 'RESTART_QUIZ'
};

