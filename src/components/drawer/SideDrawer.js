import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import defaultLaptop from '../../images/default.png';
import { Drawer } from 'antd'

const SideDrawer = () => {
    // redux
    const { cart, drawer } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();

    const imageStyle = {
        width: '100px',
        height: '50px',
        objectFit: 'cover'
    };


    return <Drawer
        className="text-center"
        title={`Cart / ${cart.length} products`}
        placement="right"
        closable={true}
        onClose={() => {
            dispatch({
                type: "SET_VISIBLE",
                payload: false,
            });
        }}
        visible={drawer}>
        {
            cart.map((p) => (
                <div className="row" key={p._id}>
                    <div className="col">
                        {
                            p.images[0] ?
                                (
                                    <>
                                        <img src={p.images[0].url} alt="pic" style={imageStyle} />
                                        <p className="text-center bg-secondary text-light">
                                            {p.title} x {p.count}
                                        </p>
                                    </>
                                ) :
                                (
                                    <>
                                        <img src={defaultLaptop} alt="pic" style={imageStyle} />
                                        <p className="text-center bg-secondary text-light">
                                            {p.title} x {p.count}
                                        </p>
                                    </>
                                )
                        }
                    </div>
                </div>
            ))
        }
        <Link to='/cart'>
            <button
                onClick={() => {
                    dispatch({
                        type: "SET_VISIBLE",
                        payload: false,
                    })
                }}
                className="text-center btn btn-primary btn-raised btn-block" >
                GO TO CART
            </button>
        </Link>
    </Drawer>
}

export default SideDrawer
