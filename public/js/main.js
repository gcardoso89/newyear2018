import { EVENTS } from "./constants";
import Quiz from "./modules/Quiz";
import Nav from "./modules/Nav";
import SocialLinks from "./modules/SocialLinks";
import globalEmmiter from "./modules/Emitter";
import { getProperty } from "./modules/helpers";

(function () {
	class MainApp {
		constructor() {
			this._quiz = new Quiz();
			this._nav = new Nav();
			this._social = new SocialLinks();
			this._entranceButton = document.getElementById( 'button-entrance' );
			this._container = document.querySelector( 'main' );
			this._body = document.getElementsByTagName( 'body' )[ 0 ];
			this._questionCount = this._quiz.getNumberOfQuestions();
			globalEmmiter.subscribe( EVENTS.GO_TO_SECTION, this._goToSection.bind( this ) );
			if ( this._entranceButton ) {
				this._entranceButton.addEventListener( 'click', this._onEntranceButtonClick.bind( this ) );
			}
		};

		_onEntranceButtonClick( evt ) {
			evt.preventDefault();
			globalEmmiter.invoke( EVENTS.GO_TO_SECTION, 0 );
			this._nav.show();
		}

		_addFinalClass() {
			const currentClass = this._body.getAttribute( 'class' );
			this._body.setAttribute( 'class', currentClass.replace( ' final', '' ) );
			this._body.setAttribute( 'class', currentClass + ' final' );
		}

		_removeFinalClass() {
			const currentClass = this._body.getAttribute( 'class' );
			this._body.setAttribute( 'class', currentClass.replace( ' final', '' ) );
		}

		_goToSection( evt, sectionIndex ) {
			this._container.style = getProperty( 'transform', `translate3d(0,-${((sectionIndex + 1) * 100)}vh,0)` );
			if ( sectionIndex === this._questionCount ) {
				this._nav.hide();
				this._addFinalClass();
			}
		}
	}

	new MainApp();
})();
