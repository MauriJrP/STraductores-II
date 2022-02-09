class Lexer {
	constructor() {
		this.operators = new Set([
			'=',
			'+',
			'-',
			'*',
			'/',
			'<',
			'>',
			'!',
			'<=',
			'>=',
			'==',
			'!=',
			'&&',
			'||',
		]);
		this.symbols = new Set([';', ',', '(', ')', '{', '}', '$']);
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
				else if (this.isOperator(text[i], text[i + 1])) state = 'operator';
				// else if (this.isSymbol(text[i])) state = 'symbol';
				else state = 'error';
			}

			if (this.isTokenComplete(text[i], i, text.length)) {
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
			} else if (state === 'operator') {
				let isTwoChar = this.isTwoCharOperator(text[i], text[i + 1]);

				if (isTwoChar) lexeme += text[i++] + text[i++];
				else lexeme += text[i++];
			} else {
				console.log('error');
				++i;
			}
		}

		console.log(elements);
		return elements;
	};

	getToken = (state, lexeme) => {
		if (state === 'identifier') return 'identificador';
		else if (state === 'number') return 'entero';
		else if (state === 'float') return 'flotante';
		else if (state === 'operator') {
			if (
				lexeme === '<=' ||
				lexeme === '>=' ||
				lexeme === '<' ||
				lexeme === '>'
			)
				return 'opRelac';
			else if (lexeme === '==' || lexeme === '!=') return 'opIgualdad';
			else if (lexeme === '||') return 'opOr';
			else if (lexeme === '&&') return 'opAnd';
			else if (lexeme === '!') return 'opNot';
			else if (lexeme === '+' || lexeme === '-') return 'opSuma';
			else if (lexeme === '*' || lexeme === '/') return 'opMul';
			else if (lexeme === '=') return 'opAsignacion';
		} else if (state === 'symbol') return 'simbolo';
		else if (state === 'error') return 'error';
	};

	//test if char is a letter using regex
	isTokenComplete = (c, i, l) => {
		if (c === ' ' || c === '\n' || c === '\t' || i === l) return true;
		else return false;
	};
	isLetter = (char) => /[a-zA-Z]/.test(char);
	isNumber = (char) => /[0-9]/.test(char);
	isOperator = (char, char2) =>
		this.operators.has(char) || this.operators.has(char + char2);
	isTwoCharOperator = (char, char2) => this.operators.has(char + char2);
}

export default Lexer;
