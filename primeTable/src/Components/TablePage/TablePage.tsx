import React, { useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Paginator,PaginatorPageChangeEvent } from 'primereact/paginator'
import { useDispatch, useSelector } from 'react-redux'
import './tablepage.css'
import { fetchTable } from '../../store/features/tableSlice'
import { AppDispatch } from '../../store/store'

function TablePage() {
    const dispatch = useDispatch<AppDispatch>();
    const [first, setFirst] = useState<number>(1);



    const onPageChange = (event: PaginatorPageChangeEvent) => {
        const num = event.page + 1;
        setFirst(event.first);
        dispatch(fetchTable(num));
    };

  return (
    <div className='page'>
        <div className="card">
            <DataTable className='table'>
                <Column field="title" header="Title"></Column>
                <Column field="place_of_origin" header="Place Of Origin"></Column>
                <Column field="artist_display" header="Artist Display"></Column>
                <Column field="date_start" header="Date Start"></Column>
                <Column field="date_end" header="Date End"></Column>
            </DataTable>
        </div>

        <div className=''>
            <Paginator first={first} rows={12} totalRecords={120} onPageChange={onPageChange}/>
        </div>
    </div>
  )
}

export default TablePage