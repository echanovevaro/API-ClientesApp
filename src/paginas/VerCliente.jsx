import { Spiner } from '../componets/Spiner';
import { ObtenerCliente } from '../handlers/ObtenerCliente';

export const VerCliente = () => {
	const { cliente, cargando } = ObtenerCliente();

	return cargando ? (
		<Spiner />
	) : Object.keys(cliente).length === 0 ? (
		<p>No hay resultados</p>
	) : (
		<>
			<div>
				<h1 className='font-black text-4xl text-blue-900'>
					Ver Cliente:
				</h1>
				<p className='mt-3'>Información del Cliente</p>
				<p className='text-1xl text-gray-600 mt-10'>
					<span className='uppercase font-bold  text-gray-800'>
						Cliente:
					</span>
					{cliente.nombre}
				</p>
				<p className='text-1xl text-gray-600 '>
					<span className='uppercase font-bold  text-gray-800'>
						Email:
					</span>
					{cliente.email}
				</p>
				<p className='text-1xl text-gray-600 '>
					<span className='uppercase font-bold  text-gray-800'>
						Teléfono:
					</span>
					{cliente.telefono}
				</p>
				<p className='text-1xl text-gray-600 '>
					<span className='uppercase font-bold  text-gray-800'>
						Empresa:
					</span>
					{cliente.empresa}
				</p>
				{cliente.notas && (
					<p className='text-1xl text-gray-600 '>
						<span className='uppercase font-bold  text-gray-800'>
							Notas:
						</span>
						{cliente.notas}
					</p>
				)}
			</div>
		</>
	);
};
