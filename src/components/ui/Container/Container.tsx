import { CustomFCProps } from '../../../types/CustomFCProps';
import classes from './Container.module.scss';

interface ContainerProps extends CustomFCProps<HTMLElement> {
	modif?: string
}

function Container({
	modif = 'default',
	className = '',
	children,
	...props
}: ContainerProps) {
	return (
		<div className={`${className} ${classes[modif]}`} {...props}>
			{children}
		</div>
	)
}

export default Container