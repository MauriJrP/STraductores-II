import React from 'react';
import { useState } from 'react';

import Parser from '../compiler/Parser';
import { Lexer } from '../compiler/Lexer';

import {IToken} from '../compiler/types';
import { IFormData } from './types';

interface IProps {
	setTokens: (tokens: IToken[]) => void;
}

export default function Main(props: IProps) {
	const [formData, setFormData] = useState<IFormData>({ input: '', output: '' });

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
		const { name, value } = e.target as HTMLTextAreaElement;
		setFormData((prevState: IFormData): IFormData => ({
			...prevState,
			[name]: value,
		}));
	};

	// handle tabs in textarea
	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
		const textarea = e.target as HTMLTextAreaElement;
		if (e.key === 'Tab' && !e.shiftKey) {
			e.preventDefault();
			const selectionStart: number = textarea.selectionStart;
			const selectionEnd: number = textarea.selectionEnd;
			setFormData((prevState: IFormData): IFormData => ({
				...prevState,
				input:
					prevState.input.substring(0, selectionStart) +
					'  ' +
					prevState.input.substring(selectionEnd),
			}));

			textarea.selectionStart =
				selectionEnd + 2 - (selectionEnd - selectionStart);
			textarea.selectionEnd =
				selectionEnd + 2 - (selectionEnd - selectionStart);
		}
	};

	const translate = (): void => {
		const parser: Parser = new Parser();
		const lexer: Lexer = new Lexer();

		if (formData.input.length > 0) {
			props.setTokens(lexer.getTokens(formData.input));
			let result: string = parser.parse(formData.input);
			setFormData((prevState: IFormData): IFormData => ({
				...prevState,
				output: `resultado: ${result}`,
			}));
		}
	};

	return (
		<div className="container mx-auto bg-slate-100 md:pt-20 grid md:grid-cols-5 lg:grid-cols-7 gap-x-10">
			<div className="flex flex-col items-center md:col-span-2 lg:col-span-3">
				<h2 className="text-3xl font-bold bg-slate-700 text-white w-full text-center">
					Editor
				</h2>
				<textarea
					name="input"
					cols={60}
					rows={20}
					autoFocus={true}
					className="px-3 py-5 bg-slate-50 border-2 border-t-0 border-slate-700 resize-none text-sm outline-0 w-full font-bold"
					onChange={handleChange}
					onKeyDown={handleKeyDown}
					value={formData.input}
				/>
			</div>
			<div className="h-24 md:h-full flex flex-col justify-center">
				<div
					className="h-16 md:h-min flex justify-center items-center bg-blue-500 text-white font-bold p-1 lg:p-4 md:rounded-md text-center hover:bg-blue-600 hover:cursor-pointer"
					onClick={translate}
				>
					<p className="text-3xl lg:text-xl md:hidden lg:inline-block">
						Traducir
					</p>
					<img
						src={process.env.PUBLIC_URL + '/img/arrow.png'}
						alt="Arrow"
						className="hidden md:inline-block lg:hidden"
					/>
				</div>
			</div>
			<div className="output flex flex-col items-center md:col-span-2 lg:col-span-3">
				<h2 className="text-3xl font-bold bg-slate-700 text-white w-full text-center">
					Resultado
				</h2>
				<textarea
					name="output"
					rows={20}
					autoFocus={true}
					className="px-3 py-5 bg-slate-50 border-2 border-t-0 border-slate-700 resize-none text-sm outline-0 w-full font-bold"
					readOnly={true}
					value={formData.output}
				/>
			</div>
		</div>
	);
}
