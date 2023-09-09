import type { ComponentPropsWithoutRef } from 'react';
import classes from './Loader.module.scss';
import Icon from '../Icon/Icon';

interface LoaderProps extends ComponentPropsWithoutRef<'div'> {
	modif?: 'dark' | 'light'
	children?: undefined
}

const Loader = function({
	modif = 'dark',
	className,
	...props
}: LoaderProps) {

	return (
		<div className={`${className} ${classes[modif]}`} {...props}>
			<Icon className={classes.loadIcon} name='icon-spinner' />
		</div>
	)
}

export default Loader