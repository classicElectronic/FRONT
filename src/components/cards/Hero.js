import React, { useEffect, useState } from 'react'
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { ArrowRightOutlined } from '@ant-design/icons'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { getHeros } from '../../functions/hero';
import { useSelector, useDispatch } from 'react-redux';

import image1 from '../../images/s-l960 (1).webp'
import image2 from '../../images/s-l960.webp'


const Hero = () => {

    const dispatch = useDispatch()

    const [heros, setHeros] = useState([])

    const { hero } = useSelector((state) => ({ ...state }))

    useEffect(() => {
        loadHeros()
    }, [])

    const loadHeros = () =>
        getHeros().then(h => setHeros(h.data)).catch(e => console.log(e))

    // console.log(heros);

    dispatch({
        type: "GET_HERO",
        payload: heros
    })

    return (
        <>
            <div className='container-fluid'>
                <OwlCarousel className='owl-theme' loop={true} autoplay={true} autoplayTimeout={10000}
                    center margin={32} dots={false} items={1}>
                    {hero && hero.map(h => (
                        <div className='row item ' key={h._id} style={{
                            // paddingRight: '15px',
                            backgroundColor: `${h.color}`,
                        }}>
                            <div className='col-md-4 p-5 pl-3 text-left' style={{ alignSelf: 'center', }}>
                                <h2 className='' style={{ color: '#fff' }}>
                                    {h.slogan}
                                </h2>
                                <div>
                                    <Button type="default" danger size='large'>
                                        <Link to='/shop'>
                                            {h.buttonInfo} <ArrowRightOutlined />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                            <div className='col-md-8' style={{ alignSelf: 'center', }}>
                                <img src={h.images[0].url} alt='pic 1' />
                            </div>
                        </div>

                    ))}
                </OwlCarousel>
            </div>
        </>
    )
}

export default Hero
