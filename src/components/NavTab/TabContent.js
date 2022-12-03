const TabContent = (props) => {
    const classes = `${props.active ? '' : 'hidden'} p-4 bg-white border rounded-2xl flex flex-col gap-12`
    return (
        <div
            className={classes}
            id={props.id}
            role="tabpanel"
            aria-labelledby={`${props.id}-tab`}
        >
            {props.children}
        </div>
    )
}
export default TabContent;