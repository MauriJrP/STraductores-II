import {Stack} from './Stack';
import {StackElement, Terminal, NonTerminal, State} from './StackElement';
import {IRuleInfo, INode, KeyOfRuleValidation, ITabSim} from './types';
import {ruleValidation} from './RuleValidation';
import {tabSim} from './TabSim';

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
	nonTerminals.forEach(symbol => symbol.node?.print());
};

const validation = (ruleNum: KeyOfRuleValidation, terminals: Terminal[], nonTerminals: NonTerminal[], ts: ITabSim): boolean => {
	if (!nonTerminals.every(symbol => symbol.node?.validate())) return false; // recursion

	return ruleValidation[ruleNum]({terminals, nonTerminals, ts});
}

export const getNodeWithPops = (stack: Stack<StackElement>, ruleInfo: IRuleInfo, ruleNum: number): INode => {
		const name: string = ruleInfo.name;
		const ruleNumber: number = ruleNum;
		const ts = tabSim();
		const [states, terminals, nonTerminals]: [State[], Terminal[], NonTerminal[]] = pops(stack, ruleInfo.symbols * 2);
		return {
			getName: (): string => name,
			getRuleNumber: (): number => ruleNumber,
			print: (): void => print(ruleNumber, name, states, terminals, nonTerminals),
			validate: (): boolean => validation(ruleNumber as KeyOfRuleValidation, terminals, nonTerminals, ts),
		};
	};
