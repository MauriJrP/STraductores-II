import { Stack } from './Stack';
import { Lexer } from './Lexer';
import { StackElement } from './StackElement';
import { data } from './data';
import { getNodeWithPops } from './SyntaxTree';
import { IData, INode, IRuleInfo, IToken } from './types';

export default class Parser {
	data: IData;
	stack: Stack<StackElement>;
	lexer: Lexer;
	tree?: INode;
	table: string[][];
	rulesInfo: IRuleInfo[];

	constructor() {
		this.data = data;
		this.stack = new Stack();
		this.lexer = new Lexer();
		this.tree = undefined;

		// parse table & rules
		const rows = this.data.table.split('\n');
		this.table = rows.map((row) => row.split('\t'));
		const rulesInfoRows = this.data.rules.split('\n');
		this.rulesInfo = rulesInfoRows.map((row) => {
			const info = row.split('\t');
			return {
				pos: info[0],
				symbols: parseInt(info[1]),
				name: info[2],
			};
		});

		// initialize the stack with $0
		this.stack.push(new StackElement('Terminal', 23, '$'));
		this.stack.push(new StackElement('State', 0));
	}

	shift = (token: IToken, num: number /*row in lr table*/): void => {
		this.stack.push(new StackElement('Terminal', token.pos, token.lexeme));
		this.stack.push(new StackElement('State', num));
	};

	reduction = (rule: number): void => {
		const ruleNum: number = Math.abs(rule + 2); // rule position on rulesInfo array from 0
		const ruleInfo: IRuleInfo = this.rulesInfo[ruleNum];

		// this.tree = rules[`r${ruleNum + 1}`](this.stack, ruleInfo); for when the rules have sense
		this.tree = getNodeWithPops(this.stack, ruleInfo, ruleNum + 1); // rules start from 1

		let top: number = this.stack.top().pos;
		this.stack.push(
			new StackElement('NonTerminal', parseInt(ruleInfo.pos), ruleInfo.name, this.tree)
		);
		this.stack.push(
			new StackElement('State', parseInt(this.table[top][this.stack.top().pos]))
		);
	};

	parse = (input: string): string => {
		let state: string = '';

		let action: number = 1; // value in the position of the lr table
		let token: IToken | null = { token: '', lexeme: '', pos: 0 };

		while (state === '') {
			if (action > 0 && token.lexeme !== '$') {
				// get next token if is a shift and is not the end of the input
				token = this.lexer.nextToken(input);
				if (token === null || token === undefined)
					token = { token: '$', lexeme: '$', pos: 23 }; // $ is the end of the input
			}

			action = parseInt(this.table[this.stack.top().pos][token.pos]); // [state][input]

			if (action === 0) state = 'error';
			else if (action === -1) state = 'accept';
			else if (action <= -2) this.reduction(action);
			else if (action >= 1) this.shift(token, action);
		}

		this.tree?.print();
		return state;
	};
}
