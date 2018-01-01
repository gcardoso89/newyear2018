import { EVENTS } from '../constants';
import globalEmmiter from './Emitter';

class Quiz {
	constructor() {
		this._results = {};
		this._quiz = document.getElementById('quiz');
		this._quiz.addEventListener('submit', this.checkFinalResult.bind(this));
		this._resetButton = document.querySelector('input[type="reset"]');
		let radioList = document.querySelectorAll('input[type="radio"]');
		radioList.forEach(radio => {
			this._results[radio.name] = null;
			radio.addEventListener('change', this.onChangeAnswer.bind(this));
		});
	}

	onChangeAnswer(evt) {
		let element = evt.target;
		let profile = atob(element.dataset.profile);
		let question = element.name;
		if (element.checked) {
			this._results[question] = profile;
		}
		// The first index is the main one
		globalEmmiter.invoke( EVENTS.GO_TO_SECTION, parseInt(question, 10) + 1 );
	}

	reset(){
		this._resetButton.click();
		for (let question of Object.keys(this._results)) {
			this._results[question] = null;
		}
	}

	checkFinalResult(e) {
		e.preventDefault();
		let submitted = true;
		let ranking = {};
		for (let question of Object.keys(this._results)) {
			if (!this._results[question]) {
				submitted = false;
				break;
			}
			if ( !ranking[this._results[question]] ){
				ranking[this._results[question]] = 0;
			}
			ranking[this._results[question]]++;
		}
		if (!submitted) return false;
	}
}

export default Quiz;