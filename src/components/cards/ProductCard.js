import React, { useState } from 'react'
import { Card, Tooltip } from 'antd'
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import defaultImage from '../../images/default.png'
import { Link } from 'react-router-dom';
import showAverage from '../../functions/rating';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
// import { useSelector } from 'react-redux';


const { Meta } = Card;

const ProductCard = ({ product }) => {

    // destructe
    const { title, description, price, images, slug } = product;
    const p = price.toLocaleString('de-DE', { style: 'currency', currency: 'BIF' });
    const [tooltip, setTooltip] = useState('Click to add');
    const tooltipView = useState('Click to View');

    // redux
    const dispatch = useDispatch();
    // const { user, cart } = useSelector((state) => ({ ...state }));

    const handleToCart = () => {

        // create cart array
        let cart = [];
        if (typeof window !== undefined) {
            // if cart is in local storage get
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'))
            }
            //push new product to cart
            cart.push({
                ...product,
                count: 1,
            });
            // remove dubplicate
            let unique = _.uniqWith(cart, _.isEqual)
            // save to local storage
            // console.log('unique',unique);
            localStorage.setItem('cart', JSON.stringify(unique));
            // show tooltip
            setTooltip('Added');

            // add to redux state
            dispatch({
                type: "ADD_TO_CART",
                payload: unique,
            });
            // show card items in side drawer
            dispatch({
                type: "SET_VISIBLE",
                payload: true,
            });
        }
    };

    const handleToViewProduct = (e) => {
        e.preventDefault()
        window.location = `/product/${slug}`
    }

    return (
        <>
            {
                product && product.ratings && product.ratings.length > 0
                    ? showAverage(product)
                    : <div className="text-center pt-1 pb-3">No rating yet</div>
            }
            <Card
                cover={
                    <img style={{
                        // height: "100%",
                        height: "150px",
                        objectFit: "cover",
                    }}
                        className="p-1"
                        src={images && images.length ? images[0].url : defaultImage} alt="Images" />
                }
                actions={[
                    <Tooltip title={tooltipView}>
                        <Link onClick={handleToViewProduct} to={`/product/${slug}`} className=''>
                            <EyeOutlined className="text-success" />
                            <br />
                            View Product
                        </Link>
                    </Tooltip>,

                    <Tooltip title={tooltip} >
                        <a className=''
                            disabled={product.quantity < 1}
                            onClick={handleToCart}>
                            <ShoppingCartOutlined className="text-danger" />
                            <br />
                            {product.quantity < 1 ? "Out of stock" : " Add to Cart"}
                        </a>
                    </Tooltip>
                ]}>
                {/* <Meta className="text-center" title={title} description={p} /> */}
                <Meta title={`${p}`} description={`${title}`} />
            </Card>
        </>
    )
}

export default ProductCard
