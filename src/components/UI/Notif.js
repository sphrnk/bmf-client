const Notif = (props) => {
    const classes = props.status === "success" ? `bg-green-200 text-center py-2 rounded` :
        props.status === "fail" ? `bg-red-200 text-center py-2 rounded` : 'text-center py-2 rounded'
    console.log(props);
    return (
        <div className={classes}>
            {props.text}
        </div>
    );
}

export default Notif;
