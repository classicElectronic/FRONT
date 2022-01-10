import React, { useState, useEffect } from 'react';
import UserNav from '../../components/nav/UserNav';
import { getUserOrders } from '../../functions/user'
import { useSelector } from 'react-redux'
import { CheckCircleOutlined, CloseCircleOutlined, LoadingOutlined } from '@ant-design/icons'
// import ShowPaymentInfo from '../../components/cards/ShowPaymentInfo'
import { PDFDownloadLink } from '@react-pdf/renderer';
import Invoice from '../../components/order/Invoice'
import Footer from '../../components/footer/footer';
import HistoryPagination from '../../components/pagination/HistoryPagination';
import LocalSearch from '../../components/forms/LocalSearch';

const History = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [keyword, setKeyword] = useState('')

    const { user } = useSelector((state) => ({ ...state }))

    useEffect(() => {
        loadUserOrders();
    }, [])

    const loadUserOrders = () => getUserOrders(user.token).then(res => {
        // console.log(JSON.stringify(res.data, null, 4));
        setLoading(false);
        setOrders(res.data);
    });

    const showEachOrders = () =>
        <HistoryPagination orders={orders}
            showOrderInTable={showOrderInTable} keyword={keyword} />



    const showOrderInTable = (order) =>
        <div className='table-responsive'>
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
            <div className="container-fluid">
                <div className="row">

                    <div className="col-md-2 mobileHidden">
                        <UserNav />
                    </div>

                    <div className="col-md-10 text-center">
                        {loading ? (
                            <h4 className='text-danger'>
                                <LoadingOutlined />
                            </h4>
                        ) : (
                            <>
                                <h4>
                                    {orders.length > 0 ? "User purchase orders" : "No purchase orders"}
                                </h4>
                                <hr />
                                <LocalSearch
                                    placeholder='FILTER ORDER ID'
                                    keyword={keyword}
                                    setKeyword={setKeyword}
                                />

                                {showEachOrders()}
                            </>
                        )
                        }
                    </div>
                </div>
            </div>
            {/* footer */}
            <hr />
            <Footer />
        </>
    );
}

export default History;