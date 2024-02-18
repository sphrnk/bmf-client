import React from 'react';
import {useNavigate, Link, useLocation} from 'react-router-dom';
import {Icon} from "@mui/material";
import {useGetFilesQuery} from "../../../store/file/fileActions";
import {useDispatch, useSelector} from "react-redux";
import {portalActions} from "../../../store/file/portal-slice";

function RenameAction() {
    const {selectedRows: selected} = useSelector((state) => state.portal)
    const dispatch = useDispatch();
    const cantMove = selected.length !== 1
    const handleRenameAction = () => {
        if (cantMove) return

        dispatch(portalActions.showRenameAction())
        // open the move modal
    };

    return (
        <Icon onClick={handleRenameAction} color={"primary"}
              baseClassName="far"
              className={cantMove ? "fa-pen-to-square cursor-not-allowed opacity-50" : 'fa-pen-to-square cursor-pointer'}/>
    );
}

export default RenameAction;
