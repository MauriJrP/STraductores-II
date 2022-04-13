import Stack from './Stack';

class StackElement {
	constructor(column, element = null) {
		this.column = column;
		this.element = element;
	}
}

// class Terminal which extends StackElement
class Terminal extends StackElement {
	constructor(column, element) {
		super(column, element);
	}
}

class NonTerminal extends StackElement {
	constructor(column, element, node) {
		super(column, element);
		// let node = new Node(column);
	}
}

class State extends StackElement {
	constructor(column) {
		super(column);
	}
}

class Node {
	constructor(stack) {
		this.stack = stack;
	}
}

class E1 extends Node {
	// excercise 1
	constructor(stack) {
		super(stack);
		this.s1 = new State(this.stack.pop().column);
		this.id1 = this.stack.pop();
		this.s2 = new State(this.stack.pop().column);
		this.stack.pop();
		this.s3 = new State(this.stack.pop().column);
		this.id2 = this.stack.pop();
	}

	print = () => {
		// print the variables
		console.log('s1: ');
		console.log(this.s1.column);
		console.log('id1: ');
		console.log(this.id1.element);
		console.log('s2: ');
		console.log(this.s2.column);
		console.log('s3: ');
		console.log(this.s3.column);
		console.log('id2: ');
		console.log(this.id2.element);
	};
}

class E2 extends Node {
	// excercise 2
	constructor(stack) {
		super(stack);
		this.s1 = new State(this.stack.pop().column);
		this.nonTerminal = this.stack.pop();
		this.s2 = new State(this.stack.pop().column);
		this.stack.pop();
		this.s3 = new State(this.stack.pop().column);
		this.id = this.stack.pop();
	}

	print = () => {
		// print the variables
		console.log('s1: ');
		console.log(this.s1.column);
		console.log('No terminal: ');
		console.log(this.nonTerminal.element);
		console.log('s2: ');
		console.log(this.s2.column);
		console.log('s3: ');
		console.log(this.s3.column);
		console.log('id: ');
		console.log(this.id.element);
	};
}

class E22 extends Node {
	// excercise 2 part 2
	constructor(stack) {
		super(stack);
		this.s1 = new State(this.stack.pop().column);
		this.id1 = this.stack.pop();
		this.nonTerminal = new NonTerminal(3, 'E');
	}

	print = () => {
		// print the variables
		console.log('s1: ');
		console.log(this.s1.column);
		console.log('id1: ');
		console.log(this.id1.element);
	};
}

// class E

export default StackElement;
export { E1, E2, E22, Terminal, NonTerminal, State, Node };
