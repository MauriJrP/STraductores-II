class Stack {
	constructor() {
		this.items = [];
	}

	push = function (element) {
		this.items.push(element);
	};

	pop = function () {
		return this.items.pop();
	};

	//Peek top item from the Stack
	top = function () {
		return this.items[this.items.length - 1];
	};

	isEmpty = function () {
		return this.items.length === 0;
	};

	clear = function () {
		this.items.length = 0;
	};

	size = function () {
		return this.items.length;
	};

	print = function () {
		// console.log(this.items);
		this.items.forEach((element) => {
			console.log(element.type, element.pos, element.element);
		});
	};
}

export default Stack;
