class StackElement {
	constructor(type, pos, element = null, node = null) {
		this.type = type;
		this.pos = pos;
		this.element = element;
		this.node = node;
	}

	getType = () => this.type;

	setNode = (node) => (this.node = node);

	getClass = () => {
		switch (this.type) {
			case 'Terminal':
				return new Terminal(this.type, this.pos, this.element);
			case 'NonTerminal':
				return new NonTerminal(this.type, this.pos, this.element, this.node);
			case 'State':
				return new State(this.type, this.pos, this.element);
		}
	};
}

class Terminal extends StackElement {
	constructor(type, pos, element) {
		super(type, pos, element);
	}
}

class NonTerminal extends StackElement {
	constructor(type, pos, element, node) {
		super(type, pos, element, node);
	}
}

class State extends StackElement {
	constructor(type, pos) {
		super(type, pos);
	}
}

export default StackElement;
