import {IFunction, IScope} from './types';

export const tabSim = () => {
	let type: string = '';
	const functions: IFunction[] = [];
	const scopes: IScope[] = [
		{
			scope: 'global',
			values: new Map<string, string>()
		},
	];
	return {
		insert: (identifier: string, type: string, scope?: string): void => {
			if (scope) scopes.push({scope, values: new Map<string, string>()});
			scopes[scopes.length - 1].values.set(identifier, type);
		},
		removeScope: () => {scopes.pop()},
		getScope: (): string => scopes[scopes.length - 1].scope,
		setType: (newType: string) => type = newType,
		getType: () => type,
		find: (identifier: string) => {},
	}
}