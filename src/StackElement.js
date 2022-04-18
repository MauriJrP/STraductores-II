import Stack from './Stack';

class StackElement {
	constructor(type, pos, element = null) {
		this.type = type;
		this.pos = pos;
		this.element = element;
	}

	getType = () => this.type;

	getClass = () => {
		switch (this.type) {
			case 'Terminal':
				return new Terminal(this.type, this.pos, this.element);
			case 'NonTerminal':
				return new NonTerminal(this.type, this.pos, this.element);
			case 'State':
				return new State(this.type, this.pos);
		}
	};
}

// class Terminal which extends StackElement
class Terminal extends StackElement {
	constructor(type, pos, element) {
		super(type, pos, element);
	}
}

class NonTerminal extends StackElement {
	constructor(type, pos, element) {
		super(type, pos, element);
		// let node = new Node(pos);
	}
}

class State extends StackElement {
	constructor(type, pos) {
		super(type, pos);
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
		this.s1 = new State(this.stack.pop().pos);
		this.id1 = this.stack.pop();
		this.s2 = new State(this.stack.pop().pos);
		this.stack.pop();
		this.s3 = new State(this.stack.pop().pos);
		this.id2 = this.stack.pop();
	}

	print = () => {
		// print the variables
		console.log('s1: ');
		console.log(this.s1.pos);
		console.log('id1: ');
		console.log(this.id1.element);
		console.log('s2: ');
		console.log(this.s2.pos);
		console.log('s3: ');
		console.log(this.s3.pos);
		console.log('id2: ');
		console.log(this.id2.element);
	};
}

class E2 extends Node {
	// excercise 2
	constructor(stack) {
		super(stack);
		this.s1 = new State(this.stack.pop().pos);
		this.nonTerminal = this.stack.pop();
		this.s2 = new State(this.stack.pop().pos);
		this.stack.pop();
		this.s3 = new State(this.stack.pop().pos);
		this.id = this.stack.pop();
	}

	print = () => {
		// print the variables
		console.log('s1: ');
		console.log(this.s1.pos);
		console.log('No terminal: ');
		console.log(this.nonTerminal.element);
		console.log('s2: ');
		console.log(this.s2.pos);
		console.log('s3: ');
		console.log(this.s3.pos);
		console.log('id: ');
		console.log(this.id.element);
	};
}

class E22 extends Node {
	// excercise 2 part 2
	constructor(stack) {
		super(stack);
		this.s1 = new State(this.stack.pop().pos);
		this.id1 = this.stack.pop();
		this.nonTerminal = new NonTerminal(3, 'E');
	}

	print = () => {
		// print the variables
		console.log('s1: ');
		console.log(this.s1.pos);
		console.log('id1: ');
		console.log(this.id1.element);
	};
}

// class E

export default StackElement;
export { E1, E2, E22, Terminal, NonTerminal, State, Node };
