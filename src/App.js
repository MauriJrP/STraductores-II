import { useState } from 'react';
import './App.css';
import Main from './Main';
import TokensTable from './TokensTable';

export default function App() {
	const [elements, setElements] = useState([]);

	return (
		<div className="bg-slate-100 h-full min-h-screen">
			<h1 className="bg-slate-700 p-5 font-bold text-3xl text-center text-white">
				Traductor
			</h1>
			<Main setElements={(e) => setElements(e)} />
			<div className="container w-11/12 md:w-full py-4 md:py-0 md:my-14 mx-auto">
				<TokensTable elements={elements} />
			</div>
		</div>
	);
}
