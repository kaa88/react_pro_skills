import type { ComponentPropsWithoutRef } from 'react';
import { useEffect, useState } from 'react';
import classes from './InputPassword.module.scss';
import Icon from '../Icon/Icon';

interface InputPasswordProps extends ComponentPropsWithoutRef<'input'> {
	modif?: 'default' | 'textCenter'
	children?: undefined
}

const PASSWORD = 'password'
const TEXT = 'text'

function InputPassword({
	modif = 'default',
	className = '',
	...props
}: InputPasswordProps) {

	let [value, setValue] = useState('')
	let [type, setType] = useState(PASSWORD)

	const icons: {[index: string]: string} = {
		[PASSWORD]: 'icon-eye-close',
		[TEXT]: 'icon-eye'
	}

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		setValue(e.target.value)
	}

	function changeVisibility() {
		if (type === PASSWORD) setType(TEXT)
		else setType(PASSWORD)
	}

	function resetType() {
		if (type !== PASSWORD) setType(PASSWORD)
	}


	useEffect(() => {
		resetType()
		return () => resetType()
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div className={`${className} ${classes.inputBox}`}>
			<input
				type={type}
				className={classes[modif]}
				value={value}
				onChange={handleChange}
				{...props}
			/>
			<div className={classes.iconBox}>
				<Icon className={classes.icon} name={icons[type]} onClick={changeVisibility} />
			</div>
		</div>
	)
}

export default InputPassword