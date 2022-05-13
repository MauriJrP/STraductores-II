import { IScope, IFunction, ITabSim } from "./types";
import {Terminal, NonTerminal} from './StackElement';
import {tabSim} from './TabSim';

// function that determine the type of a string between string, int or float
const typeOf = (str: string): string => {
	if (str.match(/^[0-9]+$/)) return 'int';
	if (str.match(/^[0-9]+\.[0-9]+$/)) return 'float';
	return 'string';
};

interface ruleParameters {
	// name: string,
	terminals: Terminal[],
	nonTerminals: NonTerminal[],
	ts: ITabSim,
}

export const ruleValidation = {
	1: ({terminals, nonTerminals, ts}: ruleParameters): boolean => true,
	2: ({terminals, nonTerminals, ts}: ruleParameters): boolean => true,
	3: ({terminals, nonTerminals, ts}: ruleParameters): boolean => true,
	4: ({terminals, nonTerminals, ts}: ruleParameters): boolean => true,
	5: ({terminals, nonTerminals, ts}: ruleParameters): boolean => true,
	6: ({terminals, nonTerminals, ts}: ruleParameters): boolean => {
		return true;
	},
	7: ({terminals, nonTerminals, ts}: ruleParameters): boolean => true,
}

// export const ruleValidation = {
//   1: ({terminals, nonTerminals}: ruleParameters) => console.log("r1"),
//   2: ({terminals, nonTerminals}: ruleParameters) => console.log("r2"),
//   3: ({terminals, nonTerminals}: ruleParameters) => console.log("r3"),
//   4: ({terminals, nonTerminals}: ruleParameters) => console.log("r4"),
//   5: ({terminals, nonTerminals}: ruleParameters) => console.log("r5"),
//   6: ({terminals, nonTerminals}: ruleParameters) => console.log("r6"),
//   7: ({terminals, nonTerminals}: ruleParameters) => console.log("r7"),
// 	8: ({terminals, nonTerminals}: ruleParameters) => console.log("r8"),
// 	9: ({terminals, nonTerminals}: ruleParameters) => console.log("r9"),
// 	10: ({terminals, nonTerminals}: ruleParameters) => console.log("r10"),
// 	11: ({terminals, nonTerminals}: ruleParameters) => console.log("r11"),
// 	12: ({terminals, nonTerminals}: ruleParameters) => console.log("r12"),
// 	13: ({terminals, nonTerminals}: ruleParameters) => console.log("r13"),
// 	14: ({terminals, nonTerminals}: ruleParameters) => console.log("r14"),
// 	15: ({terminals, nonTerminals}: ruleParameters) => console.log("r15"),
// 	16: ({terminals, nonTerminals}: ruleParameters) => console.log("r16"),
// 	17: ({terminals, nonTerminals}: ruleParameters) => console.log("r17"),
// 	18: ({terminals, nonTerminals}: ruleParameters) => console.log("r18"),
// 	19: ({terminals, nonTerminals}: ruleParameters) => console.log("r19"),
// 	20: ({terminals, nonTerminals}: ruleParameters) => console.log("r20"),
// 	21: ({terminals, nonTerminals}: ruleParameters) => console.log("r21"),
// 	22: ({terminals, nonTerminals}: ruleParameters) => console.log("r22"),
// 	23: ({terminals, nonTerminals}: ruleParameters) => console.log("r23"),
// 	24: ({terminals, nonTerminals}: ruleParameters) => console.log("r24"),
// 	25: ({terminals, nonTerminals}: ruleParameters) => console.log("r25"),
// 	26: ({terminals, nonTerminals}: ruleParameters) => console.log("r26"),
// 	27: ({terminals, nonTerminals}: ruleParameters) => console.log("r27"),
// 	28: ({terminals, nonTerminals}: ruleParameters) => console.log("r28"),
// 	29: ({terminals, nonTerminals}: ruleParameters) => console.log("r29"),
// 	30: ({terminals, nonTerminals}: ruleParameters) => console.log("r30"),
// 	31: ({terminals, nonTerminals}: ruleParameters) => console.log("r31"),
// 	32: ({terminals, nonTerminals}: ruleParameters) => console.log("r32"),
// 	33: ({terminals, nonTerminals}: ruleParameters) => console.log("r33"),
// 	34: ({terminals, nonTerminals}: ruleParameters) => console.log("r34"),
// 	35: ({terminals, nonTerminals}: ruleParameters) => console.log("r35"),
// 	36: ({terminals, nonTerminals}: ruleParameters) => console.log("r36"),
// 	37: ({terminals, nonTerminals}: ruleParameters) => console.log("r37"),
// 	38: ({terminals, nonTerminals}: ruleParameters) => console.log("r38"),
// 	39: ({terminals, nonTerminals}: ruleParameters) => console.log("r39"),
// 	40: ({terminals, nonTerminals}: ruleParameters) => console.log("r40"),
// 	41: ({terminals, nonTerminals}: ruleParameters) => console.log("r41"),
// 	42: ({terminals, nonTerminals}: ruleParameters) => console.log("r42"),
// 	43: ({terminals, nonTerminals}: ruleParameters) => console.log("r43"),
// 	44: ({terminals, nonTerminals}: ruleParameters) => console.log("r44"),
// 	45: ({terminals, nonTerminals}: ruleParameters) => console.log("r45"),
// 	46: ({terminals, nonTerminals}: ruleParameters) => console.log("r46"),
// 	47: ({terminals, nonTerminals}: ruleParameters) => console.log("r47"),
// 	48: ({terminals, nonTerminals}: ruleParameters) => console.log("r48"),
// 	49: ({terminals, nonTerminals}: ruleParameters) => console.log("r49"),
// 	50: ({terminals, nonTerminals}: ruleParameters) => console.log("r50"),
// 	51: ({terminals, nonTerminals}: ruleParameters) => console.log("r51"),
// 	52: ({terminals, nonTerminals}: ruleParameters) => console.log("r52"),
// }
