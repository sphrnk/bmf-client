import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import {Link, useNavigate} from "react-router-dom";
import {Button} from "@mui/material";
import {useGetFilesQuery} from "../../store/file/fileActions";

const FileItem = ({fileId}) => {
    const {file} = useGetFilesQuery({path: '/'},
        {
            selectFromResult: ({data}) => ({
                file: data?.entities[fileId]
            })
        }
    )
    console.log(file)
    const navigate = useNavigate();
    const handleEdit = () => navigate(`/files/${fileId}/update`)
    return (
        <TableRow
            // key={row.name}
            sx={{'&:last-child td, &:last-child th': {border: 0}}}
        >
            {/*<TableCell component="th" scope="row">{file.id}</TableCell>*/}
            <TableCell>
                {/*<Link className={'underline text-primary'}*/}
                {/*      to={`/files/${fileId}`}>*/}
                {file.name}
                {/*</Link>*/}
            </TableCell>
            <TableCell>{file.mtime}</TableCell>
            <TableCell>{file.type === 1 ? 'Folder' : file.extension}</TableCell>
            <TableCell><Button onClick={handleEdit} type={'button'}>Edit</Button></TableCell>
        </TableRow>
    );
}

export default FileItem;