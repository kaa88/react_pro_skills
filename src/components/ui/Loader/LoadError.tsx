import type { ComponentPropsWithoutRef } from 'react';
// import classes from './Loader.module.scss';
// import TranslateHandler from '../../TranslateHandler';
// import Icon from '../Icon/Icon';

interface LoadErrorProps extends ComponentPropsWithoutRef<'div'> {
	modif?: 'dark' | 'light'
	children?: undefined
}

const LoadError = function({
	modif = 'dark',
	className,
	...props
}: LoadErrorProps) {

	// return (
	// 	<TranslateHandler>
	// 		<div className={`${className} ${classes[modif]}`} {...props}>
	// 			<Icon className={classes.errIcon} name='icon-cross' />
	// 			<p className={classes.errMsg}>?_Data load error</p>
	// 		</div>
	// 	</TranslateHandler>
	// )
	return null
}

export default LoadError