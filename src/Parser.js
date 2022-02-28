import Stack from './Stack';
import Lexer from './Lexer';
import StackElement from './StackElement';
import {
	E1,
	E2,
	E22,
	Terminal,
	NonTerminal,
	State,
	Node,
} from './StackElement';

class Parser {
	constructor() {}

	parse1 = (input) => {
		let stack = new Stack();
		let lexer = new Lexer();

		let tree;
		let state = '';
		// lr(1) table
		const table = [
			[2, 0, 0, 1],
			[0, 0, -1, 0],
			[0, 3, 0, 0],
			[4, 0, 0, 0],
			[0, 0, -2, 0],
		];

		stack.push(new StackElement(2, '$'));
		stack.push(new StackElement(0));

		// let i = 0;
		let action = 1;
		let token = { type: 0, lexeme: '' };

		while (state === '') {
			if (action > 0 && token.lexeme !== '$') {
				token = lexer.nextToken(input);
				if (token === null) token = { lexeme: '$', type: 2 };
				else
					token = {
						...token,
						type: token.type === '5' ? 1 : parseInt(token.type),
					};
			}

			action = table[stack.top().type][token.type];

			if (action === 0) state = 'error';
			else if (action === -1) state = 'accept';
			else if (action === -2) {
				tree = new E1(stack);

				let top = stack.top().type;
				stack.push(new StackElement(3, 'E')); // NonTerminal E
				stack.push(new StackElement(table[top][stack.top().type]));
				// --i;
			} else if (action === 1) {
				// shift 1
				stack.push(new StackElement(token.type, token.lexeme));
				stack.push(new StackElement(1));
			} else if (action === 2) {
				stack.push(new StackElement(token.type, token.lexeme));
				stack.push(new StackElement(2));
			} else if (action === 3) {
				stack.push(new StackElement(token.type, token.lexeme));
				stack.push(new StackElement(3));
			} else if (action === 4) {
				stack.push(new StackElement(token.type, token.lexeme));
				stack.push(new StackElement(4));
			}
		}

		// tree.print();
		return state;
	};

	parse2 = (input) => {
		let stack = new Stack();
		let lexer = new Lexer();

		let tree;
		let state = '';
		const table = [
			[2, 0, 0, 1],
			[0, 0, -1, 0],
			[0, 3, -3, 0],
			[2, 0, 0, 4],
			[0, 0, -2, 0],
		];

		stack.push(new StackElement(2, '$'));
		stack.push(new StackElement(0));

		let action = 1;
		let token = { type: 0, lexeme: '' };

		while (state === '') {
			if (action > 0 && token.lexeme !== '$') {
				token = lexer.nextToken(input);
				if (token === null) token = { lexeme: '$', type: 2 };
				else
					token = {
						...token,
						type: token.type === '5' ? 1 : parseInt(token.type),
					};
			}

			action = table[stack.top().type][token.type];
			// stack.print();
			if (action === 0) state = 'error';
			else if (action === -1) state = 'accept';
			else if (action === -2) {
				// 6 pop bc there are 3 tokens in the rule
				tree = new E2(stack);

				let top = stack.top().type;
				stack.push(new StackElement(3, 'E')); // rule 1
				stack.push(new StackElement(table[top][stack.top().type]));
			} else if (action === -3) {
				// 2 pop bc there are 1 token in the rule
				tree = new E22(stack);

				let top = stack.top().type;
				stack.push(new StackElement(3, 'E')); // rule E
				stack.push(new StackElement(table[top][stack.top().type]));
			} else if (action === 1) {
				stack.push(new StackElement(token.type, token.lexeme));
				stack.push(new StackElement(1));
			} else if (action === 2) {
				stack.push(new StackElement(token.type, token.lexeme));
				stack.push(new StackElement(2));
			} else if (action === 3) {
				stack.push(new StackElement(token.type, token.lexeme));
				stack.push(new StackElement(3));
			} else if (action === 4) {
				stack.push(new StackElement(token.type, token.lexeme));
				stack.push(new StackElement(4));
			}
		}

		return state;
	};
}

export default Parser;
