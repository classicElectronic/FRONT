import React, { useState, useEffect } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useSelector, useDispatch } from 'react-redux'
import { createPaymentIntent } from '../functions/stripe'
import { Link } from 'react-router-dom'
import { Card } from 'antd'
import { DollarOutlined, CheckOutlined } from '@ant-design/icons'
import DefaultLaptop from '../images/default.png'
import { createOrder, emptyUserCart } from '../functions/user'

const StripeCheckout = ({ history }) => {
    const dispatch = useDispatch();
    const { user, coupon } = useSelector((state) => ({ ...state }));

    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState("");
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState("");

    const [cartTotal, setCartTotal] = useState(0)
    const [totalAfterDiscount, setTotalAfterDiscount] = useState(0)
    const [payble, setPayble] = useState(0)

    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        createPaymentIntent(user.token, coupon).then((res) => {
            console.log("create payment intent", res.data);
            setClientSecret(res.data.clientSecret);
            // additional response recieved on successful payment
            setCartTotal(res.data.cartTotal);
            setTotalAfterDiscount(res.data.totalAfterDiscount);
            setPayble(res.data.payable);
        })
            .catch(err => console.log(err));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true)

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: e.target.name.value,
                },
            },
        });

        if (payload.error) {
            setError(`Payment Failed ${payload.error.message}`);
            setProcessing(false);

        } else {
            // here you getresult after successfull payment
            // create order and save in database for admin to process
            createOrder(payload, user.token)
                .then((res) => {
                    if (res.data.ok) {
                        // empty card from localStorage
                        if (typeof window !== undefined) localStorage.removeItem('cart')
                        // empty from redux
                        dispatch({
                            type: "ADD_TO_CART",
                            payload: [],
                        });
                        // reset coupon to false
                        dispatch({
                            type: "COUPON_APPLIED",
                            payload: false,
                        });
                        // empty cart from database
                        emptyUserCart(user.token);
                    }
                })
            // empty user cart from redux store and local storage
            // console.log(JSON.stringify(payload, null, 4));
            setError(null);
            setProcessing(false);
            setSucceeded(true);
        }
    }
    const handleChange = async (e) => {
        // listen for changes in the cart element
        // and display any errors as the customer type their card details
        setDisabled(e.empty);// disable button if errors
        setError(e.error ? e.error.message : '') // show error message
    };

    const cartStyle = {
        style: {
            base: {
                color: "#32325d",
                fontFamily: "Arial, sans-serif",
                fontSmoothing: "antialiased",
                fontSize: "14px",
                "::placeholder": {
                    color: "#32325d",
                },
            },
            invalid: {
                color: "#fa755a",
                iconColor: "#fa755a",
            },
        },
    };

    return (
        <>
            {
                !succeeded && <div>
                    {coupon && totalAfterDiscount !== undefined ? (
                        <p className="alert alert-success" >
                            {`Total after discount ${totalAfterDiscount
                                .toLocaleString('ja-JP', { style: 'currency', currency: 'BIF' })}`}
                        </p>
                    ) : (
                        <p className="alert alert-danger">No Coupon Applied</p>
                    )}
                </div>
            }
            <div className="text-center pb-2">
                <Card
                    cover={
                        <img src={DefaultLaptop}
                            style={{
                                height: "100px",
                                objectFit: 'cover',
                                marginBottom: '-50px'
                            }}
                            alt="pic"
                        />
                    }
                    actions={[
                        <>
                            <DollarOutlined className="text-info" />
                            <br />
                            Total : {cartTotal.toLocaleString('ja-JP', { style: 'currency', currency: 'BIF' })}
                        </>,
                        <>
                            <CheckOutlined className="text-info" />
                            <br />
                            Total payable : ${(payble / 100).toFixed(0)}
                        </>,
                    ]}
                />
            </div>

            <form id="payement-form" className="stripe-form"
                onSubmit={handleSubmit}>
                <CardElement id="card-element"
                    options={cartStyle}
                    onChange={handleChange}
                />

                <button
                    className="stripe-button"
                    disabled={processing || disabled || succeeded}
                >
                    <span id="button-text">
                        {processing ? (
                            <div className="spinner" id="spinner"></div>
                        ) : (
                            "PAY"
                        )}
                    </span>
                </button>
                <br />
                {
                    error && (
                        <div className="card-error" role="alert">
                            {error}
                        </div>
                    )
                }

                <br />

                <p className={succeeded ? 'result-message' : 'result-message hidden'}>
                    Payment Successfull. <Link to='/user/history'>See it in your purchase history</Link>
                </p>

            </form>

        </>
    )
}

export default StripeCheckout;