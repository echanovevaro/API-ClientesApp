import React from 'react';
import { Formulario } from '../componets/Formulario';
import { ObtenerCliente } from '../handlers/ObtenerCliente';

export const EditarCliente = () => {
	const { cliente, cargando } = ObtenerCliente();
	return (
		<>
			{' '}
			<h1 className='font-black text-4xl text-blue-900'>
				Editar Cliente
			</h1>
			<p className='mt-3'>Introduce los cámbios</p>
			{cliente?.nombre ? (
				<Formulario cliente={cliente} cargando={cargando} />
			) : (
				<p>Ciente ID no válido</p>
			)}
		</>
	);
};
