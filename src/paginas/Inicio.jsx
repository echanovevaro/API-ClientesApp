import { useEffect, useState } from 'react';
import { Cliente } from '../componets/Cliente';

export const Inicio = () => {
	const [clientes, setClientes] = useState([]);

	useEffect(() => {
		const listadoClientesAPI = async () => {
			try {
				const url = 'http://localhost:3000/clientes';
				const repuesta = await fetch(url);
				const resultado = await repuesta.json();
				setClientes(resultado);
			} catch (e) {
				console.log(e);
			}
		};
		listadoClientesAPI();
	}, []);

	const handleEliminar = async (id) => {
		const confirmar = confirm(
			'Deseas Eliminar este cliente?',
		);
		if (confirmar) {
			try {
				const url = `http://localhost:3000/clientes/${id}`;
				const resp = await fetch(url, {
					method: 'DELETE',
				});

				await resp.json();
				const arrayClientes = clientes.filter(
					(cl) => cl.id !== id,
				);
				setClientes(arrayClientes);
				navigate('/clientes');
			} catch (err) {
				console.log(err);
			}
		}
	};

	return (
		<>
			{' '}
			<h1 className='font-black text-4xl text-blue-900'>
				Clientes
			</h1>
			<p className='mt-3'>Administra tus clientes</p>
			<table className='w-full mt-5 table-auto shadow bg-white'>
				<thead className='bg-blue-800 text-white'>
					<tr>
						<th className='p-2'>Nombre</th>
						<th className='p-2'>Contacto</th>
						<th className='p-2'>Empresa</th>
						<th className='p-2'>Acciones</th>
					</tr>
				</thead>
				<tbody>
					{clientes.map((cliente) => (
						<Cliente
							key={cliente.id}
							cliente={cliente}
							handleEliminar={handleEliminar}
						/>
					))}
				</tbody>
			</table>
		</>
	);
};
