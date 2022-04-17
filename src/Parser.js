import Stack from './Stack';
import Lexer from './Lexer';
import StackElement from './StackElement';
import { data } from './data';
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
	constructor() {
		this.data = data;
		this.stack = new Stack();
		this.lexer = new Lexer();
		this.tree = new Node(this.stack);

		// initialize the stack with $0
		this.stack.push(new Terminal(23, '$'));
		this.stack.push(new State(0));
	}

	// Desplazamientos
	shift = (token, d) => {
		// d = desplazamiento, row in the lr table
		// this.stack.push(new StackElement(token.pos, token.lexeme));
		// this.stack.push(new StackElement(d));
		this.stack.push(new Terminal(token.pos, token.lexeme));
		this.stack.push(new State(d));
	};

	reduction = (rule, table) => {
		// d = desplazamiento, row in the lr table

		this.tree = new E1(this.stack);

		let top = this.stack.top().pos;
		this.stack.push(new StackElement(3, 'E')); // NonTerminal E
		this.stack.push(new StackElement(table[top][this.stack.top().pos]));
	};

	parse = (input) => {
		let tree;
		let state = '';

		const rows = this.data.table.split('\n');
		const table = rows.map((row) => row.split('\t'));
		console.log(table);

		// let action = 1; // value in the position of the lr table
		// let token = { token: '', lexeme: '', pos: 0 };

		// // int hola;
		// while (state === '') {
		// 	if (action > 0 && token.lexeme !== '$') {
		// 		// get next token if is a shift(desplazamiento) and is not the end of the input
		// 		token = this.lexer.nextToken(input);
		// 		if (token === null) token = { token: '$', lexeme: '$', pos: 23 }; // $ is the end of the input
		// 	}

		// 	action = table[this.stack.top().pos][token.pos];

		// 	if (action === 0) state = 'error';
		// 	else if (action === -1) state = 'accept';
		// 	else if (action <= -2) {
		// 		// reductions
		// 		tree = new E1(this.stack);

		// 		let top = this.stack.top().pos;
		// 		this.stack.push(new StackElement(3, 'E')); // NonTerminal E
		// 		this.stack.push(new StackElement(table[top][this.stack.top().pos]));
		// 		// --i;
		// 	} else if (action >= 1) this.shift(token, action); // shifts
		// }

		return state;
	};

	parse1 = (input) => {
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

		// let i = 0;
		let action = 1;
		let token = { pos: 0, lexeme: '' };

		while (state === '') {
			if (action > 0 && token.lexeme !== '$') {
				token = this.lexer.nextToken(input);
				if (token === null) token = { lexeme: '$', pos: 2 };
				else
					token = {
						...token,
						pos: token.pos === 5 ? 1 : token.pos,
					};
			}

			action = table[this.stack.top().pos][token.pos];

			if (action === 0) state = 'error';
			else if (action === -1) state = 'accept';
			else if (action <= -2) this.reduction(action, table);
			else if (action >= 1) this.shift(token, action);
		}

		// tree.print();
		return state;
	};

	test = () => {
		const token = { pos: 0, lexeme: '' };
		const action = 1;
		this.shift(this.stack, token, action);
		// console.log(this.stack);
		// const state = new State(this.stack.pop().);
		// state.estado();
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
		let token = { pos: 0, lexeme: '' };

		while (state === '') {
			if (action > 0 && token.lexeme !== '$') {
				token = lexer.nextToken(input);
				if (token === null) token = { lexeme: '$', pos: 2 };
				else
					token = {
						...token,
						pos: token.pos === '5' ? 1 : parseInt(token.pos),
					};
			}

			action = table[stack.top().pos][token.pos];
			// stack.print();
			if (action === 0) state = 'error';
			else if (action === -1) state = 'accept';
			else if (action === -2) {
				// 6 pop bc there are 3 tokens in the rule
				tree = new E2(stack);

				let top = stack.top().pos;
				stack.push(new StackElement(3, 'E')); // rule 1
				stack.push(new StackElement(table[top][stack.top().pos]));
			} else if (action === -3) {
				// 2 pop bc there are 1 token in the rule
				tree = new E22(stack);

				let top = stack.top().pos;
				stack.push(new StackElement(3, 'E')); // rule E
				stack.push(new StackElement(table[top][stack.top().pos]));
			} else if (action === 1) {
				stack.push(new StackElement(token.pos, token.lexeme));
				stack.push(new StackElement(1));
			} else if (action === 2) {
				stack.push(new StackElement(token.pos, token.lexeme));
				stack.push(new StackElement(2));
			} else if (action === 3) {
				stack.push(new StackElement(token.pos, token.lexeme));
				stack.push(new StackElement(3));
			} else if (action === 4) {
				stack.push(new StackElement(token.pos, token.lexeme));
				stack.push(new StackElement(4));
			}
		}

		return state;
	};
}

export default Parser;
