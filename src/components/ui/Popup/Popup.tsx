import type { ComponentPropsWithRef } from 'react';
import { memo, useEffect, useRef } from 'react';
import classes from './Popup.module.scss';
// import TranslateHandler from '../../TranslateHandler';
import Icon from '../Icon/Icon';
import { setActivePopup } from '../../../store/slices/popupSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/typedReduxHooks';

interface PopupProps extends ComponentPropsWithRef<'div'> {
	modif?: 'default' | 'noCloseButton'
	name?: string
}

const Popup = memo(function Popup({modif = 'default', className = '', name = '', children, ...props}: PopupProps) {

	const popup = useRef<HTMLDivElement>(null)
	const dispatch = useAppDispatch()
	const activePopup = useAppSelector(state => state.popup.active)
	let activeClass = activePopup === name ? classes.active : ''

	useEffect(() => {
		if (activePopup === name) {
			setTimeout(() => {
				if (popup.current) popup.current.scrollIntoView({block: 'nearest', behavior: 'smooth'})
			}, 50)
		}
	})

	const closePopup = function() {
		dispatch(setActivePopup(''))
	}

	const rejectWindowClosePopupEvent = function(e: React.MouseEvent) {
		e.stopPropagation()
	}

	return (
		// <TranslateHandler>
			<div
				className={`${className} ${classes[modif]} ${activeClass}`}
				data-name={name}
				ref={popup}
				onClick={rejectWindowClosePopupEvent}
				{...props}
			>
				<div className={classes.closeBtn} onClick={closePopup}>
					<Icon name='icon-cross' />
				</div>
				{children}
			</div>
		// </TranslateHandler>
	)
})

export default Popup