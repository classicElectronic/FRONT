import React, { useState } from 'react'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import ShowPaymentInfo from '../cards/ShowPaymentInfo'
import Pagination from './Pagination'

const OrderPagination = ({ orders, handleStatusChange, keyword }) => {

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

    const showOrderInTable = (order) =>
        <div className='table-responsive p-3'>
            <table className="table table-bordered">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Price</th>
                        {/* <th scope="col">Brand</th> */}
                        <th scope="col">Color</th>
                        <th scope="col">Count</th>
                        <th scope="col">Shipping</th>
                    </tr>
                </thead>
                <tbody>
                    {order.products.map((p, i) => (
                        <tr key={i}>
                            <td> <b>{p.product.title}</b> </td>
                            <td>{p.product.price.toLocaleString('de-DE', { style: 'currency', currency: 'BIF' })}</td>
                            {/* <td>{p.product.brand}</td> */}
                            <td>{p.color}</td>
                            <td>{p.count}</td>
                            <td>{p.product.shipping === "Yes" ?
                                <CheckCircleOutlined style={{ color: 'green' }} />
                                :
                                <CloseCircleOutlined style={{ color: 'red' }} />}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    return (
        <>
            {currentOrder.filter(searched(keyword)).map((order, i) => (
                <div className="row pb-5" key={i}>


                    <div className="btn btn-block bg-light">
                        <div className='row p-2' >
                            <ShowPaymentInfo order={order} showStatus={false} />
                        </div>

                        <div className="row">
                            <div className="col-md-4">
                                Delivery Status
                            </div>
                            <div className="col-md-8">
                                <select
                                    className="form-control"
                                    defaultValue={order.orderStatus}
                                    name='status'
                                    onChange={e => handleStatusChange(order._id, e.target.value)}>
                                    <option value="Not Processed">Not Processed</option>
                                    <option value="Cash on Delivery">Cash on Delivery</option>
                                    <option value="Processing">Processing</option>
                                    <option value="Dispatched">Dispatched</option>
                                    <option value="Cancelled">Cancelled</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    {showOrderInTable(order)}
                </div>
            ))}
            <div className='container'>
                <Pagination productPerPage={orderPerPage}
                    totalProduct={orders.length}
                    paginate={paginate}
                    currentPage={currentPage} />
            </div>
        </>
    )
}

export default OrderPagination
