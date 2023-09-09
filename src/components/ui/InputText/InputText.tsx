import type { ComponentPropsWithoutRef } from 'react';
import classes from './InputText.module.scss';

interface InputTextProps extends ComponentPropsWithoutRef<'input'> {
	modif?: 'default' | 'textCenter'
	children?: undefined
}

function InputText({
	modif = 'default',
	className = '',
	...props
}: InputTextProps) {
	
	return (
		<input type='text' className={`${className} ${classes[modif]}`} {...props} />
	)
}

export default InputText