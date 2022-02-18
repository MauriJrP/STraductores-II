class StackElement {
	constructor(type, element = null) {
		this.type = type;
		this.element = element;
	}
}

// class Terminal which extends StackElement
class Terminal extends StackElement {
	constructor(type, element) {
		super(type);
		this.element = element;
	}
}

class NonTerminal extends StackElement {
	constructor(type, element) {
		super(type);
		this.element = element;
		// let node = new Node(type);
	}
}

class State extends StackElement {
	constructor(type) {
		super(type);
	}
}

class Node {
	constructor() {}
}

export default StackElement;
export { Terminal, NonTerminal, State, Node };
