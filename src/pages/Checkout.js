import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUserCart, emptyUserCart, saveUserAddress, applyCoupon } from '../functions/user';
import { toast } from 'react-toastify'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { createCashOrderForUser } from '../functions/user';
import { Button } from 'antd'
import Footer from '../components/footer/footer';


const Checkout = ({ history }) => {

    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [address, setAddress] = useState('');
    const [addressSaved, setAddressSaved] = useState(false);
    const [coupon, setCoupon] = useState('');
    // discoount price
    const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
    const [discountError, setDiscountError] = useState('');


    const dispatch = useDispatch();
    const { user, COD } = useSelector((state) => ({ ...state }));
    const couponTrueOrFalse = useSelector((state) => state.coupon);


    useEffect(() => {
        getUserCart(user.token)
            .then(res => {
                // console.log('user cart res', JSON.stringify(res.data, null, 4));
                setProducts(res.data.products);
                setTotal(res.data.cartTotal);
            })
            .catch(err => console.log('err', err));
    }, [])

    const saveAddresToDb = () => {
        // console.log(address);
        saveUserAddress(user.token, address)
            .then(res => {
                if (res.data.ok) {
                    setAddressSaved(true);
                    toast.success("Address Save")
                }
            })
    };

    const emptyCart = () => {
        // remove from localstorage
        if (typeof window !== undefined) {
            localStorage.removeItem('cart');
        }
        // remove from redux
        dispatch({
            type: "ADD_TO_CART",
            payload: [],
        });
        // remove from backend
        emptyUserCart(user.token)
            .then(res => {
                setProducts([])
                setTotal(0)
                setTotalAfterDiscount(0)
                setCoupon('')
                toast.success('Cart is Empty. Continue Shopping');
            })
            .catch(err => console.log('err', err));
    };

    const applyDiscountCoupon = () => {
        console.log('send coupon to backend', coupon);
        // appply coupon
        applyCoupon(user.token, coupon)
            .then(res => {
                console.log('res on coupon applied', res.data);
                if (res.data) {
                    setTotalAfterDiscount(res.data);
                    //  update redux coupon applied true/false
                    dispatch({
                        type: "COUPON_APPLIED",
                        payload: true,
                    });
                }
                if (res.data.err) {
                    setDiscountError(res.data.err);
                    // update redux coupon applied
                    dispatch({
                        type: "COUPON_APPLIED",
                        payload: false,
                    });
                }
            })
    }

    const showAddress = () => {
        return (
            <>
                <ReactQuill
                    theme="snow"
                    value={address}
                    onChange={setAddress}
                />
                <Button type='primary' className=" mt-2"
                    onClick={saveAddresToDb}>
                    Save address
                </Button>
                <hr />
            </>
        )
    }

    const showProductSummary = () => (
        <>
            {
                products.map((p, i) => (
                    <div key={i}>
                        <p>{p.product.title} ({p.color}) x{" "}
                            {p.count} ={" "}
                            {(p.product.price * p.count).toLocaleString('de-DE', { style: 'currency', currency: 'BIF' })}
                        </p>
                    </div>
                ))
            }
        </>
    );

    const showApplyCoupon = () => (
        <>
            <input type="text"
                onChange={(e) => {
                    setDiscountError('')
                    setCoupon(e.target.value)
                }}
                className="form-control"
                value={coupon}
                placeholder="Enter coupon"
            />

            <Button type='primary'
                className="mt-2"
                onClick={applyDiscountCoupon}
            >Apply coupon</Button>

            <hr />
        </>
    );

    const createCashOrder = () => {
        createCashOrderForUser(user.token, COD, couponTrueOrFalse)
            .then(res => {
                // console.log("useser cash order created", res);
                // empty cart fro redux,loacalStoraje, rest COD, 
                if (res.data.ok) {
                    // empty local storage
                    if (typeof window !== undefined) localStorage.removeItem('cart')
                    // empty redux cat
                    dispatch({
                        type: 'ADD_TO_CART',
                        payload: [],
                    });
                    // empty redux coupon
                    dispatch({
                        type: 'COUPON_APPLIED',
                        payload: false,
                    });
                    // empty redux COD
                    dispatch({
                        type: 'COD',
                        payload: [],
                    });
                    // empty cart from backend
                    emptyUserCart(user.token);
                    // redirect
                    setTimeout(() => {
                        history.push('/user/history')
                    }, 1000)
                }
            });
    };

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        <h4>Delivery address</h4>
                        <br />
                        <br />
                        {showAddress()}
                        <hr />
                        <h4>Got coupon ?</h4>
                        <br />
                        {showApplyCoupon()}
                        <br />
                        {
                            discountError &&
                            <p className="bg-danger p-2">
                                {discountError}
                            </p>
                        }
                    </div>

                    <div className="col-md-6">
                        <h4>Order Summary</h4>
                        <hr />
                        <p>Products {products.length}</p>
                        <hr />
                        {showProductSummary()}
                        <hr />
                        <p>Cart total : {total.toLocaleString('de-DE', { style: 'currency', currency: 'BIF' })}</p>
                        {
                            totalAfterDiscount > 0 &&
                            (

                                <p className="bg-success p-2">
                                    Discount Applied: Total Payable{" "}
                                    {parseInt(totalAfterDiscount).toLocaleString('ja-JP', { style: 'currency', currency: 'BIF' })}
                                </p>
                            )
                        }
                        <div className='container-fluid mb-4'>
                            <div className="row">
                                <div className="col-md col">
                                    {COD ?
                                        (
                                            <Button className='m-2'
                                                onClick={createCashOrder}
                                                disabled={!addressSaved}
                                                type="primary">Place order</Button>
                                        ) : (
                                            <Button className='m-2'
                                                onClick={() => history.push('/payment')}
                                                disabled={!addressSaved}
                                                type="primary">Place order</Button>
                                        )}
                                </div>
                                <div className="col-md col">
                                    <Button className='m-2'
                                        disabled={!products.length}
                                        onClick={emptyCart}
                                        type="primary" danger>Empty order</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* footer */}
            <hr />
            <Footer />
        </>
    )
}

export default Checkout
