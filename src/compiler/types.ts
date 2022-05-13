import {ruleValidation} from './RuleValidation';

export interface IToken {
	token: string;
	lexeme: string;
	pos: number;
}

export interface IRuleInfo {
  pos: string,
  symbols: number,
  name: string,
}

export interface INode {
	getName(): string;
	getRuleNumber(): number;
	print(): void;
	validate(): boolean;
}

export interface IData {
	rules: string,
	table: string
}

export enum StateEnum {
	NextToken,
	Number,
	Identifier,
	String,
	Float,
	Symbol,
	Operator,
	Error,
}

export interface IScope {
	scope: string,
	values: Map<string, string>,
}

export interface IFunction {
	identifier: string,
	params: string[],
}

export type KeyOfRuleValidation = keyof typeof ruleValidation;

export interface ITabSim {
	insert(identifier: string, type: string, scope?: string): void;
	removeScope(): void;
	getScope(): string;
	setType(newType: string): void;
	getType(): string;
	find(identifier: string): void;
}

//! This method is able to save the scope but keeping only the active values
//* Symbol Insertion -> tabSim.insert('foo', 'int')
//* Search -> tabSim.find('foo')











// const tabSim = [
	// 	{
	// 		scope: 'global',
	// 		type: 'int',
	// 		identifier: 'foo',
	// 	},
	// 	{
	// 		scope: 'global',
	// 		type: 'int',
	// 		identifier: 'bar',
	// 	},
	// ]
	//! This method needs a way to store the scope for each insertion
	//* Symbol Insertion -> tabSim.push({scope: 'baz', type: 'int', identifier: 'foo'})
	//* Search -> tabSim.find(x => x.identifier === 'foo' && (x.scope === 'baz' || x.scope === 'global'))