import React, { useState, useEffect } from 'react'
import { getPolpularBrand } from '../../functions/brand';
import { Link } from 'react-router-dom';
import defaultImage from '../../images/default.png'
import { Card, Skeleton } from 'antd'


const PopularBrand = () => {

    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setLoading(true);

        getPolpularBrand(6)
            .then((res) => {
                setBrands(res.data)
                setLoading(false);
            })
            .catch((res) => {
                // setLoading(false);
                console.log(res)
            });

    }, []);

    const LoadingCard = ({ count }) => {
        let totalCards = []
        for (let i = 0; i < count; i++) {
            totalCards.push(
                <Card className="col-sm-2 col-6 text-center" key={i}>
                    <Skeleton active></Skeleton>
                </Card>
            )
        }

        return totalCards;
    }

    const showSubs = () => brands.map((b) =>
        <div key={b._id} className=" col-sm-2 col-6 text-center">
            <div className='col'>
                {/* <Image
                    width={100}
                    height={100}
                    src={s.images && s.images.length ? s.images[0].url : defaultImage} /> */}

                <Link to={`/brand/${b.slug}`}>
                    <img
                        style={{ width: '100%', height: '100%' }}
                        src={b.images && b.images.length ? b.images[0].url : defaultImage}
                        alt={b.name} />
                </Link>
            </div>
            <div className='col'>
                <Link to={`/brand/${b.slug}`}>{b.name}</Link>
            </div>
        </div>
    );
    // console.log('subs', subs);

    return (
        <div>
            <div className='row ml-4 mr-4 mt-2 mb-2'>

                {
                    loading ? (
                        <LoadingCard count={6} />
                    )
                        : (
                            showSubs()
                        )
                }

            </div>
        </div>
    )
}

export default PopularBrand
