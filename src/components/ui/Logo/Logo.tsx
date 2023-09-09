import type { ComponentPropsWithoutRef } from 'react';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import classes from './Logo.module.scss';
import Icon from '../Icon/Icon';

interface LogoProps extends ComponentPropsWithoutRef<'div'> {
	modif?: 'default' | 'negative'
	children?: undefined
}

const Logo = memo(function({
	modif = 'default',
	className,
	...props
}: LogoProps) {

	return (
		<div className={`${className} ${classes[modif]}`} {...props}>
			<Link to='/' className={classes.link}>
				<span>RENT</span>
				<Icon className={classes.icon} name='icon-at' />
				<span>CAR</span>
			</Link>
		</div>
	)
})

export default Logo