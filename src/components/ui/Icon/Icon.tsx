import { CustomFCProps } from '../../../types/CustomFCProps';
import classes from './Icon.module.scss';
import iconSprite from './sprite.svg';

interface IconProps extends CustomFCProps<SVGElement> {
	name: string
	size?: string // eg '20px'
}

const Icon = function({
	className = '',
	name,
	size,
	style = {},
	...props
}: IconProps) {

	const path = `${iconSprite}#${name}`
	if (size) style.width = style.height = size;
	return (
		<svg
			className={`${className} ${classes.svg}`}
			name={name}
			style={style}
			{...props}
		>
			<use href={path}></use>
		</svg>
	)
}

export default Icon