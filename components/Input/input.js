import React, { useState } from "react"

const Input = ({value, label, size, onChange}) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className="relative m-[4px]">
      <input
        type="text"
        value={value}
        id="label"
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
            if(value === "") setIsFocused(false)
        }}
        className={`h-10 p-3 text-[#DD9F00] bg-transparent border-2 rounded-lg outline-none w-[${size}px] border-[#DD9F00]`}
      />
      <label
        htmlFor="label"
        className={`absolute px-1 py-0 mx-2 font-mono text-sm font-semibold text-[#DD9F00] left-1 top-2 transition-transform duration-200 ${isFocused ? "transform scale-75 -translate-x-1 -translate-y-4 bg-[#1F1D1B]" : ""}`}
      >
        {label}
      </label>
    </div>
  )
}

export default Input

