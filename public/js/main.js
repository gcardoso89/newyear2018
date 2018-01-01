import {EVENTS, RESPONSIVE_WIDTH_ARRAY} from "./constants";
import Quiz from "./modules/Quiz";
import globalEmmiter from "./modules/Emitter";

(function () {
	class MainApp {
		constructor() {
			this._quiz = new Quiz();
			this._container = document.querySelector('main');
			globalEmmiter.subscribe(EVENTS.GO_TO_SECTION, this.goToSection.bind(this));
		};

		goToSection(evt, sectionIndex) {
			this._container.style = `transform: translateY(-${sectionIndex.toString() * 100}vh);`
		}
	}

	new MainApp();
})();
