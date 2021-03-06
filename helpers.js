var register = function(Handlebars) {
	var helpers = {
		// put all of your helpers inside this object
		navNumber: function(number){
			return parseInt(number, 10) < 10 ? '0' + number : number;
		},
		// put all of your helpers inside this object
		equal: function(arg1, arg2, options){
			return arg1 === arg2 ? options.fn(this) : undefined;
		}
	};

	if (Handlebars && typeof Handlebars.registerHelper === "function") {
		// register helpers
		for (var prop in helpers) {
			Handlebars.registerHelper(prop, helpers[prop]);
		}
	} else {
		// just return helpers object if we can't register helpers here
		return helpers;
	}

};

module.exports.register = register;
module.exports.helpers = register(null);