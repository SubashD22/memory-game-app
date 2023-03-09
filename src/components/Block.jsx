import React, { useEffect, useState } from 'react'

const Block = ({ color, handleChoice, open, disabled }) => {

    let blockColor = open ? color.src : 'gray';

    const handleClick = () => {
        handleChoice(color)
    }

    return (
        <button className='block' style={{ backgroundColor: `${blockColor}` }} onClick={handleClick} disabled={open || disabled}></button>
    )
}

export default Block