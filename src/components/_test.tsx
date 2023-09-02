import React from 'react';
// import classes from './Card.module.scss';

export enum Width {
	one = '1px',
	two = '2px'
}

interface CardProps {
	children?: React.ReactNode
	className?: string
	width?: Width
	height?: string
	name?: any
	onClick?: () => number | void
}

const Card = ({width, className = '', children}: CardProps) => {
	console.log(width);
	

	const classes = {
		default: 'default'
	}

	return (
		<div className={classes.default}>
			
		</div>
	)
}
export default Card