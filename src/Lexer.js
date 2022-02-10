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

	getElements = (text) => {
		// [{ token: 'test1', lexeme: 'test1' }];
		let elements = [];
		let state = 'nextToken';
		let lexeme = '';
		let token = '';
		let type = '';

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
				else if (this.isSymbol(text[i])) state = 'symbol';
				else state = 'error';
			}

			if (this.isTokenComplete(text[i], i, text.length)) {
				token = this.getToken(state, lexeme);
				type = this.getType(token);
				if (lexeme !== '')
					elements.push({ token: token, lexeme: lexeme, type: type });
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
			} else if (state === 'symbol') {
				lexeme += text[i++];
			} else {
				console.log('error');
				++i;
			}
		}

		console.log(elements);
		return elements;
	};

	getToken = (state, lexeme) => {
		if (state === 'identifier') {
			if (lexeme === 'if') return 'if';
			else if (lexeme === 'else') return 'else';
			else if (lexeme === 'while') return 'while';
			else if (lexeme === 'return') return 'return';
			else if (lexeme === 'int') return 'int';
			else if (lexeme === 'float') return 'float';
			else if (lexeme === 'void') return 'void';
			else return 'identificador';
		} else if (state === 'number') return 'entero';
		else if (state === 'float') return 'real';
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
			else return 'operador';
		} else if (state === 'symbol') {
			if (lexeme === ';') return ';';
			else if (lexeme === ',') return ',';
			else if (lexeme === '(') return '(';
			else if (lexeme === ')') return ')';
			else if (lexeme === '{') return '{';
			else if (lexeme === '}') return '}';
			else if (lexeme === '$') return '$';
			else return 'simbolo';
		} else if (state === 'error') return 'error';
	};

	getType = (token) => {
		if (token === 'identificador') return '0';
		else if (token === 'entero') return '1';
		else if (token === 'real') return '2';
		else if (token === 'cadena') return '3';
		else if (token === 'int' || token === 'float' || token === 'void')
			return '4';
		else if (token === 'opSuma') return '5';
		else if (token === 'opMul') return '6';
		else if (token === 'opRelac') return '7';
		else if (token === 'opOr') return '8';
		else if (token === 'opAnd') return '9';
		else if (token === 'opNot') return '10';
		else if (token === 'opIgualdad') return '11';
		else if (token === ';') return '12';
		else if (token === ',') return '13';
		else if (token === '(') return '14';
		else if (token === ')') return '15';
		else if (token === '{') return '16';
		else if (token === '}') return '17';
		else if (token === '=') return '18';
		else if (token === 'if') return '19';
		else if (token === 'while') return '20';
		else if (token === 'return') return '21';
		else if (token === 'else') return '22';
		else if (token === '$') return '23';
	};

	isTokenComplete = (c, i, l) => {
		if (c === ' ' || c === '\n' || c === '\t' || i === l) return true;
		else return false;
	};
	isLetter = (char) => /[a-zA-Z]/.test(char);
	isNumber = (char) => /[0-9]/.test(char);
	isOperator = (char, char2) =>
		this.operators.has(char) || this.operators.has(char + char2);
	isTwoCharOperator = (char, char2) => this.operators.has(char + char2);
	isSymbol = (char) => this.symbols.has(char);
}

export default Lexer;
