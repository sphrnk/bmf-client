import React from 'react';
import {useNavigate, Link, useLocation} from 'react-router-dom';
import {Icon} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {portalActions} from "../../../store/file/portal-slice";

function MoveAction() {
    const {selectedRows: selected} = useSelector((state) => state.portal)
    const dispatch = useDispatch();
    const cantMove = selected.length === 0
    console.log(selected);
    // Function to navigate home
    const handleMove = () => {
        if (cantMove) return

        dispatch(portalActions.showMoveFileAction())
        // open the move modal
    };

    return (
        <Icon onClick={handleMove}
              color={"primary"}
              baseClassName="far"
              className={cantMove ? "fa-up-down-left-right cursor-not-allowed opacity-50" : "fa-up-down-left-right cursor-pointer"}/>
    );
}

export default MoveAction;
