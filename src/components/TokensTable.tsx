import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { IColumn } from './types';
import { IToken } from '../compiler/types';

interface IProps {
	tokens: IToken[];
}

const columns: IColumn[] = [
	{ id: 'lexeme', label: 'Lexema', minWidth: 170 },
	{ id: 'token', label: 'Token', minWidth: 100 },
	{
		id: 'pos',
		label: 'Numero',
		minWidth: 170,
		align: 'right',
	},
];

export default function TokensTable({ tokens }: IProps) {
	return (
		<Paper sx={{ overflow: 'hidden', margin: 'auto' }} elevation={24}>
			<TableContainer sx={{ maxHeight: 300 }} className="scrollbar-hide">
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow className="bg-slate-700">
							{columns.map((column) => (
								<TableCell
									key={column.id}
									align={column.align}
									style={{ minWidth: column.minWidth, fontWeight: 'bold' }}
									className="bg-slate-700 text-white"
								>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{tokens.map((element, index) => {
							return (
								<TableRow hover role="checkbox" tabIndex={-1} key={index}>
									{columns.map((column, i) => {
										let value: string = '';
										if (column.id === 'lexeme') value = element.lexeme;
										else if (column.id === 'token') value = element.token;
										else if (column.id === 'type') value = (element.pos).toString();
										return (
											<TableCell
												key={i}
												align={column.align}
												sx={{ maxWidth: 15, width: '70%', overflow: 'auto' }}
											>
												{value}
											</TableCell>
										);
									})}
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	);
}
