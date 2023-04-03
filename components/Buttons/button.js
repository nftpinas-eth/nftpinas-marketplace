import React from "react"
import { Button } from 'react-bootstrap'

const ButtonComponents = ({ label, shape, size, height, width, onClick }) => {
    let className = "flex items-center justify-center font-mono font-semibold text-[#1F1D1B] cursor-pointer bg-[#DD9F00] hover:bg-[#DD9F00]/80 m-[2px]"
    let buttonProps = {
      variant: 'warning',
      onClick: onClick
    }

    if (shape === "square") {
      buttonProps.className = className
      buttonProps.style = {
        width: `${width}px`,
        height: `${height}px`,
        borderRadius: '8px'
      }
    }

    if (shape === "round") {
      buttonProps.className = className
      buttonProps.style = {
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%'
      }
    }

    return (
        <Button {...buttonProps}>
            {label}
        </Button>
    )
}

export default ButtonComponents;