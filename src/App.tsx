import { useState } from 'react';
import Main from './components/Main';
import TokensTable from './components/TokensTable';
import { IToken } from './compiler/types';

export default function App() {
	const [tokens, setTokens] = useState<IToken[]>([]);

	return (
		<div className="bg-slate-100 h-full min-h-screen">
			<h1 className="bg-slate-700 p-5 font-bold text-3xl text-center text-white">
				Traductor
			</h1>
			<Main setTokens={(e: IToken[]) => setTokens(e)} />
			<div className="container w-11/12 md:w-full py-4 md:py-0 md:my-14 mx-auto">
				<TokensTable tokens={tokens} />
			</div>
		</div>
	);
}
