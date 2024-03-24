import React from 'react'

const Option = ({ options, selectedOption, onOptionChange}) => {
    return (
        <div className='options'>
            {options.map((option, index))}
        </div>
    )

}
