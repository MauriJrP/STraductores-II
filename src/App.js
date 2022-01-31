// import logo from './logo.svg';
import './App.css';

function App() {
	// document.getElementById('textbox').addEventListener('keydown', function (e) {
	// 	if (e.key == 'Tab') {
	// 		e.preventDefault();
	// 		var start = this.selectionStart;
	// 		var end = this.selectionEnd;

	// 		// set textarea value to: text before caret + tab + text after caret
	// 		this.value =
	// 			this.value.substring(0, start) + '\t' + this.value.substring(end);

	// 		// put caret at right position again
	// 		this.selectionStart = this.selectionEnd = start + 1;
	// 	}
	// });

	const translate = () => {
		const text = document.querySelector('#editor').value;
		console.log(text);
	};

	return (
		<div className="bg-slate-100 h-screen">
			<h1 className="bg-slate-700 p-5 font-bold text-3xl text-center text-white">
				Traductor
			</h1>
			<div className="container mx-auto bg-slate-100 py-20 grid grid-cols-9 gap-x-10">
				<div className="editor flex flex-col items-center col-span-4">
					<h2 className="text-3xl font-bold bg-slate-900 text-white w-full text-center">
						Editor
					</h2>
					<textarea
						id="editor"
						name="editor"
						cols="60"
						rows="38"
						autoFocus={true}
						className="px-3 py-5 bg-slate-50 border-2 border-t-0 border-slate-700 resize-none text-sm outline-0 w-full"
					></textarea>
				</div>
				<div className="flex flex-col justify-center">
					<div
						className="bg-blue-500 text-white font-bold p-5 rounded-md text-center hover:bg-blue-600 hover:cursor-pointer"
						onClick={translate}
					>
						<p className="text-xl ">Traducir</p>
					</div>
				</div>
				<div className="result flex flex-col items-center col-span-4">
					<h2 className="text-3xl font-bold bg-slate-900 text-white w-full text-center">
						Resultado
					</h2>
					<textarea
						name="editor"
						// cols="60"
						rows="38"
						autoFocus={true}
						className="px-3 py-5 bg-slate-50 border-2 border-t-0 border-slate-700 resize-none text-sm outline-0 w-full"
					></textarea>
				</div>
			</div>
			{/* <img src={logo} className="App-logo" alt="logo" /> */}
		</div>
	);
}

export default App;
