class Lexical {
	constructor() {
		this.numbers = new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
		this.operators = new Set(['+', '-', '*', '/', '<', '!']);
		this.operators2 = new Set(['<=', '>', '>=', '==', '!=', '&&', '||']);
		this.symbols = new Set([';', ',', '(', ')', '{', '}', '=', '$']);
		//set with all letters
	}

	getTypes = (text) => {
		let result = '';
		let length = text.length;
		let stack = [];
		const states = {
			string: 'string',
			int: 'int',
			float: 'float',
			symbol: 'symbol',
			operator: 'operator',
			space: 'space',
			undefined: 'undefined',
		};
		let preState;
		let state;
		let tokens = [];
		let token = '';

		// -------- ------- ------ ----- state machine ----- ------ ------- --------

		for (let i = 0; i < length; i++) {
			if (text[i] === '\t' || text[i] === '\n') continue;

			// if (text[i] === `'`) token = getString(text.substring(i + 1), `'`);
			// else if (text[i] === '"') token = getString(text.substring(i + 1), '"');

			if (this.operators2.has(text[i] + text[i + 1]))
				tokens.push(text[i] + text[++i]);
			else if (this.operators.has(text[i])) tokens.push(text[i]);
			else if (this.numbers.has(parseInt(text[i]))) state = states.int;
			else if (text[i] === '.') state = states.float;
			else if (this.symbols.has(text[i])) state = states.symbol;
			else if (text[i] === ' ') state = states.space;
			else state = states.undefined;

			if (state === states.number) {
				token += text[i];
			} else if (state === states.string) {
			}

			preState = state;
		}
		return result;
	};
}

export default Lexical;

// getTypes = (text) => {
// 	let result = '';
// 	const tokens = text.split(';').join(' ;').split('\n').join(' ').split(' ');
// 	tokens.forEach((token) => {
// 		token = token.replaceAll('\t', '');
// 		result += `${token}          `;
// 		if (this.operators.has(token)) {
// 			result += 'operator\n';
// 		} else if (this.symbols.has(token[0]) || this.symbols.has(token)) {
// 			result += 'symbol\n';
// 		} else if (this.numbers.has(parseInt(token[0]))) {
// 			result += 'number\n';
// 		} else if (
// 			(token[0] >= 'a' && token[0] <= 'z') ||
// 			(token[0] >= 'A' && token[0] <= 'Z')
// 		) {
// 			result += 'text\n';
// 		} else {
// 			result += 'unknown\n';
// 		}
// 	});
// 	return result;
