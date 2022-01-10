import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify'
import DatePicker from 'react-datepicker'
import { getCoupons, removeCoupon, createCoupon } from '../../../functions/coupon';
import 'react-datepicker/dist/react-datepicker.css';
import { DeleteOutlined } from '@ant-design/icons'
import AdminNav from '../../../components/nav/AdminNav';
import Footer from '../../../components/footer/footer';


const CreateCouponPage = () => {

    const [name, setName] = useState('');
    const [expiry, setExpiry] = useState('');
    const [discount, setDiscount] = useState('');
    const [loading, setLoading] = useState(false);
    const [coupons, setCoupns] = useState([]);

    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadAllCoupons();
    }, [])

    const loadAllCoupons = () => getCoupons().then((res) => setCoupns(res.data));

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(name, expiry, discount);
        createCoupon(
            { name, expiry, discount },
            user.token
        ).then((res) => {
            setLoading(false);
            setName('');
            setDiscount('');
            setExpiry('');
            loadAllCoupons();
            toast.success(`"${res.data.name}" is created`)
        }).catch(err => {
            if (err.response.status === 400) {
                setLoading(false);
                toast.error(err.response.data);
                return;
            };
            console.log('create coupon error', err)
        });
    };

    const handleRemove = couponId => {
        if (window.confirm('Delete ?')) {
            setLoading(true)
            removeCoupon(couponId, user.token)
                .then(res => {
                    loadAllCoupons();
                    setLoading(false)
                    toast.error(`Coupon "${res.data.name}" deleted`)
                }
                ).catch(err => {
                    if (err.response.status === 400) {
                        setLoading(false);
                        toast.error(err.response.data);
                        return;
                    };
                    console.log('delete coupon error', err)
                });
        }
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 mobileHidden">
                        <AdminNav />
                    </div>

                    <div className="col-md-9">
                        {
                            loading ?
                                (
                                    <h4 className="text-danger">Loading....</h4>
                                ) :
                                (
                                    <h4>Coupons</h4>
                                )
                        }

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="text-muted"> Name</label>
                                <input
                                    type="text" className="form-control"
                                    onChange={(e) => { setName(e.target.value) }}
                                    autoFocus
                                    required
                                    value={name}
                                />
                            </div>

                            <div className="form-group">
                                <label className="text-muted">Discount %</label>
                                <input
                                    type="text" className="form-control"
                                    onChange={(e) => { setDiscount(e.target.value) }}
                                    autoFocus
                                    required
                                    value={discount}
                                />
                            </div>

                            <div className="form-group">
                                <label className="text-muted">Expiry</label>
                                <DatePicker className="form-control"
                                    selected={new Date()}
                                    value={expiry}
                                    onChange={(date) => setExpiry(date)}
                                    required
                                />
                            </div>

                            <button className="btn btn-outline-primary" >Save</button>
                        </form>
                        <br />

                        <h4>{coupons.length} Coupons</h4>
                        <table className="table table-bordered">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Expiry</th>
                                    <th scope="col">Discount</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    coupons.map((c) => (
                                        <tr key={c._id}>
                                            <td>{c.name}</td>
                                            <td>{new Date(c.expiry).toLocaleDateString()}</td>
                                            <td>{c.discount}%</td>
                                            <td><DeleteOutlined
                                                onClick={() => handleRemove(c._id)}
                                                className="text-danger pointer" /></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/* footer */}
            <hr />
            <Footer />
        </>
    )
}

export default CreateCouponPage
