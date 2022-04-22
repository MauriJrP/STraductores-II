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