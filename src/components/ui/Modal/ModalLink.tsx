import React, { memo, cloneElement } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveModal } from '../../../store/slices/modalSlice';
import ModalStaticContent from './ModalStaticContent';
import {getCssVariable} from '../../../utilities/utilities';
import { transitionIsLocked } from '../../../utilities/transitionLock';

const timeout = getCssVariable('timer-modal')*1000

type ModalLinkProps = {
	name?: string
	content?: (() => any) | string
	children?: React.ReactElement | null
}

const ModalLink = memo(function ModalLink({ name = '', content = '', children }: ModalLinkProps) {

	if (!children) return null
	
	const dispatch = useDispatch()

	function getContent() {
		if (name) {
			if (content) {
				if (typeof content === 'function') return content()
				else return content
			}
			else return <ModalStaticContent name={name} />
		}
		else return ''
	}

	function showModal(e: Event) {
		if (transitionIsLocked(timeout)) return;
		dispatch(setActiveModal({name, content: getContent()}))
		if (children?.props?.onClick) children.props.onClick(e)
	}

	const newProps = {...children.props, onClick: showModal}
	const updatedChild = cloneElement(children, newProps)

	return updatedChild
})

export default ModalLink
