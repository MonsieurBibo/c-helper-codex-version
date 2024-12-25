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
		help: ''
	},
	{
		category: 0,
		display: 'Bienvenue IP',
		template: 'Bienvenue IP',
		help: ''
	},
	{
		category: 0,
		display: 'Bienvenue IP méritante',
		template: 'Bienvenue IP méritante|$(user)|message=$(extra)',
		extra: 'Ajouter un message personnel (facultatif) :',
		help: ''
	},
	{
		category: 1,
		display: 'Test 0',
		template: 'Test 0|$(page)|$(diff)|autre=$(extra)|user=$(user)',
		extra: 'Type de maladresse (facultatif) :',
		help: ''
	},
	{
		category: 1,
		display: 'Test ?',
		template: 'Test ?|$(page)|$(diff)',
		help: ''
	},
	{
		category: 1,
		display: 'Ajout POV',
		template: 'Ajout POV|$(page)|user=$(user)',
		help: ''
	},
	{
		category: 1,
		display: 'Non-encyclo',
		template: 'Non-encyclo|user=$(user)',
		help: ''
	},
	{
		category: 1,
		display: 'Retrait injustifié',
		template: 'Retrait injustifié|$(page)|user=$(user)',
		help: ''
	},
	{
		category: 1,
		display: 'Ortho',
		template: 'Ortho|$(page)|user=$(user)',
		help: ''
	},
	{
		category: 2,
		display: 'Test 1',
		template: 'Test 1|$(page)',
		help: ''
	},
	{
		category: 2,
		display: 'Test 2',
		template: 'Test 2',
		help: ''
	},
	{
		category: 2,
		display: 'Test 3',
		template: 'Test 3',
		help: ''
	},
	{
		category: 2,
		display: 'Test 4',
		template: 'Test 4',
		help: ''
	},
	{
		category: 3,
		display: 'Faut sourcer',
		template: 'Faut sourcer|$(page)|user=$(user)',
		help: ''
	},
	{
		category: 3,
		display: 'Faut sourcer 2',
		template: 'Faut sourcer 2|$(page)',
		help: ''
	},
	{
		category: 4,
		display: 'Bienvenue spammeur',
		template: 'Bienvenue spammeur|$(page)|user=$(user)',
		help: ''
	},
	{
		category: 4,
		display: 'Bienvenue spammeur 2',
		template: 'Bienvenue spammeur 2|$(page)',
		help: ''
	},
	{
		category: 5,
		display: 'Avertissement Copyvio',
		template: 'Avertissement Copyvio|$(page)|$(extra)',
		extra: 'Site copié (facultatif) :',
		help: ''
	},
	{
		category: 5,
		display: 'Avertissement Copyvio Synopsis',
		template: 'Avertissement Copyvio Synopsis|$(page)|$(extra)',
		extra: 'Site copié (facultatif) :',
		help: ''
	},
	{
		category: 6,
		display: 'BSI CAA',
		template: 'BSI CAA|$(page)',
		help: ''
	},
	{
		category: 6,
		display: 'BSI vandalisme',
		template: 'BSI vandalisme|$(page)',
		help: ''
	},
	{
		category: 7,
		display: 'Aide sources',
		template: 'Aide sources|user=$(user)',
		help: ''
	},
	{
		category: 7,
		display: 'Aide images',
		template: 'Aide images|user=$(user)',
		help: ''
	}
];
