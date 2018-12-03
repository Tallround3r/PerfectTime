import React from 'react';

export function SliderPrevArrow(props) {
	const {className, style, onClick} = props;
	return (
		<div
			className={className}
			style={{...style, backgroundColor: 'grey'}}
			onClick={onClick}
		/>
	);
}

export function SliderNextArrow(props) {
	const {className, style, onClick} = props;
	return (
		<div
			className={className}
			style={{...style, backgroundColor: 'grey'}}
			onClick={onClick}
		/>
	);
}
