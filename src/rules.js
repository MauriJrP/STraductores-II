import Stack from './Stack';

export const rules = {
	r1: (stack) => {
		const states = [];
		const terminals = [];
		states.push(stack.pop().getClass());
		terminals.push(stack.pop().getClass());
		states.push(stack.pop().getClass());
		stack.pop();
		states.push(stack.pop().getClass());
		terminals.push(stack.pop().getClass());
		return {
			printStates: () => console.log(states),
			printTerminals: () => console.log(terminals),
		};
	},
};
