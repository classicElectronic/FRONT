import React from 'react'
import { Link } from 'react-router-dom';
// import Jumbotron from '../components/cards/Jumbotron';
import Hero from '../components/cards/Hero';
import NewArrivals from '../components/home/NewArrivals';
import BestSellers from '../components/home/BestSellers';
// import CategoryList from '../components/category/CategoryList';
// import SubList from '../components/sub/SubList';
import PopularBrand from '../components/home/PopularBrand';
import { ArrowRightOutlined } from '@ant-design/icons'
import Footer from '../components/footer/footer'

import { useSelector } from 'react-redux'
import { Alert } from 'antd';

const Home = () => {

    const { user } = useSelector((state) => ({ ...state }))
    let number = ''
    if (user) {
        // console.log(user);
        number = user.number
        // console.log('number', number);
    }

    return (
        <>

            <div className='container-fluid'>

                <div className='row'>
                    {/* hero section */}
                    <Hero />
                </div>

                {number === "undefined" &&
                    <div className='row mt-3'>
                        <div className='col text-center'>
                            <Alert
                                message='phone number not available'
                                description='please check your profile settings to set up your phone number'
                                type='warning'
                            />
                        </div>
                    </div>
                }


                {/* popular brrand */}
                <div className='row'>
                    {/* <div className=' mt-5 mb-3'> */}
                    <div className='col-sm-3 col-6 mt-5 mb-3'>
                        <Link className='Home-link' to='/brands'>
                            <h3 className='Home-link'> popular brand</h3>
                        </Link>
                    </div>

                    <div className='col-xs-1 mt-5 mb-3'>
                        <span
                            style={{ fontSize: '150%', fontWeight: 'bold' }}
                            className='fs-3'>|</span>
                    </div>
                    <div className='col-sm-3 col mt-5 mb-3'>
                        <Link className='Home-link' to='/brands'>
                            <h3>explore all <ArrowRightOutlined /></h3>
                        </Link>
                    </div>
                    {/* </div> */}

                    <div className='container-fluid mb-2'>
                        <PopularBrand />
                    </div>
                </div>

                {/* new arrivals */}
                <div className='row'>
                    {/* <div className=' mt-5 mb-3'> */}
                    <div className='col-sm-2 col-6 mt-5 mb-3'>
                        <Link className='Home-link' to='/shop'>
                            <h3>New Arrivals</h3>
                        </Link>
                    </div>

                    <div className='col-xs-1 mt-5 mb-3'>
                        <span
                            style={{ fontSize: '150%', fontWeight: 'bold' }}
                            className='fs-3'>|</span>
                    </div>
                    <div className='col-sm-3 col mt-5 mb-3'>
                        <Link className='Home-link' to='/shop'>
                            <h3>explore all <ArrowRightOutlined /></h3>
                        </Link>
                    </div>
                    {/* </div> */}

                    <div className='container-fluid mb-1'>
                        <NewArrivals />
                    </div>
                </div>

                {/* best sellers arrivals */}
                <div className='row'>
                    {/* <div className=' mt-5 mb-3'> */}
                    <div className='col-sm-2 col-6 mt-5 mb-3'>
                        <Link className='Home-link' to='/shop'>
                            <h3>Best Sellers</h3>
                        </Link>
                    </div>

                    <div className='col-xs-1 mt-5 mb-3'>
                        <span
                            style={{ fontSize: '150%', fontWeight: 'bold' }}
                            className='fs-3'>|</span>
                    </div>
                    <div className='col-sm-3 col mt-5 mb-3'>
                        <Link className='Home-link' to='/shop'>
                            <h3>explore all <ArrowRightOutlined /></h3>
                        </Link>
                    </div>
                    {/* </div> */}

                    <div className='container-fluid mb-1'>
                        <BestSellers />
                    </div>

                </div>
            </div>
            {/* footer */}
            <hr />
            <Footer />
        </>
    );
}

export default Home;
