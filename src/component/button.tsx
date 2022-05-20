import React from 'react';

interface IButtonProps {
	className?: string;
	actionText: string;
	canClick: boolean;
	onClick?: Function;
	type?: "button" | "submit" | "reset" | undefined;
}

export const Button: React.FC<IButtonProps> = ({ type = 'button', className = '', actionText, canClick, onClick }) => {
	return (
		<button
			type={type}
			className={`py-2 md:py-3 text-white ${className} 
				${canClick
					? 'bg-lime-500 hover:bg-lime-600 active:bg-lime-500'
					: 'bg-gray-300 pointer-events-none'
				}`
			}
			onClick={() => onClick && onClick()}
		>{actionText}</button>
	);
}