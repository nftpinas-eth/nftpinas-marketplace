import React from "react"
import { Button } from 'react-bootstrap'

const ButtonComponents = ({ label, shape, size, height, width, onClick }) => {
    let className = "flex items-center justify-center font-mono font-semibold text-[#1F1D1B] cursor-pointer bg-[#DD9F00] hover:bg-[#DD9F00]/80 m-[2px]"
    if (shape === "square") className += ` w-[${width}px] h-[${height}px] rounded-lg`
    if (shape === "round") className += ` w-[${size}px] h-[${size}px] rounded-full`

    return (
        <Button onClick={onClick} className={className}>
            {label}
        </Button>
    )
}

export default ButtonComponents;
