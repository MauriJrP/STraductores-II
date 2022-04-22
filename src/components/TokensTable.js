import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const columns = [
	{ id: 'lexeme', label: 'Lexema', minWidth: 170 },
	{ id: 'token', label: 'Token', minWidth: 100 },
	{
		id: 'pos',
		label: 'Numero',
		minWidth: 170,
		align: 'right',
	},
];

export default function TokensTable({ tokens }) {
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
							// console.log(element);
							return (
								<TableRow hover role="checkbox" tabIndex={-1} key={index}>
									{columns.map((column, i) => {
										const value = element[column.id];
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
