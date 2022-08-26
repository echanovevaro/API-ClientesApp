import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { Alert } from './Alert';
import { useNavigate } from 'react-router-dom';
import { Spiner } from './Spiner';

export const Formulario = ({ cliente, cargando }) => {
	const navigate = useNavigate();

	const handleSubmit = async (value) => {
		try {
			let resp;
			if (cliente.id) {
				const url = `http://localhost:3000/clientes/${cliente.id}`;
				resp = await fetch(url, {
					method: 'PUT',
					body: JSON.stringify(value),
					headers: { 'Content-Type': 'application/json' },
				});
			} else {
				const url = 'http://localhost:3000/clientes';
				resp = await fetch(url, {
					method: 'POST',
					body: JSON.stringify(value),
					headers: { 'Content-Type': 'application/json' },
				});
			}
			console.log(resp);
			const resultado = await resp.json();
			console.log(resultado);
			navigate('/clientes');
		} catch (err) {
			console.log(err);
		}
	};

	const nuevoClienSchema = yup.object().shape({
		nombre: yup
			.string()
			.min(4, 'El nombre del cliente es muy corto')
			.max(10, 'El nombre del cliente largo')
			.required('El nombre del cliente es obligatorio'),
		empresa: yup
			.string()
			.required('El nombre de la empresa es obligatorio'),
		email: yup
			.string()
			.email('el formato del email es invalido')
			.typeError()
			.required('El email del cliente es obligatorio'),
		telefono: yup
			.number()
			.positive('Numero inválido')
			.integer('Numero inválido')
			.typeError('Numero inválido'),
		notas: '',
	});

	return cargando ? (
		<Spiner />
	) : (
		<div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto '>
			<h1 className='text-gray-600 font-bold text-xl uppercase text-center'>
				{cliente?.nombre
					? 'Editar Cliente'
					: 'Agregar un cliente'}
			</h1>
			<Formik
				initialValues={{
					nombre: cliente?.nombre ?? '',
					empresa: cliente?.empresa ?? '',
					email: cliente?.email ?? '',
					telefono: cliente?.telefono ?? '',
					notas: cliente?.notas ?? '',
				}}
				enableReinitialize={true}
				onSubmit={async (values, { resetForm }) => {
					await handleSubmit(values);
					resetForm();
					navigate('/clientes');
				}}
				validationSchema={nuevoClienSchema}>
				{({ errors, touched }) => (
					<Form className='mt-10'>
						<div className='mb-4'>
							<label className='text-gray-800' htmlFor='nombre'>
								Nombre:
							</label>
							<Field
								id='nombre'
								type='password'
								className='mt-2 block w-full p-3 bg-gray-50'
								placeholder='Nombre del cliente'
								name='nombre'
							/>
							{errors.nombre && touched.nombre ? (
								<Alert>{errors.nombre}</Alert>
							) : null}
						</div>
						<div className='mb-4'>
							<label className='text-gray-800' htmlFor='empresa'>
								Empresa:
							</label>
							<Field
								id='empresa'
								type='text'
								className='mt-2 block w-full p-3 bg-gray-50'
								placeholder='Empresa del cliente'
								name='empresa'
							/>
							{errors.empresa && touched.empresa ? (
								<Alert>{errors.empresa}</Alert>
							) : null}
						</div>
						<div className='mb-4'>
							<label className='text-gray-800' htmlFor='email'>
								E-mail:
							</label>
							<Field
								id='emai'
								type='email'
								className='mt-2 block w-full p-3 bg-gray-50'
								placeholder='Email del cliente'
								name='email'
							/>
							{errors.email && touched.email ? (
								<Alert>{errors.email}</Alert>
							) : null}
						</div>
						<div className='mb-4'>
							<label className='text-gray-800' htmlFor='telefono'>
								Teléfono:
							</label>
							<Field
								id='telefono'
								type='tel'
								className='mt-2 block w-full p-3 bg-gray-50'
								placeholder='Teléfono del cliente'
								name='telefono'
							/>
							{errors.telefono && touched.telefono ? (
								<Alert>{errors.telefono}</Alert>
							) : null}
						</div>
						<div className='mb-4'>
							<label className='text-gray-800' htmlFor='notas'>
								Notas:
							</label>
							<Field
								as='textarea'
								id='notas'
								type='text'
								className='mt-2 block w-full p-3 bg-gray-50 h-40'
								placeholder='Notas del cliente'
								name='notas'
							/>
						</div>
						<input
							type='submit'
							value={
								cliente?.nombre
									? 'Editar Cliente'
									: 'Agregar un cliente'
							}
							className='mt-5 bg-blue-800 w-full p-3 text-white uppercase font-bold text-lg'
						/>
					</Form>
				)}
			</Formik>
		</div>
	);
};

Formulario.defaultProps = {
	cliente: {},
	cargando: false,
};
