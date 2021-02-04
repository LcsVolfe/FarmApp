import React, {useState, useEffect} from 'react';
import {DataTable, IconButton} from 'react-native-paper';

const itemsPerPage = 2;




const DataTableComponent = ({navigation, data=[], columns=[], editPage, onDelete}) => {
    const [listdata, setListData] = useState(data);
    const [page, setPage] = useState(0);
    const [listColumns, setListColumns] = useState([]);
    const from = page * itemsPerPage;
    const to = (page + 1) * itemsPerPage;

    useEffect(()=>{
        let listCol = [];
        columns?.map(col => listCol.push(col.name));

        setListColumns(listCol);
        setListData(data);
    },[data])

    const onDeleteEvent = (i) => {
        let itemDeleted;
        let deletedList = listdata.filter((item,idx) =>  {
            if (idx != page*itemsPerPage+i)
                return item;
            else
                itemDeleted = item
        })
        setListData(deletedList);
        if(onDelete)
            onDelete(deletedList, itemDeleted);
    }

    return (
        <DataTable>
            <DataTable.Header>
                {columns.map(column => (
                    <DataTable.Title>{column.label}</DataTable.Title>
                ))}
                {editPage && <DataTable.Title>Editar</DataTable.Title>}
                {onDelete && <DataTable.Title>Deletar</DataTable.Title>}
            </DataTable.Header>

            {listdata.slice(from, to).map((row,i) => (
                <DataTable.Row key={i}>
                    {Object.entries(row).map(([key, value]) => listColumns.includes(key)? (
                        <DataTable.Cell>{value}</DataTable.Cell>
                        // <DataTable.Cell numeric>{col}</DataTable.Cell>
                    ):null)}
                    {editPage && <DataTable.Cell>
                        <IconButton
                            icon={'file-edit'}
                            color={'#000'}
                            size={20}
                            onPress={() => navigation.navigate(editPage, row)}
                            // onPress={() => console.log('Pressed')}
                        />
                    </DataTable.Cell>}
                    {onDelete && <DataTable.Cell>
                        <IconButton
                            icon={'pen'}
                            color={'#000'}
                            size={20}
                            onPress={() => onDeleteEvent(i)}
                            // onPress={() => console.log('Pressed')}
                        />
                    </DataTable.Cell>}
                </DataTable.Row>
            ))}

            <DataTable.Pagination
                page={page}
                numberOfPages={Math.ceil(listdata.length / itemsPerPage)}
                onPageChange={page => setPage(page)}
                label={`${from + 1}-${to} of ${listdata.length}`}
            />
        </DataTable>
    );
}

export default DataTableComponent;
