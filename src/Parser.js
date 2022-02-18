import Stack from './Stack';
import Lexer from './Lexer';
import StackElement from './StackElement';
import { Terminal, NonTerminal, State, Node } from './StackElement';

class Parser {
	constructor() {}

	parse1 = (input) => {
		let stack = new Stack();
		let lexer = new Lexer();
		let state = '';
		const table = [
			[2, 0, 0, 1],
			[0, 0, -1, 0],
			[0, 3, 0, 0],
			[4, 0, 0, 0],
			[0, 0, -2, 0],
		];
		let elements = lexer.getElements(input).map((element) => {
			// temporary solution for types validation
			let newType = element.type;
			if (element.type === '5') newType = '1';
			return {
				lexeme: element.lexeme,
				type: parseInt(newType),
			};
		});
		elements.push({ lexeme: '$', type: 2 }); // $ symbol for the end of the input
		// console.log('elements: ');
		// console.log(elements);

		stack.push(new StackElement(2, '$'));
		stack.push(new StackElement(0));
		// stack.print();

		let i = 0;
		let action = 0;
		while (state === '') {
			// console.log(elements[i]);
			action = table[stack.top().type][elements[i].type];
			// console.log(action);
			// stack.print();
			if (action === 0) state = 'error';
			else if (action === -1) state = 'accept';
			else if (action === -2) {
				// 6 pop bc there are 3 tokens in the rule
				stack.pop();
				stack.pop();
				stack.pop();
				stack.pop();
				stack.pop();
				stack.pop();
				let top = stack.top().type;
				stack.push(new StackElement(3, 'E')); // NonTerminal E
				stack.push(new StackElement(table[top][stack.top().type]));
				--i;
			} else if (action === 1) {
				// shift 1
				stack.push(new StackElement(elements[i].type, elements[i].lexeme));
				stack.push(new StackElement(1));
			} else if (action === 2) {
				stack.push(new StackElement(elements[i].type, elements[i].lexeme));
				stack.push(new StackElement(2));
			} else if (action === 3) {
				stack.push(new StackElement(elements[i].type, elements[i].lexeme));
				stack.push(new StackElement(3));
			} else if (action === 4) {
				stack.push(new StackElement(elements[i].type, elements[i].lexeme));
				stack.push(new StackElement(4));
			}
			++i;
		}

		return state;
	};

	parse2 = (input) => {
		let stack = new Stack();
		let lexer = new Lexer();
		let state = '';
		const table = [
			[2, 0, 0, 1],
			[0, 0, -1, 0],
			[0, 3, -3, 0],
			[2, 0, 0, 4],
			[0, 0, -2, 0],
		];
		let elements = lexer.getElements(input).map((element) => {
			// temporary solution for types validation
			let newType = element.type;
			if (element.type === '5') newType = '1';
			return {
				lexeme: element.lexeme,
				type: parseInt(newType),
			};
		});
		elements.push({ lexeme: '$', type: 2 }); // $ symbol for the end of the input
		console.log(elements);

		stack.push(new StackElement(2, '$'));
		stack.push(new StackElement(0));

		let i = 0;
		let action = 0;
		while (state === '') {
			// console.log(elements[i]);
			action = table[stack.top().type][elements[i].type];
			stack.print();
			if (action === 0) state = 'error';
			else if (action === -1) state = 'accept';
			else if (action === -2) {
				// 6 pop bc there are 3 tokens in the rule
				stack.pop();
				stack.pop();
				stack.pop();
				stack.pop();
				stack.pop();
				stack.pop();
				let top = stack.top().type;
				stack.push(new StackElement(3, 'E')); // rule 1
				stack.push(new StackElement(table[top][stack.top().type]));
				--i;
			} else if (action === -3) {
				// 2 pop bc there are 1 token in the rule
				stack.pop();
				stack.pop();
				let top = stack.top().type;
				stack.push(new StackElement(3, 'E')); // rule E
				stack.push(new StackElement(table[top][stack.top().type]));
				--i;
			} else if (action === 1) {
				stack.push(new StackElement(elements[i].type, elements[i].lexeme));
				stack.push(new StackElement(1));
			} else if (action === 2) {
				stack.push(new StackElement(elements[i].type, elements[i].lexeme));
				stack.push(new StackElement(2));
			} else if (action === 3) {
				stack.push(new StackElement(elements[i].type, elements[i].lexeme));
				stack.push(new StackElement(3));
			} else if (action === 4) {
				stack.push(new StackElement(elements[i].type, elements[i].lexeme));
				stack.push(new StackElement(4));
			}
			++i;
		}

		return state;
	};
}

export default Parser;
