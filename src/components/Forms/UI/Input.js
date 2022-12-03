import React from 'react'

const Input = React.forwardRef((props, ref) => {
    return (
        <div className="flex flex-col gap-3">
            <label htmlFor={props.input.id} className=" text-primary">
                {props.label}
            </label>
            <input ref={ref} {...props.input} required={!!props.required}/>
            {/*<small className="text-red-600">*some error*</small>*/}
        </div>
    )
})
export default Input