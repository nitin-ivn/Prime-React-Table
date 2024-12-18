import { useEffect, useRef, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Paginator,PaginatorPageChangeEvent } from 'primereact/paginator'
import { useDispatch, useSelector } from 'react-redux'
import './tablepage.css'
import { fetchTable } from '../../store/features/tableSlice'
import { AppDispatch } from '../../store/store'
import { StoreType } from '../../store/store'
import { OverlayPanel } from 'primereact/overlaypanel'


type RowData = {
    id: number;
    title: string;
    place_of_origin: string;
    artist_display: string;
    date_start: string;
    date_end: string;
};

function TablePage() {
    const op = useRef<OverlayPanel | null>(null);
    const inp = useRef<HTMLInputElement | null>(null);
    const [numberRows, setNumberRows] = useState<number>(0);
    const dispatch = useDispatch<AppDispatch>();
    const [first, setFirst] = useState<number>(1);
    const [selectedRows, setSelectedRows] = useState<Object[]>();
    const { table, isLoading, total_pages } = useSelector((state: StoreType) => state.table);

    const pages:number = total_pages ? total_pages : 10528;

    const onPageChange = (event: PaginatorPageChangeEvent) => {
        const num: number = event.page + 1;
        setFirst(event.first);
        dispatch(fetchTable(num))
    };

    useEffect(() => {
        if(numberRows > 0 && !isLoading ){
            selectRowsInPage(numberRows);
        }
    },[isLoading,table]);

    const handleNumberRowChange = () => {
        const change: number = Number(inp.current?.value);
        setNumberRows(change);
        selectRowsInPage(change);
    }

    const selectRowsInPage = (rows: number) => {
        let selectedTempRows: Object[] = [];
        let tempRow = rows;
        let tempTable = table;
        let totalSelected = selectedRows ? selectedRows.length : 0;

        for(let i = 0;i<tempTable.length && totalSelected < rows; i++){
            if(!selectedTempRows.includes(tempTable[i]) && !selectedRows?.includes(tempTable[i])){
                selectedTempRows.push(tempTable[i]);
                totalSelected++;
                tempRow--;
            }
        }
        
        setSelectedRows(prev => {
            const updatedSelectedRows = prev ? [...prev] : [];
            return [...updatedSelectedRows, ...selectedTempRows];
        });
    }

    useEffect(() => {
        dispatch(fetchTable(1));
    },[dispatch]);

    const handleSelection = (e: { value: RowData[] }) => {
        setSelectedRows(e.value);
    }

  return (
    <div className='page'>
        <div className="card">
            <DataTable value={table} className='table' loading={isLoading} selectionMode={'checkbox'} selection={selectedRows} onSelectionChange={handleSelection} dataKey="">
            <Column
                selectionMode="multiple"
                header={
                    <img className='overlay' onClick={(e) => op.current?.toggle(e)} src="/chevron-down.svg"/>
                }
                headerStyle={{ position: 'relative'}}
            ></Column>
                <Column field="title" header="Title"></Column>
                <Column field="place_of_origin" header="Place Of Origin"></Column>
                <Column field="artist_display" header="Artist Display"></Column>
                <Column field="date_start" header="Date Start"></Column>
                <Column field="date_end" header="Date End"></Column>
            </DataTable>

            
        </div>

        <OverlayPanel ref={op}>
            <div>
                <input className='rows-select' ref={inp} placeholder='Select rows...' type="number" name="" id="" />
                <div onClick={() => handleNumberRowChange()} className='sub-con'><button className='submit'>Submit</button></div>
            </div>
        </OverlayPanel>

        <div className=''>
            <Paginator first={first} rows={12} totalRecords={pages} onPageChange={onPageChange}/>
        </div>
    </div>
  )
}

export default TablePage