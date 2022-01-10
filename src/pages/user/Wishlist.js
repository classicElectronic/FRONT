import React, { useState, useEffect } from 'react';
import UserNav from '../../components/nav/UserNav';
import { getWishlist, removeWishlist } from '../../functions/user';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import { Card, Tooltip } from 'antd';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons'
import defaultImage from '../../images/default.png'

const { Meta } = Card;

const Wishlist = () => {

    const [wishlist, setWishlist] = useState([])
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadWishlist();
    }, []);

    const loadWishlist = () => getWishlist(user.token).then(res => {
        // console.log(res.data);
        setWishlist(res.data.wishlist)
    })

    const handleRemove = (productId) => removeWishlist(productId, user.token).then(res => {
        loadWishlist()
    })

    return (
        <>
            <div className="container-fluid">
                <div className="row">

                    <div className="col-md-2 mobileHidden">
                        <UserNav />
                    </div>

                    <div className="col-md-10">
                        <h4>Wishlist</h4>
                        <hr />
                        <div className='row'>
                            {
                                wishlist && wishlist.map(p => (
                                    <div className='col-md-3 col-6' key={p._id}>
                                        <Card cover={
                                            <img style={{
                                                height: "150px",
                                                objectFit: "cover",
                                            }}
                                                className="p-1"
                                                src={p.images && p.images.length ? p.images[0].url : defaultImage} alt="Images" />
                                        }
                                            actions={[
                                                <Link to={`/product/${p.slug}`}>
                                                    <EyeOutlined className="text-success" />
                                                    <br />
                                                    View
                                                </Link>,
                                                <Tooltip title='remove from wishlist'>
                                                    <a className=''
                                                        onClick={() => handleRemove(p._id)}>
                                                        <DeleteOutlined className="text-danger" />
                                                        <br />
                                                        remove
                                                    </a>
                                                </Tooltip>
                                            ]}
                                        >
                                            <Meta title={p.title} description={`${p.description && p.description.substring(0, 40)}...`} />
                                        </Card>
                                    </div>
                                ))
                            }
                            {
                                wishlist.length === 0 &&
                                (
                                    <div className='col text-center'>
                                        <h4>empty</h4>
                                    </div>
                                )
                            }
                        </div>

                    </div>
                </div>
            </div>
            {/* footer */}
            <hr />
            <Footer />
        </>
    );
}

export default Wishlist;