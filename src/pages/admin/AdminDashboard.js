import React, { useState, useEffect } from 'react';
import AdminNav from '../../components/nav/AdminNav'
import { getOrders, changeStatus } from '../../functions/admin';
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Orders from '../../components/order/Orders'
import { LoadingOutlined } from '@ant-design/icons'
import Footer from '../../components/footer/footer';
import OrderPagination from '../../components/pagination/OrderPagination';
import LocalSearch from '../../components/forms/LocalSearch';

const AdminDashboard = () => {

    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [keyword, setKeyword] = useState('')

    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadOrders();
    }, [])

    const loadOrders = () => getOrders(user.token).then(res => {
        // console.log(JSON.stringify(res.data, null, 4));
        setLoading(false)
        setOrders(res.data)
    });

    const handleStatusChange = (orderId, orderStatus) => {
        changeStatus(orderId, orderStatus, user.token).then((res) => {
            toast.success("Status changed")
            loadOrders();
        })
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row">

                    <div className="col-md-3 mobileHidden">
                        <AdminNav />
                    </div>

                    <div className="col-md-9 text-center">
                        {loading ? (
                            <h4 className='text-danger'>
                                <LoadingOutlined />
                            </h4>
                        ) : (
                            <>
                                <h4>Admin dashboard Page</h4>
                                {/* {JSON.stringify(orders)} */}
                                <hr />
                                <LocalSearch
                                    placeholder='filter order by ID'
                                    keyword={keyword}
                                    setKeyword={setKeyword}
                                />
                                {/* <Orders orders={orders} handleStatusChange={handleStatusChange} /> */}
                                <OrderPagination keyword={keyword}
                                    orders={orders} handleStatusChange={handleStatusChange} />
                            </>
                        )}
                    </div>
                </div>
            </div>
            {/* footer */}
            <hr />
            <Footer />
        </>
    );
}

export default AdminDashboard;
