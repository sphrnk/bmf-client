const Notif = (props) => {
    const classes = `${props.status === "success" ? 'bg-green-200 ' : 'bg-red-200 '}text-center py-2 rounded`
    console.log(props);
    return (
        <div className={classes}>
            {props.text ? props.text : 'Account Created Successfully!'}
        </div>
    );
}

export default Notif;
