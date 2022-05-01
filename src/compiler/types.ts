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
	print(): void;
	getName(): string;
	validate(): boolean;
}

export interface IData {
	rules: string,
	table: string
}

// export interface scope {
// 	scope: string,
// 	type: string,
// 	value: string,
// }

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