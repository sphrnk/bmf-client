const DataTable = (props) => {
    const showMoreOptionsHandler = (el) => {
        console.log(el.target.id);
    }
    const cols = props.cols;
    const rows = props.rows;
    const itemDataEntries = rows.map((row) => Object.entries(row));
    const x = (data) => cols.map((col, i) => col.hasOwnProperty('renderCell') ?
        <td style={{width: col.width}} className={"p-5 border-r last:border-r-0"}
            key={i}>{col.renderCell(col)}</td> :
        <td style={{width: col.width}} className={"p-5 border-r last:border-r-0"}
            key={data}></td>)
    const data = itemDataEntries.map((rowEntries) => {
        console.log(rowEntries);
        return rowEntries.map((row, i) => console.log(row, i));
    })
    return (
        <>
            <div className="w-full flex max-h-80 overflow-auto rounded-lg  border">
                <table className={"overflow-hidden"}>
                    <thead className={"border-b"}>
                    <tr>
                        <th className={"p-0 w-6 border-l-0 border-r last:border-r-0"}>
                            <div
                                className={"group cursor-pointer h-16 items-center inline-flex justify-between p-5 sticky w-full top-0 bg-primary text-white"}>
                                <input type="checkbox"/>
                                <div
                                    className="flex opacity-0 items-center gap-6 group-hover:opacity-100 transition">
                                    <i className="fa-duotone fa-sort-up"></i>
                                    <i onClick={showMoreOptionsHandler}
                                       className="fa-regular fa-ellipsis-vertical"></i>
                                </div>
                            </div>
                        </th>
                        {props.cols.map((col, i) =>
                            <th style={{width: col.width}} className={"p-0 border-l-0 border-r last:border-r-0"}
                                key={i}>
                                <div
                                    className={"group cursor-pointer h-16 items-center inline-flex justify-between p-5 sticky w-full top-0 bg-primary text-white"}>
                                    {col.headerName}
                                    <div
                                        className="flex opacity-0 items-center gap-6 group-hover:opacity-100 transition">
                                        <i className="fa-duotone fa-sort-up"></i>
                                        <i id={i} onClick={showMoreOptionsHandler}
                                           className="fa-regular fa-ellipsis-vertical"></i>
                                    </div>
                                </div>
                            </th>
                        )}
                    </tr>
                    </thead>
                    <tbody>
                    {props.rows.map((row) =>
                        <tr className={"border-b last:border-b-0 odd:bg-white even:bg-gray-100 hover:bg-gray-50 cursor-pointer"}
                            key={row.id}>
                            <td><input type="checkbox"/></td>
                            {/*{data}*/}
                        </tr>
                    )}
                    {/*{itemDataEntries.map((rowEntries) => colsField.map((col) => rowEntries.filter((row) => console.log(row.includes(col) ? row[1] : ''))))}*/}

                    {/*    <tr onClick={() => {*/}
                    {/*        props.onChangePath(row.name);*/}
                    {/*    }} id={`row-${i}`} key={i}*/}
                    {/*        className={"border-b last:border-b-0 odd:bg-white even:bg-gray-100 hover:bg-gray-50 cursor-pointer"}>*/}
                    {/*        {row.map(((text, i) => <td key={i} className={"p-5"}>{text}</td>))}*/}
                    {/*        /!*<td className={"p-5"}>{row[1]}</td>*!/*/}
                    {/*        /!*<td className={"p-5"}>{row[2]}</td>*!/*/}
                    {/*        /!*<td className={"p-5"}>{row[3]}</td>*!/*/}
                    {/*    </tr>)}*/}
                    </tbody>
                </table>
            </div>
        </>);
}
export default DataTable;