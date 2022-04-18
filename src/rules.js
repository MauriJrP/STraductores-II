const pops = (stack, pops = 0, node) => {
	const states = [];
	const terminals = [];
	const nonTerminals = [];

	let type = '';

	for (let i = 0; i < pops; i++) {
		type = stack.top().getType();
		switch (type) {
			case 'Terminal':
				terminals.push(stack.pop().getClass());
				break;
			case 'NonTerminal':
				nonTerminals.push(stack.pop().getClass());
				if (node !== null) {
					// nonTerminals[nonTerminals.length - 1].setNode(node);
					// console.log('entro');
				}
				break;
			case 'State':
				states.push(stack.pop().getClass());
				break;
		}
	}

	return [states, terminals, nonTerminals];
};

const print = (name, states, terminals, nonTerminals) => {
	console.log(name, states, terminals, nonTerminals);
	// if (nonTerminals.length > 0)
	// 	nonTerminals.forEach((nonTerminal) => nonTerminal.node.print());
};

export const rules = {
	r1: (stack, ruleInfo, node) => {
		const name = ruleInfo.name;
		const [states, terminals, nonTerminals] = pops(
			stack,
			ruleInfo.symbols * 2,
			node
		);
		return {
			print: () => print(name, states, terminals, nonTerminals),
		};
	},
};
