import {Stack} from './Stack';
import {StackElement, Terminal, NonTerminal, State} from './StackElement';
import {IRuleInfo, INode, IScope} from './types';

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

const print = (ruleNum: number, name: string, states: State[], terminals: Terminal[], nonTerminals: NonTerminal[]): void => {
	console.log(ruleNum, name, states, terminals, nonTerminals);
	if (nonTerminals.length > 0)
		nonTerminals.forEach((symbol) => {
			if (symbol.node) {
				symbol.node.print();
			}
		});
};

// function that determine the type of a string between string, int or float
const typeOf = (str: string): string => {
	if (str.match(/^[0-9]+$/)) return 'int';
	if (str.match(/^[0-9]+\.[0-9]+$/)) return 'float';
	return 'string';
};

const tabSim = () => {
	const scopes: IScope[] = [
		{
			scope: 'global',
			values: new Map<string, string>(),
		},
		{
			scope: 'foo',
			values: new Map<string, string>(),
		},
	];
	return {
		insert: (identifier: string, type: string, scope?: string,): void => {
			if (scope) scopes.push({scope, values: new Map<string, string>()});
			scopes[scopes.length - 1].values.set(identifier, type);
		},
		removeScope: () => {scopes.pop()},
		find: (identifier: string) => {},
	}
}

const validate = (ruleNum: number, terminals: Terminal[], nonTerminals: NonTerminal[]): boolean => {
	return true;
}

export const getNodeWithPops = (stack: Stack<StackElement>, ruleInfo: IRuleInfo, ruleNum: number): INode => {
		const name: string = ruleInfo.name;
		const ruleNumber: number = ruleNum;
		const [states, terminals, nonTerminals]: [State[], Terminal[], NonTerminal[]] = pops(stack, ruleInfo.symbols * 2);
		return {
			getName: (): string => name,
			print: (): void => print(ruleNumber, name, states, terminals, nonTerminals),
			validate: (): boolean => validate(ruleNumber, terminals, nonTerminals),
		};
	};
