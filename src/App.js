import { useState } from 'react';
import './App.css';
import Parser from './Parser';

export default function App() {
	const [formData, setFormData] = useState({ input: '', output: '' });

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	// handle tabs in textarea
	const handleKeyDown = (e) => {
		const textarea = e.target;
		if (e.key === 'Tab' && !e.shiftKey) {
			e.preventDefault();
			const selectionStart = textarea.selectionStart;
			const selectionEnd = textarea.selectionEnd;
			setFormData((prevState) => ({
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

	const translate = () => {
		const parser = new Parser();
		parser.parse(formData.input);

		if (formData.input.length > 0) {
			let state1 = parser.parse1(formData.input); // exercise 1
			let state2 = parser.parse2(formData.input); // exercise 2
			// output.value = 'Ejercicio 1: ' + state1;
			setFormData((prevState) => ({
				...prevState,
				output: 'Ejercicio 1: ' + state1 + '\nEjercicio 2: ' + state2,
			}));
		}
	};

	return (
		<div className="bg-slate-100 h-full min-h-screen">
			<h1 className="bg-slate-700 p-5 font-bold text-3xl text-center text-white">
				Traductor
			</h1>
			<div className="container mx-auto bg-slate-100 md:py-20 grid md:grid-cols-5 lg:grid-cols-7 gap-x-10">
				<div className="flex flex-col items-center md:col-span-2 lg:col-span-3">
					<h2 className="text-3xl font-bold bg-slate-700 text-white w-full text-center">
						Editor
					</h2>
					<textarea
						name="input"
						cols="60"
						rows="20"
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
						rows="20"
						autoFocus={true}
						className="px-3 py-5 bg-slate-50 border-2 border-t-0 border-slate-700 resize-none text-sm outline-0 w-full font-bold"
						readOnly={true}
						value={formData.output}
					/>
				</div>
			</div>
		</div>
	);
}
