import React from 'react';

export const Alert = ({ children }) => {
	return (
		<div className='text-center my-4 bg-red-600 text-white font-blod p-3 uppercase'>
			{children}
		</div>
	);
};
