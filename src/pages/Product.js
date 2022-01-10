import React, { useState, useEffect } from 'react'
import { getProduct, productStar, getRelated } from '../functions/product';
import SingleProduct from '../components/cards/SingleProduct';
import { useSelector } from 'react-redux';
import ProductCard from '../components/cards/ProductCard'
import Footer from '../components/footer/footer';

const Product = ({ match }) => {
    const { user } = useSelector((state) => ({ ...state }))
    const [product, setProduct] = useState({});
    const [star, setStar] = useState(0);
    const [related, setRelated] = useState([]);
    const [brand, setBrand] = useState('');
    const [color, setColor] = useState([]);

    const { slug } = match.params;

    useEffect(() => {
        loadingSingleProduct();
    }, [slug]);

    useEffect(() => {
        if (product.ratings && user) {
            // check if currently login user havent already add rating to product
            let existingRatingObject = product.ratings.find(
                (ele) => (ele.postedBy.toString() === user._id.toString())
            );

            existingRatingObject && setStar(existingRatingObject.star) // current user star
        }
    })

    const loadingSingleProduct = () => {
        getProduct(slug).then((res) => {
            setProduct(res.data);
            setBrand(res.data.brand.name)
            setColor(res.data.color)
            // console.log('brand', brand);
            //  load the related
            getRelated(res.data._id)
                .then((res) => setRelated(res.data))
        });
    }


    const onStarClick = (newRating, name) => {
        setStar(newRating)
        // console.table(newRating, name);
        productStar(name, newRating, user.token)
            .then(res => {
                console.log("rating clicked", res.data);

                //if you want to show updated rating in real time
                loadingSingleProduct();
            });
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row pt-4">
                    <SingleProduct product={product} onStarClick={onStarClick} brand={brand}
                        star={star}
                        color={color}
                    />
                </div>

                <div className="row">
                    <div className="col text-center pt-5 pb-5">
                        <hr />
                        <h4>Related Products</h4>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    {
                        related.length ? related.map((r) =>
                        (
                            <div key={r._id} className="col-md-3 col-6 mb-3">
                                <ProductCard
                                    product={r}
                                />
                            </div>
                        )

                        )
                            : (
                                <div className="text-center col">
                                    No Product Found
                                </div>
                            )
                    }
                </div>
            </div>
            {/* footer */}
            <hr />
            <Footer />
        </>
    )
};

export default Product
