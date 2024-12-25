export const categories = [
	{ display: 'Souhaiter la bienvenue' },
	{ display: 'Maladresses' },
	{ display: 'Vandalisme' },
	{ display: 'Suggestion' },
	{ display: 'Liens externes' },
	{ display: 'Copyvio' },
	{ display: 'Avertissement supression' },
	{ display: 'Aide' }
];

export const templates = [
	{
		category: 0,
		display: 'Bienvenue nouveau',
		template: 'Bienvenue nouveau|$(user)|message=$(extra)',
		extra: 'Ajouter un message personnel (facultatif) :',
		help: '',
		required: []
	},
	{
		category: 0,
		display: 'Bienvenue IP',
		template: 'Bienvenue IP',
		help: '',
		required: []
	},
	{
		category: 0,
		display: 'Bienvenue IP méritante',
		template: 'Bienvenue IP méritante|$(user)|message=$(extra)',
		extra: 'Ajouter un message personnel (facultatif) :',
		help: '',
		required: []
	},
	{
		category: 1,
		display: 'Test 0',
		template: 'Test 0|$(page)|$(diff)|autre=$(extra)|user=$(user)',
		extra: 'Type de maladresse (facultatif) :',
		help: '',
		required: [ 'page' ]
	},
	{
		category: 1,
		display: 'Test ?',
		template: 'Test ?|$(page)|$(diff)',
		help: '',
		required: [ 'page' ]
	},
	{
		category: 1,
		display: 'Ajout POV',
		template: 'Ajout POV|$(page)|user=$(user)',
		help: '',
		required: [ 'page' ]
	},
	{
		category: 1,
		display: 'Non-encyclo',
		template: 'Non-encyclo|user=$(user)',
		help: '',
		required: []
	},
	{
		category: 1,
		display: 'Retrait injustifié',
		template: 'Retrait injustifié|$(page)|user=$(user)',
		help: '',
		required: [ 'page' ]
	},
	{
		category: 1,
		display: 'Ortho',
		template: 'Ortho|$(page)|user=$(user)',
		help: '',
		required: [ 'page' ]
	},
	{
		category: 2,
		display: 'Test 1',
		template: 'Test 1|$(page)',
		help: '',
		required: [ 'page' ]
	},
	{
		category: 2,
		display: 'Test 2',
		template: 'Test 2',
		help: '',
		required: []
	},
	{
		category: 2,
		display: 'Test 3',
		template: 'Test 3',
		help: '',
		required: []
	},
	{
		category: 2,
		display: 'Test 4',
		template: 'Test 4',
		help: '',
		required: []
	},
	{
		category: 3,
		display: 'Faut sourcer',
		template: 'Faut sourcer|$(page)|user=$(user)',
		help: '',
		required: [ 'page' ]
	},
	{
		category: 3,
		display: 'Faut sourcer 2',
		template: 'Faut sourcer 2|$(page)',
		help: '',
		required: [ 'page' ]
	},
	{
		category: 4,
		display: 'Bienvenue spammeur',
		template: 'Bienvenue spammeur|$(page)|user=$(user)',
		help: '',
		required: [ 'page' ]
	},
	{
		category: 4,
		display: 'Bienvenue spammeur 2',
		template: 'Bienvenue spammeur 2|$(page)',
		help: '',
		required: [ 'page' ]
	},
	{
		category: 5,
		display: 'Avertissement Copyvio',
		template: 'Avertissement Copyvio|$(page)|$(extra)',
		extra: 'Site copié (facultatif) :',
		help: '',
		required: [ 'page' ]
	},
	{
		category: 5,
		display: 'Avertissement Copyvio Synopsis',
		template: 'Avertissement Copyvio Synopsis|$(page)|$(extra)',
		extra: 'Site copié (facultatif) :',
		help: '',
		required: [ 'page' ]
	},
	{
		category: 6,
		display: 'BSI CAA',
		template: 'BSI CAA|$(page)',
		help: '',
		required: [ 'page' ]
	},
	{
		category: 6,
		display: 'BSI vandalisme',
		template: 'BSI vandalisme|$(page)',
		help: '',
		required: [ 'page' ]
	},
	{
		category: 7,
		display: 'Aide sources',
		template: 'Aide sources|user=$(user)',
		help: '',
		required: []
	},
	{
		category: 7,
		display: 'Aide images',
		template: 'Aide images|user=$(user)',
		help: '',
		required: []
	}
];
