import { CustomFCProps } from '../../../types/CustomFCProps';
import classes from './Button.module.scss';

interface ButtonProps extends CustomFCProps<HTMLButtonElement> {
	modif?: string
	type?: 'button' | 'submit' | 'reset' | undefined
}

const Button = function({
	className = '',
	modif = 'default',
	children = 'button',
	...props
}: ButtonProps) {

	return (
		<button className={`${className} ${classes[modif]}`} {...props}>
			{children}
		</button>
	)
}

export default Button