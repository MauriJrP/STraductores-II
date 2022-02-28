import Stack from './Stack';

class StackElement {
	constructor(type, element = null) {
		this.type = type;
		this.element = element;
	}
}

// class Terminal which extends StackElement
class Terminal extends StackElement {
	constructor(type, element) {
		super(type, element);
	}
}

class NonTerminal extends StackElement {
	constructor(type, element, node) {
		super(type, element);
		// let node = new Node(type);
	}
}

class State extends StackElement {
	constructor(type) {
		super(type);
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
		this.s1 = new State(this.stack.pop().type);
		this.id1 = this.stack.pop();
		this.s2 = new State(this.stack.pop().type);
		this.stack.pop();
		this.s3 = new State(this.stack.pop().type);
		this.id2 = this.stack.pop();
	}

	print = () => {
		// print the variables
		console.log('s1: ');
		console.log(this.s1.type);
		console.log('id1: ');
		console.log(this.id1.element);
		console.log('s2: ');
		console.log(this.s2.type);
		console.log('s3: ');
		console.log(this.s3.type);
		console.log('id2: ');
		console.log(this.id2.element);
	};
}

class E2 extends Node {
	// excercise 2
	constructor(stack) {
		super(stack);
		this.s1 = new State(this.stack.pop().type);
		this.nonTerminal = this.stack.pop();
		this.s2 = new State(this.stack.pop().type);
		this.stack.pop();
		this.s3 = new State(this.stack.pop().type);
		this.id = this.stack.pop();
	}

	print = () => {
		// print the variables
		console.log('s1: ');
		console.log(this.s1.type);
		console.log('No terminal: ');
		console.log(this.nonTerminal.element);
		console.log('s2: ');
		console.log(this.s2.type);
		console.log('s3: ');
		console.log(this.s3.type);
		console.log('id: ');
		console.log(this.id.element);
	};
}

class E22 extends Node {
	// excercise 2 part 2
	constructor(stack) {
		super(stack);
		this.s1 = new State(this.stack.pop().type);
		this.id1 = this.stack.pop();
		this.nonTerminal = new NonTerminal(3, 'E');
	}

	print = () => {
		// print the variables
		console.log('s1: ');
		console.log(this.s1.type);
		console.log('id1: ');
		console.log(this.id1.element);
	};
}

// class E

export default StackElement;
export { E1, E2, E22, Terminal, NonTerminal, State, Node };
