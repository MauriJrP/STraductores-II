import Stack from './Stack';
import Lexer from './Lexer';
import StackElement from './StackElement';
import { data } from './data';
import { rules } from './rules';

export default class Parser {
	constructor() {
		this.data = data;
		this.stack = new Stack();
		this.lexer = new Lexer();
		this.tree = null;

		// parse table & rules
		const rows = this.data.table.split('\n');
		this.table = rows.map((row) => row.split('\t'));
		const rulesInfoRows = this.data.rules.split('\n');
		this.rulesInfo = rulesInfoRows.map((row) => {
			const info = row.split('\t');
			return {
				pos: info[0],
				symbols: parseInt(info[1]),
				name: info[2],
			};
		});
		// console.log(this.table, this.rulesInfo);

		// initialize the stack with $0
		this.stack.push(new StackElement('Terminal', 23, '$'));
		this.stack.push(new StackElement('State', 0));
	}

	shift = (token, num /*row in lr table*/) => {
		this.stack.push(new StackElement('Terminal', token.pos, token.lexeme));
		this.stack.push(new StackElement('State', num));
	};

	reduction = (rule, table) => {
		const ruleNum = Math.abs(rule + 2); // rule position on rulesInfo array from 0
		const ruleInfo = this.rulesInfo[ruleNum];
		// console.log(ruleInfo);

		// this.tree = rules[`r${ruleNum + 1}`](this.stack, ruleInfo); for when the rules have sense
		this.tree = rules.r1(this.stack, ruleInfo, this.tree); // rules start from 1
		this.tree.print();

		let top = this.stack.top().pos;
		this.stack.push(
			new StackElement('NonTerminal', ruleInfo.pos, ruleInfo.name)
		);
		this.stack.push(
			new StackElement('State', parseInt(this.table[top][this.stack.top().pos]))
		);
	};

	parse = (input) => {
		let state = '';

		let action = 1; // value in the position of the lr table
		let token = { token: '', lexeme: '', pos: 0 };

		while (state === '') {
			if (action > 0 && token.lexeme !== '$') {
				// get next token if is a shift and is not the end of the input
				token = this.lexer.nextToken(input);
				if (token === null) token = { token: '$', lexeme: '$', pos: 23 }; // $ is the end of the input
			}

			action = parseInt(this.table[this.stack.top().pos][token.pos]); // [state][input]

			if (action === 0) state = 'error';
			else if (action === -1) state = 'accept';
			else if (action <= -2) this.reduction(action);
			else if (action >= 1) this.shift(token, action); // shifts
		}

		// this.tree.print();
		return state;
	};

	// test = () => {
	// 	const regla = 'r1';
	// 	const reglas = rules;
	// 	const test = reglas[regla]();
	// 	console.log(test);
	// };

	parse1 = (input) => {
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
		let token = { token: '', lexeme: '', pos: 0 };

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

		this.tree.print();
		// tree.print();
		return state;
	};
}

// -------- ------- ------ ----- Exercises 1 & 2 ----- ------ ------- --------

// parse2 = (input) => {
// 	let stack = new Stack();
// 	let lexer = new Lexer();

// 	let tree;
// 	let state = '';
// 	const table = [
// 		[2, 0, 0, 1],
// 		[0, 0, -1, 0],
// 		[0, 3, -3, 0],
// 		[2, 0, 0, 4],
// 		[0, 0, -2, 0],
// 	];

// 	stack.push(new StackElement(2, '$'));
// 	stack.push(new StackElement(0));

// 	let action = 1;
// 	let token = { pos: 0, lexeme: '' };

// 	while (state === '') {
// 		if (action > 0 && token.lexeme !== '$') {
// 			token = lexer.nextToken(input);
// 			if (token === null) token = { lexeme: '$', pos: 2 };
// 			else
// 				token = {
// 					...token,
// 					pos: token.pos === '5' ? 1 : parseInt(token.pos),
// 				};
// 		}

// 		action = table[stack.top().pos][token.pos];
// 		// stack.print();
// 		if (action === 0) state = 'error';
// 		else if (action === -1) state = 'accept';
// 		else if (action === -2) {
// 			// 6 pop bc there are 3 tokens in the rule
// 			tree = new E2(stack);

// 			let top = stack.top().pos;
// 			stack.push(new StackElement(3, 'E')); // rule 1
// 			stack.push(new StackElement(table[top][stack.top().pos]));
// 		} else if (action === -3) {
// 			// 2 pop bc there are 1 token in the rule
// 			tree = new E22(stack);

// 			let top = stack.top().pos;
// 			stack.push(new StackElement(3, 'E')); // rule E
// 			stack.push(new StackElement(table[top][stack.top().pos]));
// 		} else if (action === 1) {
// 			stack.push(new StackElement(token.pos, token.lexeme));
// 			stack.push(new StackElement(1));
// 		} else if (action === 2) {
// 			stack.push(new StackElement(token.pos, token.lexeme));
// 			stack.push(new StackElement(2));
// 		} else if (action === 3) {
// 			stack.push(new StackElement(token.pos, token.lexeme));
// 			stack.push(new StackElement(3));
// 		} else if (action === 4) {
// 			stack.push(new StackElement(token.pos, token.lexeme));
// 			stack.push(new StackElement(4));
// 		}
// 	}

// 	return state;
// };
