import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const ObtenerCliente = () => {
	const { id } = useParams();
	const [cliente, setCliente] = useState({});
	const [cargando, setCargando] = useState(true);
	useEffect(() => {
		const obtenerClienteAPI = async () => {
			try {
				const url = `http://localhost:3000/clientes/${id}`;
				const respuesta = await fetch(url);
				const resultado = await respuesta.json();

				console.log(resultado);
				setCliente(resultado);
			} catch (error) {
				console.log(error);
			}
			setCargando(!cargando);
		};
		obtenerClienteAPI();
	}, []);

	return { cliente, cargando };
};
