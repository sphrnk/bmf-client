const Tab = (props) => {
    const classes = `${props.active ? 'text-primary bg-neutral-200 border-primary ' : 'border-transparent hover:text-gray-600 hover:border-gray-300 '} items-center font-bold inline-flex p-4 gap-2 border-b-2 rounded-t-lg group`
    const sendIdHandler = (el) => {
        props.onClick(el.target.id);
    }
    return (
        <li className="">
            <button id={props.id} onClick={sendIdHandler}
                    aria-current={props.active ? "page" : ''}
                    className={classes}>
                <i id={props.id} className={`fa-duotone fa-${props.icon}`}></i>
                {props.text}
            </button>
        </li>
    )
}
export default Tab;