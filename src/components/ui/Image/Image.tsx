import type { ComponentPropsWithRef } from 'react';
import { useRef } from 'react';
import classes from './Image.module.scss';

// TODO: add picture source for media queries

interface ImageProps extends ComponentPropsWithRef<'img'> {}

function Image({className = '', src = '', ...props}: ImageProps) {

	let img = src, img2x;
	if (Array.isArray(src)) [img, img2x] = src

	const imageRef = useRef<HTMLImageElement>(null)

	function hideImageOnError() {
		if (imageRef.current) imageRef.current.style.visibility = 'hidden'
	}

	function refresh() {
		if (imageRef.current) imageRef.current.style.visibility = ''
	}
	
	return (
		<img
			className={`${className} ${classes.img}`}
			src={img}
			srcSet={img2x ? `${img2x} 2x` : ``}
			alt=''
			loading='lazy'
			onLoad={refresh}
			onError={hideImageOnError}
			ref={imageRef}
			{...props}
		/>
	)
}

export default Image