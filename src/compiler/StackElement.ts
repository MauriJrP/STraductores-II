import {INode} from './types'

export class StackElement {
	type: string;
	pos: number;
	element?: string;
	node?: INode;

	constructor(type: string, pos: number, element?: string, node?: INode) {
		this.type = type;
		this.pos = pos;
		this.element = element;
		this.node = node;
	}

	getType = (): string => this.type;

	setNode = (node: any): void => (this.node = node);

	getClass = (): Terminal | NonTerminal | State => {
		if (this.type === 'Terminal') return new Terminal(this.type, this.pos, this.element);
		if (this.type === 'NonTerminal') return new NonTerminal(this.type, this.pos, this.element, this.node);
		return new State(this.type, this.pos);
	};
}

export class Terminal extends StackElement {
	constructor(type: string, pos: number, element?: string) {
		super(type, pos, element);
	}
}

export class NonTerminal extends StackElement {
	constructor(type: string, pos: number, element?: string , node?: INode) {
		super(type, pos, element, node);
	}
}

export class State extends StackElement {
	constructor(type: string, pos: number) {
		super(type, pos);
	}
}
