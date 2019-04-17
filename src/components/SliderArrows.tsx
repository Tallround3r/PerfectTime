import React from 'react';

interface Props {
	className?: any;
	style?: any;
	onClick?: any;
}

export function SliderPrevArrow(props: Props) {
	const {className, style, onClick} = props;
	return (
		<div
			className={className}
			style={{...style, backgroundColor: 'grey'}}
			onClick={onClick}
		/>
	);
}

export function SliderNextArrow(props: Props) {
	const {className, style, onClick} = props;
	return (
		<div
			className={className}
			style={{...style, backgroundColor: 'grey'}}
			onClick={onClick}
		/>
	);
}
