import {IToken, StateEnum} from './types';

export class Lexer {
	operators: Set<string>;
	symbols: Set<string>;
	i: number;

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
		this.i = 0; // index of the current element
	}

	getTokens = (input: string): IToken[] => {
		let tokenComplete: boolean = false;
		let stringStack: string[] = [];
		let tokens: IToken[] = [];
		let state: StateEnum = StateEnum.NextToken;
		let lexeme: string = '';
		let token: string = '';
		let pos: number = 0;

		// -------- ------- ------ ----- Lexer ----- ------ ------- --------
		let i: number = 0;
		while (i <= input.length) {
			if (this.isTokenComplete(input[i], i, input.length, state, tokenComplete)) {
				tokenComplete = false;
				token = this.getToken(state, lexeme);
				pos = this.getPos(token);
				if (lexeme !== '') tokens.push({ token, lexeme, pos });
				lexeme = '';
				state = StateEnum.NextToken;
				if (input.length === i) ++i; // Avoid infinite loop
			}

			if (state === StateEnum.NextToken) {
				// skip whitespace
				if (input[i] === ' ' || input[i] === '\n' || input[i] === '\t') ++i;
				else if (this.isLetter(input[i]) || input[i] === '_')
					state = StateEnum.Identifier;
				else if (this.isNumber(input[i])) state = StateEnum.Number;
				else if (this.isOperator(input[i], input[i + 1])) state = StateEnum.Operator;
				else if (this.isSymbol(input[i])) state = StateEnum.Symbol;
				else if (input[i] === '"') {
					state = StateEnum.String;
				} else state = StateEnum.Error;
			} else if (state === StateEnum.Identifier) {
				if (this.isLetter(input[i]) || input[i] === '_' || this.isNumber(input[i]))
					lexeme += input[i++];
				else if (this.isOperator(input[i], input[i + 1])) tokenComplete = true;
				else if (input[i] !== '$' && this.isSymbol(input[i]))
					tokenComplete = true;
				else {
					lexeme += input[i++];
					state = StateEnum.Error;
				}
			} else if (state === StateEnum.String) {
				if (
					(stringStack.length === 0 && input[i] === '"') ||
					(stringStack.length > 0 && input[i] !== '"')
				) {
					if (input[i] === '"') stringStack.push(input[i]);
					lexeme += input[i++];
				} else {
					lexeme += input[i++];
					tokenComplete = true;
					stringStack = [];
				}
			} else if (state === StateEnum.Number) {
				if (this.isNumber(input[i])) lexeme += input[i++];
				else if (input[i] === '.') {
					lexeme += input[i++];
					state = StateEnum.Float;
				} else if (this.isOperator(input[i], input[i + 1])) tokenComplete = true;
				else if (input[i] !== '$' && this.isSymbol(input[i]))
					tokenComplete = true;
				else {
					lexeme += input[i++];
					state = StateEnum.Error;
				}
			} else if (state === StateEnum.Float) {
				if (this.isNumber(input[i])) lexeme += input[i++];
				else if (this.isOperator(input[i], input[i + 1])) tokenComplete = true;
				else if (input[i] !== '$' && this.isSymbol(input[i]))
					tokenComplete = true;
				else {
					lexeme += input[i++];
					state = StateEnum.Error;
				}
			} else if (state === StateEnum.Operator) {
				let isTwoChar = this.isTwoCharOperator(input[i], input[i + 1]);

				if (isTwoChar) lexeme += input[i++] + input[i++];
				else lexeme += input[i++];
				tokenComplete = true;
			} else if (state === StateEnum.Symbol) {
				lexeme += input[i++];
				tokenComplete = true;
			} else {
				console.log('error');
				++i;
			}
		}

		return tokens;
	};

	nextToken = (input: string): IToken | null => {
		let tokenComplete: boolean = false;
		let stringStack: string[] = [];
		let state: StateEnum = StateEnum.NextToken;
		let lexeme: string = '';
		let token: string = '';
		let pos: number = 0;

		// -------- ------- ------ ----- Lexer ----- ------ ------- --------
		let i: number = this.i;
		if (input.length === i) return null;

		while (i <= input.length) {
			if (this.isTokenComplete(input[i], i, input.length, state, tokenComplete)) {
				tokenComplete = false;
				token = this.getToken(state, lexeme);
				pos = this.getPos(token);
				this.i = i;
				if (lexeme !== '') return { token, lexeme, pos };
			}

			if (state === StateEnum.NextToken) {
				// skip whitespace
				if (input[i] === ' ' || input[i] === '\n' || input[i] === '\t') ++i;
				else if (this.isLetter(input[i]) || input[i] === '_')
					state = StateEnum.Identifier;
				else if (this.isNumber(input[i])) state = StateEnum.Number;
				else if (this.isOperator(input[i], input[i + 1])) state = StateEnum.Operator;
				else if (this.isSymbol(input[i])) state = StateEnum.Symbol;
				else if (input[i] === '"') {
					state = StateEnum.String;
				} else state = StateEnum.Error;
			} else if (state === StateEnum.Identifier) {
				if (this.isLetter(input[i]) || input[i] === '_' || this.isNumber(input[i]))
					lexeme += input[i++];
				else if (this.isOperator(input[i], input[i + 1])) tokenComplete = true;
				else if (input[i] !== '$' && this.isSymbol(input[i]))
					tokenComplete = true;
				else {
					lexeme += input[i++];
					state = StateEnum.Error;
				}
			} else if (state === StateEnum.String) {
				if (
					(stringStack.length === 0 && input[i] === '"') ||
					(stringStack.length > 0 && input[i] !== '"')
				) {
					if (input[i] === '"') stringStack.push(input[i]);
					lexeme += input[i++];
				} else {
					lexeme += input[i++];
					tokenComplete = true;
					stringStack = [];
				}
			} else if (state === StateEnum.Number) {
				if (this.isNumber(input[i])) lexeme += input[i++];
				else if (input[i] === '.') {
					lexeme += input[i++];
					state = StateEnum.Float;
				} else if (this.isOperator(input[i], input[i + 1])) tokenComplete = true;
				else if (input[i] !== '$' && this.isSymbol(input[i]))
					tokenComplete = true;
				else {
					lexeme += input[i++];
					state = StateEnum.Error;
				}
			} else if (state === StateEnum.Float) {
				if (this.isNumber(input[i])) lexeme += input[i++];
				else if (this.isOperator(input[i], input[i + 1])) tokenComplete = true;
				else if (input[i] !== '$' && this.isSymbol(input[i]))
					tokenComplete = true;
				else {
					lexeme += input[i++];
					state = StateEnum.Error;
				}
			} else if (state === StateEnum.Operator) {
				let isTwoChar = this.isTwoCharOperator(input[i], input[i + 1]);

				if (isTwoChar) lexeme += input[i++] + input[i++];
				else lexeme += input[i++];
				tokenComplete = true;
			} else if (state === StateEnum.Symbol) {
				lexeme += input[i++];
				tokenComplete = true;
			} else {
				console.log('error');
				++i;
			}
		}
		return null;
	};

	getToken = (state: StateEnum, lexeme: string): string => {
		if (state === StateEnum.Identifier) {
			if (lexeme === 'if') return 'if';
			else if (lexeme === 'else') return 'else';
			else if (lexeme === 'while') return 'while';
			else if (lexeme === 'return') return 'return';
			else if (lexeme === 'int') return 'int';
			else if (lexeme === 'float') return 'float';
			else if (lexeme === 'void') return 'void';
			else return 'identificador';
		} else if (state === StateEnum.String) return 'cadena';
		else if (state === StateEnum.Number) return 'entero';
		else if (state === StateEnum.Float) return 'real';
		else if (state === StateEnum.Operator) {
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
		} else if (state === StateEnum.Symbol) {
			if (lexeme === ';') return ';';
			else if (lexeme === ',') return ',';
			else if (lexeme === '(') return '(';
			else if (lexeme === ')') return ')';
			else if (lexeme === '{') return '{';
			else if (lexeme === '}') return '}';
			else if (lexeme === '$') return '$';
			else return 'simbolo';
		} else if (state === StateEnum.Error) return 'error';
		return "error";
	};

	getPos = (token: string): number => {
		if (token === 'identificador') return 0;
		else if (token === 'entero') return 1;
		else if (token === 'real') return 2;
		else if (token === 'cadena') return 3;
		else if (token === 'int' || token === 'float' || token === 'void') return 4;
		else if (token === 'opSuma') return 5;
		else if (token === 'opMul') return 6;
		else if (token === 'opRelac') return 7;
		else if (token === 'opOr') return 8;
		else if (token === 'opAnd') return 9;
		else if (token === 'opNot') return 10;
		else if (token === 'opIgualdad') return 11;
		else if (token === ';') return 12;
		else if (token === ',') return 13;
		else if (token === '(') return 14;
		else if (token === ')') return 15;
		else if (token === '{') return 16;
		else if (token === '}') return 17;
		else if (token === 'opAsignacion') return 18;
		else if (token === 'if') return 19;
		else if (token === 'while') return 20;
		else if (token === 'return') return 21;
		else if (token === 'else') return 22;
		else if (token === '$') return 23;
		else if (token === 'error') return -1;
		return -1;
	};

	isTokenComplete = (c: string, i: number, l: number, state: StateEnum, tc: boolean ): boolean => {
		if (state === StateEnum.String && !tc) return false;
		if (c === ' ' || c === '\n' || c === '\t' || i === l || tc) return true;
		else return false;
	};
	isLetter = (char: string): boolean => /[a-zA-Z]/.test(char);
	isNumber = (char: string): boolean => /[0-9]/.test(char);
	isOperator = (char: string, char2: string): boolean =>
		this.operators.has(char) || this.operators.has(char + char2);
	isTwoCharOperator = (char: string, char2: string): boolean => this.operators.has(char + char2);
	isSymbol = (char: string): boolean => this.symbols.has(char);
}

