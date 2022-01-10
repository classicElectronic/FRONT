import React from 'react'

const ShowPaymentInfo = ({ order, showStatus = true }) => (
    <div className='table-responsive'>
        <table className='table table-bordered'>
            <thead className="thead-light">
                <tr>
                    <th scope="col">Order ID</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Currency</th>
                    <th scope="col">Method</th>
                    <th scope="col">Status</th>
                    <th scope="col">Ordered on </th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>{order.paymentIntent.id}</td>
                    <td>
                        {order.paymentIntent.currency === "BIF" ?
                            (
                                <>
                                    Amount: {(order.paymentIntent.amount).toLocaleString('de-DE',
                                        { style: 'currency', currency: "BIF" })}
                                </>
                            ) : (
                                <>
                                    Amount:{(order.paymentIntent.amount /= 100).toLocaleString('en-US',
                                        { style: 'currency', currency: "USD" })}
                                </>
                            )
                        }
                    </td>
                    <td> {order.paymentIntent.currency.toUpperCase()} </td>
                    <td>{order.paymentIntent.payment_method_types[0]}</td>
                    <td>{order.orderStatus.toUpperCase()}</td>
                    <td>{order.paymentIntent.currency === "BIF" ?
                        (
                            new Date(order.paymentIntent.created).toLocaleString()
                        ) : (
                            new Date(order.paymentIntent.created * 1000).toLocaleString()
                        )
                    }</td>
                </tr>
            </tbody>
        </table>
    </div>
)


export default ShowPaymentInfo
