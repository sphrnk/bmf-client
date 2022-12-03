const InfoItem = (props) => {

    return (
        <div
            className="flex justify-between">
            <div className="flex flex-col gap-1">
                <h6 className={""}>{props.title}:</h6>
                <span className={props.editable ? "font-bold" : 'text-gray-400'}>
                    {props.text.length === 0 ? 'null' : props.text}
                </span>
            </div>
            {props.editable ?
                <div className="text-opacity-70 text-primary flex items-baseline justify-center gap-x-2">
                    <i className="fa-regular fa-pen-to-square"></i>
                    <span>Edit</span>
                </div> :
                ''
            }

        </div>
    )
}
export default InfoItem;