import React, { useState } from "react";
import { Card, Tabs, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import {
    HeartOutlined,
    ShoppingCartOutlined
} from '@ant-design/icons';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import DefaultIMG from '../../images/default.png'
import ProductListItems from './ProductListItems';
import StarRating from 'react-star-ratings'
import RatingModal from "../modal/RatingModal";
import showAverage from '../../functions/rating';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { addToWishlist } from '../../functions/user'
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";


const { TabPane } = Tabs;

// this is children component of Product page
const SingleProduct = ({ product, onStarClick, star, brand, color }) => {
    const { title, images, description, _id } = product;
    const [tooltip, setTooltip] = useState('Click to add');

    let history = useHistory();

    // redux
    const dispatch = useDispatch();
    const { user, cart } = useSelector((state) => ({ ...state }));

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

    const handleAddToWoshList = (e) => {
        e.preventDefault();

        addToWishlist(product._id, user.token)
            .then(res => {
                console.log("added to wishlist", res.data);
                toast.success("ADDED TO WISHLIST")
                history.push('/user/wishlist');
            })
    }

    return (
        <>
            <div className="col-md-6">
                {images && images.length ? <Carousel showArrows={true} autoPlay infiniteLoop>
                    {images && images.map((i) =>
                        <img
                            style={{ width: '80%', height: '80%' }}
                            src={i.url} key={i.public_id} alt="product" />
                    )}
                </Carousel> :
                    <Card cover={
                        <img
                            style={{ width: '100%' }}
                            className="mb-3 card-image"
                            src={DefaultIMG} alt="Images" />
                    }></Card>
                }

            </div>

            <div className="col-md-6 mb-4">
                <h1 className="bg-info p-3">{title}</h1>

                {
                    product && product.ratings && product.ratings.length > 0
                        ? showAverage(product)
                        : <div className="text-center pt-1 pb-3">No rating yet</div>
                }

                <Card
                    actions={[
                        <Tooltip title={tooltip}>
                            <a
                                disabled={product.quantity < 1}
                                onClick={handleToCart}>
                                <ShoppingCartOutlined className="text-danger" />
                                <br />
                                {product.quantity < 1 ? "Out of stock" : " Add to Cart"}
                            </a>
                        </Tooltip>,

                        <a onClick={handleAddToWoshList}>
                            <HeartOutlined className="text-info" />
                            <br /> Add To Wishlist
                        </a>
                        ,

                        <RatingModal>
                            <StarRating
                                name={_id}
                                numberOfStars={5}
                                rating={star}
                                changeRating={onStarClick}
                                isSelectable={false}
                                starRatedColor="red"
                            />
                        </RatingModal>
                    ]}
                >
                    <ProductListItems product={product} color={color} brand={brand} />
                </Card>
            </div>
            <div className="col-md-6">

                <Tabs type="card">
                    <TabPane tab="Description" key="1">
                        {description && description}
                    </TabPane>
                    <TabPane tab="More" key="2">
                        Call us on xx-xxx-xxx for More information
                    </TabPane>
                </Tabs>
            </div>
        </>
    )
}

export default SingleProduct;