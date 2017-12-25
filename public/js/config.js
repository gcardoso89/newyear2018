var CONFIG = {
	colorList : [ '#ff7376', '#ffc0db', '#7bc9cf', '#ffdc00', '#4f7ffb' ],
	colorMap: {
		'#ff7376': 'red',
		'#ffc0db': 'pink',
		'#7bc9cf': 'green',
		'#ffdc00': 'yellow',
		'#4f7ffb': 'blue'
	},
	wordDetailMap: {
		"DETTE": { type: "image", text: "de croire qu’un jour, on sera sorti de la dette.", contentURL: "1-DETTE.gif" },
		"CIGARETTES": { type: "image", text: "de dire « allez, cette fois, c’est vraiment ma dernière cigarette ».", contentURL: "2-CIGARETTES.gif" },
		"SERRE-TÊTE": { type: "image", text: "de soutenir à ma mère que « oui, oui, c’est très 2017 les serre-tête ».", contentURL: "3-SERRE-TETE.gif" },
		"BILLE EN TÊTE": { type: "image", text: "quel que soit le contexte de foncer bille en tête.", contentURL: "4-BILLE EN TETE.gif" },
		"CAFÈT": { type: "image", text: "de reprendre (juste un peu) des frites à la cafèt.", contentURL: "5-CAFET.gif" },
		"BAGUETTE": { type: "image", text: "de laisser mon boss me mener à la baguette.", contentURL: "6-BAGUETTE.gif" },
		"PÈTE": { type: "image", text: "de dire « c’est pas moi » quand je pète.", contentURL: "7-PETE.gif" },
		"COUETTE": { type: "image", text: "de passer mon dimanche sous la couette.", contentURL: "8-COUETTE.gif" },
		"TARTIFLETTE": { type: "image", text: "de passer l’hiver entre raclettes et tartiflettes.", contentURL: "9-RACLETTE_TARTIFLETTE.gif" },
		"RIME EN ETTE": { type: "image", text: "de souhaiter bonne année avec une rime en « ette ».", contentURL: "10-RIME-EN-ETTE.gif" },
		"LUNETTES": { type: "image", text: "de dire « mais non, je t’assure, je n’ai absolument pas besoin de lunettes ».", contentURL: "11-LUNETTES.gif" },
		"J'ARRÊTE": { type: "image", text: "de dire « promis en 2017, j’arrête ».", contentURL: "12-JARRETE.gif" },
		"FACETTE": { type: "image", text: "de me prendre pour Beyoncé dès qu’il y a une boule à facettes.", contentURL: "13-FACETTE.gif" },
		"INTERNET": { type: "image", text: "de zoner toute la journée sur Internet.", contentURL: "14-INTERNET.gif" },
		"TRINQUETTE": { type: "image", text: "de réclamer dramatiquement « dans les yeeeux » dès qu’il y a trinquette.", contentURL: "15-TRINQUETTE.gif" },
		"BOULETTES": { type: "video", text: "d’enchaîner boulette sur boulette.", contentURL: "https://www.youtube.com/watch?v=au0ZMqyoWwg " },
		"CACHETTE": { type: "image", text: "d’écouter Michel Sardou en cachette.", contentURL: "17-CACHETTE.gif" },
		"CHANSONNETTE": { type: "image", text: "passé 4 h du mat’ de pousser la chansonnette.", contentURL: "18-CHANSONNETTE.gif" },
		"CHARRETTE": { type: "image", text: "d’envoyer des sms pour dire « je vais avoir un peu de retard, là je suis vraiment charrette ».", contentURL: "19-CHARRETTE.gif" },
		"CHEMISETTE": { type: "image", text: "définitivement de porter des chemisettes.", contentURL: "20-CHEMISETTE.gif" },
		"COURBETTE": { type: "image", text: "de saluer systématiquement mon chef d’une courbette.", contentURL: "21-COURBETTE.gif" },
		"DISQUETTE": { type: "image", text: "de dire « quand je pense que de mon temps on stockait tout sur des disquettes ».", contentURL: "22-DISQUETTE.png" },
		"GOURMETTE": { type: "video", text: "VRAIMENT de porter une gourmette.", contentURL: "https://www.youtube.com/watch?v=0KS6tvDcCAw" },
		"CASSETTE": { type: "video", text: "de garder, juste au cas où, mon magnétocassette.", contentURL: "https://www.youtube.com/watch?v=5hb1McPIIyE" },
		"OUBLIETTES": { type: "image", text: "de fureter toute la journée sur le Facebook de son ex : AUX OUBLIETTES !", contentURL: "25-OUBLIETTES.gif" },
		"POMPETTE": { type: "image", text: "de dire « mais non, je ne suis pas bouré(e), juste un peu pompette ».", contentURL: "26-POMPETTE.gif" },
		"CHAUSSETTES": { type: "image", text: "de faire l’amour en chaussettes.", contentURL: "27-CHAUSSETTES.gif" },
		"TROTINETTE": { type: "image", text: "de trouver stylés les déplacements en trottinette.", contentURL: "28-TROTINETTE.gif" },
		"ÉPAULETTES": { type: "image", text: "de vouloir relancer la mode des épaulettes.", contentURL: "29-EPAULETTES.gif" },
		"COMÈTE": { type: "image", text: "de faire des plans sur la comète.", contentURL: "30-COMETE.gif" },
		"MAUVIETTE": { type: "video", text: "de me laisser traiter de mauviette.", contentURL: "https://www.youtube.com/watch?v=yydjQ6rYfBQ" },
		"PAILLETTE": { type: "image", text: "d’essayer de faire valider pour la 1 000ᵉ fois le motif «  paillette ».", contentURL: "32-PAILLETTE.gif" },
		"BRAGUETTE": { type: "video", text: "de ne plus devenir rouge écarlate après un « psssst, ta braguette… !».", contentURL: "https://www.youtube.com/watch?v=Com-xQ85THE" },
		"FÊTE": { type: "image", text: "d’arriver « discrètement » après un lendemain de fête.", contentURL: "34-FETE.gif" },
		"CONNECT": { type: "image", text: "d’espérer que tout le monde connaisse « FRANCE CONNECT ».", contentURL: "35-FRANCE_CONNECT.gif" },
		"KOPECK": { type: "image", text: "de penser que les pains au chocolat ne valent pas un kopeck.", contentURL: "36-KOPECK.gif" },
		"ARRÊTE": { type: "image", text: "de laisser tourner le moteur de ma voiture quand je m’arrête.", contentURL: "37-ARRETE.gif" },
		"CHAUSSETTES ": { type: "image", text: "d’élire un(e) président(e) qui nous met le moral dans les chaussettes.", contentURL: "38-CHAUSSETTES.gif" }
	},
	wordList : {}
};

CONFIG.wordList = Object.keys( CONFIG.wordDetailMap );

module.exports = CONFIG;