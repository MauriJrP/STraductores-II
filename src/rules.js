const pops = (stack, pops = 0) => {
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
	if (nonTerminals.length > 0)
		nonTerminals.forEach((symbol) => {
			if (symbol.node) {
				symbol.node.print();
			}
		});
};

export const rules = {
	r1: (stack, ruleInfo) => {
		const name = ruleInfo.name;
		const [states, terminals, nonTerminals] = pops(stack, ruleInfo.symbols * 2);
		return {
			print: () => print(name, states, terminals, nonTerminals),
			getName: () => name,
		};
	},
};
