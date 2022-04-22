import {Stack} from './Stack';
import {StackElement, Terminal, NonTerminal, State} from './StackElement';
import {IRuleInfo, INode} from './types';

const pops = (stack: Stack<StackElement>, pops: number = 0): [State[], Terminal[], NonTerminal[]] => {
	const states: State[]  = [];
	const terminals: Terminal[]  = [];
	const nonTerminals: NonTerminal[]  = [];

	let type: string = '';
	let stackElement: StackElement | undefined;
	let state: State = new State('', 0);
	let terminal: Terminal = new Terminal('', 0, '');
	let nonTerminal: NonTerminal = new NonTerminal('', 0, '');

	for (let i = 0; i < pops; i++) {
		type = stack.top().getType();
		stackElement = stack.pop();

		if (stackElement === undefined) continue;
		else if (stackElement.getType() === 'Terminal') terminal = stackElement.getClass();
		else if (stackElement.getType() === 'NonTerminal') nonTerminal = stackElement.getClass();
		else if (stackElement.getType() === 'State') state = stackElement.getClass();

		switch (type) {
			case 'Terminal':
				terminals.push(terminal);
				break;
			case 'NonTerminal':
				nonTerminals.push(nonTerminal);
				break;
			case 'State':
				states.push(state);
				break;
		}
	}

	return [states, terminals, nonTerminals];
};

const print = (name: string, states: State[], terminals: Terminal[], nonTerminals: NonTerminal[]): void => {
	console.log(name, states, terminals, nonTerminals);
	if (nonTerminals.length > 0)
		nonTerminals.forEach((symbol) => {
			if (symbol.node) {
				symbol.node.print();
			}
		});
};

export const rules = {
	r1: (stack: Stack<StackElement>, ruleInfo: IRuleInfo): INode => {
		const name: string = ruleInfo.name;
		const [states, terminals, nonTerminals]: [State[], Terminal[], NonTerminal[]] = pops(stack, ruleInfo.symbols * 2);
		return {
			print: (): void => print(name, states, terminals, nonTerminals),
			getName: (): string => name,
		};
	},
};
