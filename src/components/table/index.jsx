import Table from 'react-bootstrap/Table';

export const TodoTable = ({
    rows = []
}) => {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Todo</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                </tr>
            </thead>
            <tbody>
                {rows.map((row,key)=>{
                    return <tr key={key}>
                        <td>{key +1}</td>
                        <td>{row.todo}</td>
                        <td>{new Date(row.createdAt).toString()}</td>
                        <td>{new Date(row.updatedAt).toString()}</td>
                    </tr>
                })}
            </tbody>
        </Table>
    );
}