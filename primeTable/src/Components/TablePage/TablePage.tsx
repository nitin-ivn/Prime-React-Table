import React, { useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Paginator,PaginatorPageChangeEvent } from 'primereact/paginator'
import './tablepage.css'

function TablePage() {
    const [first, setFirst] = useState<number>(0);

    const onPageChange = (event: PaginatorPageChangeEvent) => {
        setFirst(event.first);
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