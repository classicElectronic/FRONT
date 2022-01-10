import React, { useState } from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer';
import Invoice from '../order/Invoice'
import ShowPaymentInfo from '../cards/ShowPaymentInfo';
import Pagination from './Pagination';

const HistoryPagination = ({ orders, showOrderInTable, keyword }) => {

    const [currentPage, setCurrentPage] = useState(1)
    const [orderPerPage, setOrderPerPage] = useState(10)

    // get current products
    const indexOfLastProduct = currentPage * orderPerPage
    const indexOfFirstProduct = indexOfLastProduct - orderPerPage
    const currentOrder = orders.slice(indexOfFirstProduct, indexOfLastProduct)

    // change page
    const paginate = pageNumber => {
        setCurrentPage(pageNumber)
    }

    const searched = (keyword) => (c) => c.paymentIntent.id.toLowerCase().includes(keyword);

    const showDownloadLink = (order) => (
        <PDFDownloadLink document={<Invoice order={order} />}
            fileName={`invoice-${order.paymentIntent.id}.pdf`}
            className="btn btb-sm btn-block btn-outline-primary"
        >
            Download PDF
        </PDFDownloadLink>
    )

    return (
        <>
            {
                currentOrder.filter(searched(keyword)).reverse().map((order, i) => (
                    <div key={i} className="mb-5 mt-2 p-3 card" >
                        <ShowPaymentInfo order={order} />
                        {showOrderInTable(order)}
                        <div className="row">
                            <div className="col">
                                {showDownloadLink(order)}
                            </div>
                        </div>
                    </div>
                ))
            }
            <div className='container'>
                <Pagination productPerPage={orderPerPage}
                    totalProduct={orders.length}
                    paginate={paginate}
                    currentPage={currentPage} />
            </div>
        </>
    )
}

export default HistoryPagination
