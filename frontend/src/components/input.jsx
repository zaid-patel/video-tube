import React, { useId } from 'react';

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref) {
    const id = useId();
    return (
        <div className='w-full'>
            {label && (
                <label 
                    className='inline-block mb-1 pl-1 text-gold-600' // Change label color to golden
                    htmlFor={id}
                >
                    {label}
                </label>
            )}
            <input
                type={type}
                className={`px-3 py-2 rounded-lg bg-gray-800 text-white outline-none focus:bg-gray-700 duration-200 border border-gray-600 w-full ${className}`} // Updated styles for dark theme
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    );
});

export default Input;