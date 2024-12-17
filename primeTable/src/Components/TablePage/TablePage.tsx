import React, { useEffect, useRef, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Paginator,PaginatorPageChangeEvent } from 'primereact/paginator'
import { useDispatch, useSelector } from 'react-redux'
import './tablepage.css'
import { fetchTable } from '../../store/features/tableSlice'
import { AppDispatch } from '../../store/store'
import { StoreType } from '../../store/store'
import { OverlayPanel } from 'primereact/overlaypanel'

function TablePage() {
    const op = useRef(null);
    const inp = useRef(null);
    let pageChange: number = 0;
    const [numberRows, setNumberRows] = useState<number>(0);
    const dispatch = useDispatch<AppDispatch>();
    const [first, setFirst] = useState<number>(1);
    const [selectedRows, setSelectedRows] = useState<Object>();
    const { table, isLoading, total_pages } = useSelector((state: StoreType) => state.table);

    const pages:number = total_pages ? total_pages : 10528;

    const onPageChange = (event: PaginatorPageChangeEvent) => {
        const num: number = event.page + 1;
        setFirst(event.first);
        dispatch(fetchTable(num));

        

        if(numberRows > 0){
            selectRowsInPage(numberRows);
        }
    };

    const handleNumberRowChange = () => {
        const change = inp.current.value;
        pageChange = change;
        setNumberRows(change);
        selectRowsInPage(pageChange);
    }

    const selectRowsInPage = async (rows: number) => {
        let selected = 0;
        let tempRow = rows;
        let selectedTempRows: Object[] = [];
        let tempTable = table;
        console.log(table);

        while(selected < rows && selected < tempTable.length){
            selectedTempRows.push(tempTable[selected]);
            selected++;
            pageChange--;
            tempRow--;
        }

        setNumberRows(pageChange);

        setSelectedRows(selectedTempRows);
    }

    useEffect(() => {
        dispatch(fetchTable(1));
    },[dispatch]);

    const handleSelection = (e) => {
        setSelectedRows(e.value);
    }

  return (
    <div className='page'>
        <div className="card">
            <DataTable value={table} className='table' loading={isLoading} selectionMode={'checkbox'} selection={selectedRows} onSelectionChange={handleSelection} dataKey="">
            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                <Column field="title" header="Title"></Column>
                <Column field="place_of_origin" header="Place Of Origin"></Column>
                <Column field="artist_display" header="Artist Display"></Column>
                <Column field="date_start" header="Date Start"></Column>
                <Column field="date_end" header="Date End"></Column>
            </DataTable>

            <img onClick={(e) => op.current.toggle(e)} className='overlay' src="/chevron-down.svg" alt="" />
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