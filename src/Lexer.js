class Lexer {
	constructor() {
		this.operators = new Set(['+', '-', '*', '/', '<', '!']);
		this.operators2 = new Set(['<=', '>', '>=', '==', '!=', '&&', '||']);
		this.symbols = new Set([';', ',', '(', ')', '{', '}', '=', '$']);
	}

	getTypes = (text) => {
		// [{ token: 'test1', lexeme: 'test1' }];
		let elements = [];
		let state = 'nextToken';
		let lexeme = '';
		let token = '';

		// -------- ------- ------ ----- Lexer ----- ------ ------- --------
		let i = 0;
		while (i <= text.length) {
			if (state == 'nextToken') {
				if (text[i] === ' ' || text[i] === '\n' || text[i] === '\t') {
					++i;
					continue;
				} else if (this.isLetter(text[i]) || text[i] === '_')
					state = 'identifier';
				else if (this.isNumber(text[i])) state = 'number';
				// else if (this.isOperator(text[i])) state = 'operator';
				// else if (this.isSymbol(text[i])) state = 'symbol';
				else state = 'error';
			}

			if (text[i] === ' ' || text[i] === '\n' || i === text.length) {
				// Token is finished
				token = this.getToken(state, lexeme);
				if (lexeme !== '') elements.push({ token: token, lexeme: lexeme });
				lexeme = '';
				state = 'nextToken';
				++i;
			} else if (state === 'identifier') {
				if (this.isLetter(text[i]) || text[i] === '_' || this.isNumber(text[i]))
					lexeme += text[i++];
				else {
					lexeme += text[i++];
					state = 'error';
				}
			} else if (state === 'number') {
				if (this.isNumber(text[i])) lexeme += text[i++];
				else if (text[i] === '.') {
					lexeme += text[i++];
					state = 'float';
				} else {
					lexeme += text[i++];
					state = 'error';
				}
			} else if (state === 'float') {
				if (this.isNumber(text[i])) lexeme += text[i++];
				else {
					lexeme += text[i++];
					state = 'error';
				}
			} else {
				console.log('error');
				++i;
			}
			console.log(state);
			// console.log(i);
		}

		console.log(elements);
		return elements;
	};

	getToken = (state, lexeme) => {
		if (state === 'identifier') return 'identificador';
		else if (state === 'number') return 'Entero';
		else if (state === 'float') return 'flotante';
		else if (state === 'operator') return 'operador';
		else if (state === 'symbol') return 'simbolo';
		else if (state === 'error') return 'error';
	};

	//test if char is a letter using regex
	isLetter = (char) => /[a-zA-Z]/.test(char);
	isNumber = (char) => /[0-9]/.test(char);
}

export default Lexer;
