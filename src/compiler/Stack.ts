export class Stack <T>{
	items: T[];

	constructor() {
		this.items = [];
	}

	push = (element: T): void => {
		this.items.push(element);
	};

	pop = (): T | undefined => {
		if (this.items.length === 0) return undefined;
		return this.items.pop();
	};

	//Peek top item from the Stack
	top = (): T => {
		return this.items[this.items.length - 1];
	};

	isEmpty = (): boolean => {
		return this.items.length === 0;
	};

	clear = (): void => {
		this.items.length = 0;
	};

	size = (): number => {
		return this.items.length;
	};
}
