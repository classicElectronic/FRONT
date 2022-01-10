import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import ProductCardInCheckout from '../components/cards/ProductCardInCheckout';
import { userCart } from '../functions/user';
import { Button } from 'antd';
import Footer from '../components/footer/footer';
import { toast } from 'react-toastify';

const Cart = ({ history }) => {
    const { cart, user } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();

    // console.log(cart);

    const getTotal = () => {
        return cart.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price
        }, 0)
    };

    const showCartItems = () => (
        <div className='table-responsive'>
            <table className="table table-bordered">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Title</th>
                        <th scope="col">Price</th>
                        <th scope="col">Category</th>
                        <th scope="col">Brand</th>
                        <th scope="col">Color</th>
                        <th scope="col">Count</th>
                        <th scope="col">Shipping</th>
                        <th scope="col">Remove</th>
                    </tr>
                </thead>


                {
                    cart.map((p) => (
                        <ProductCardInCheckout key={p._id}
                            p={p}
                        />
                    ))
                }
            </table>
        </div>
    )

    // const saveOrderToDb = () => {
    //     // console.log("cart", JSON.stringify(cart,null,4));
    //     userCart(cart, user.token)
    //         .then(res => {
    //             console.log('cart post res', res);
    //             if (res.data.ok) history.push('/checkout');
    //         }).catch(err => console.log('cart save error', err))

    // }

    const saveCashOrderToDb = () => {
        // console.log("cart", JSON.stringify(cart,null,4));

        // check the cart if the color value is an array then set it to the first value
        cart.map(order => {
            let check = order.color
            let isArray = Array.isArray(check)
            // console.log('is array', isArray);
            if (isArray) {
                let cart = [];
                if (typeof window !== undefined) {
                    if (localStorage.getItem('cart')) {
                        cart = JSON.parse(localStorage.getItem('cart'));
                    };

                    cart.map((product, i) => {
                        if (product._id === order._id) {
                            cart[i].color = order.color[0];
                            // console.log(product._id, order._id);
                            // console.log(order.color[0]);
                        }
                    });
                    // console.log('updated cart color', cart);

                    localStorage.setItem('cart', JSON.stringify(cart));
                    dispatch({
                        type: "ADD_TO_CART",
                        payload: cart,
                    });
                }
                toast.success('success on making changes click on proceed to checkout')
            }
        });

        dispatch({
            type: 'COD',
            payload: true,
        });

        userCart(cart, user.token)
            .then(res => {
                console.log('cart post res', res);
                if (res.data.ok) history.push('/checkout');
            }).catch(err => console.log('cart save error', err))
    };

    const checkNumber = (e) => {
        e.preventDefault()
        let number = ''
        if (user) {
            number = user.number
        }
        if (number === "undefined") {
            toast.error('please check your profile settings to set up your phone number')
            return
        } else {
            saveCashOrderToDb()
        }
    }


    return (
        <>
            <div className="container-fluid pt-2">
                <div className="row">
                    <div className="col-md-8">
                        <h4>Cart / {cart.length} Product</h4>
                        {
                            !cart.length ?
                                (
                                    <p>
                                        No products in cart.{" "}
                                        <Link to='/shop'>Continue Shopping</Link>
                                    </p>
                                ) :
                                (
                                    showCartItems()
                                )
                        }
                    </div>
                    <div className="col-md-4">
                        <h4>Order Summary</h4>
                        <hr />
                        <p>Products</p>
                        {
                            cart.map((c, i) => (
                                <div key={i}>
                                    <p>{c.title} x {c.count} ={" "}
                                        {
                                            (c.price * c.count).toLocaleString('de-DE', { style: 'currency', currency: 'BIF' })
                                        }</p>
                                </div>
                            ))
                        }
                        <hr />
                        Total:{" "}
                        <b>
                            {
                                getTotal().toLocaleString('de-DE', { style: 'currency', currency: 'BIF' })
                            }
                        </b>
                        <hr />
                        <div className='container-fluid'>
                            <div className='row  justify-content-around'>
                                {
                                    user ?
                                        (
                                            <>
                                                {/* <div className='col-md-4 col-6 p-3 mr-4'>
                                                    <Button type='primary'
                                                        onClick={saveOrderToDb}
                                                        disabled={!cart.length}
                                                        className="mt-2">
                                                        Proceed to checkout
                                                    </Button>
                                                </div> */}
                                                <div className='col-md-4 col-6 p-3 mr-4'>
                                                    <Button type='primary' danger
                                                        onClick={checkNumber}
                                                        disabled={!cart.length}
                                                        className="mt-2">
                                                        {/* Pay Cash on Delivery */}
                                                        Proceed to checkout
                                                    </Button>
                                                </div>
                                            </>
                                        ) :
                                        (
                                            <div className='col-md-4 col-6 p-3'>
                                                <Button type='primary'
                                                    className="mt-2">
                                                    <Link to={{
                                                        pathname: "/login",
                                                        state: { from: "cart" },
                                                    }}>
                                                        Login to checkout
                                                    </Link>
                                                </Button>
                                            </div>
                                        )
                                }
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

export default Cart
