import Stack from './Stack';
import Lexer from './Lexer';

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
			else if (element.type === '23') newType = '2';
			return parseInt(newType);
		});
		console.log('elements: ' + elements);

		stack.push('$');
		stack.push(0);

		let i = 0;
		let action = 0;
		while (state === '') {
			// console.log(elements[i]);
			action = table[stack.top()][elements[i]];
			console.log(action);
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
				let top = stack.top();
				stack.push(3); // rule 1
				stack.push(table[top][stack.top()]);
				--i;
			} else if (action === 1) {
				stack.push(elements[i]);
				stack.push(1);
			} else if (action === 2) {
				stack.push(elements[i]);
				stack.push(2);
			} else if (action === 3) {
				stack.push(elements[i]);
				stack.push(3);
			} else if (action === 4) {
				stack.push(elements[i]);
				stack.push(4);
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
			[0, 3, 0, 0],
			[4, 0, 0, 0],
			[0, 0, -2, 0],
		];
		let elements = lexer.getElements(input).map((element) => {
			// temporary solution for types validation
			let newType = element.type;
			if (element.type === '5') newType = '1';
			else if (element.type === '23') newType = '2';
			return parseInt(newType);
		});
		console.log('elements: ' + elements);

		stack.push('$');
		stack.push(0);

		let i = 0;
		let action = 0;
		while (state === '') {
			// console.log(elements[i]);
			action = table[stack.top()][elements[i]];
			console.log(action);
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
				let top = stack.top();
				stack.push(3); // rule 1
				stack.push(table[top][stack.top()]);
				--i;
			} else if (action === 1) {
				stack.push(elements[i]);
				stack.push(1);
			} else if (action === 2) {
				stack.push(elements[i]);
				stack.push(2);
			} else if (action === 3) {
				stack.push(elements[i]);
				stack.push(3);
			} else if (action === 4) {
				stack.push(elements[i]);
				stack.push(4);
			}
			++i;
		}

		return state;
	};
}

export default Parser;
