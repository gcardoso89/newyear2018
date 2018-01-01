var express = require('express');
var router = express.Router();
var config = require('../public/js/config');
var questions = require('../public/js/questions');
var availableProfiles = questions.reduce(function (previous, question) {
	for (var i = 0; i < question.answers.length; i++) {
		var profile = question.answers[i].profileUrl;
		if (previous.indexOf(profile) === -1) previous.push(profile);
	}
	return previous;
}, []);

function generateNewColor() {
	var color = config.colorList[Math.floor(Math.random() * ( config.colorList.length - 1 ))];
	var colorName = config.colorMap[color];
	return colorName;
}

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', {classColorName: 'color-' + generateNewColor(), layout: null, questions: questions});
});

router.get('/:result', function (req, res, next) {
	var result = req.params.result;
	if (availableProfiles.indexOf(result) === -1) result = undefined;
	res.render('index', {classColorName: 'color-' + generateNewColor(), layout: null, result: result});
});

module.exports = router;
