import React, { useState, useEffect } from 'react'
import { getCategories } from '../../functions/category'
import { getSubs } from '../../functions/sub'
import { getBrands } from '../../functions/brand'
import { List, Divider } from 'antd'
import { Link } from 'react-router-dom'


const Footer = () => {
    const [categories, setCategories] = useState([])
    const [subs, setSubs] = useState([])
    const [brands, setBrands] = useState([])
    const year = new Date().getFullYear()

    useEffect(() => {
        loadCategories();
        loadSubs();
        loadBrands();
    }, [])

    // console.log(categories);

    const loadCategories = () =>
        getCategories().then(c => setCategories(c.data)).catch((e) => console.log(e))

    const loadSubs = () =>
        getSubs().then(c => setSubs(c.data)).catch(e => console.log(e))

    const loadBrands = () =>
        getBrands().then(b => setBrands(b.data)).catch(e => console.log(e))

    return (
        <div className='container-fluid text-center'>
            <div className='row'>
                {/* <div className='col-md-4  text-center'>
                    <Divider className='justify-content-around'
                        orientation='left'>Categories</Divider>

                    <List
                        size='small'
                        dataSource={categories}
                        renderItem={item =>
                            <List.Item className='justify-content-around' >
                                <Link to={`/category/${item.slug}`}>
                                    {item.name}
                                </Link>
                            </List.Item>
                        }
                    />
                </div>
                <div className='col-md-4 col-6'>
                    <Divider className=''
                        orientation='left'>Sub-Categories</Divider>

                    <List
                        size='small'
                        dataSource={subs}
                        renderItem={item =>
                            <List.Item className='' >
                                <Link to={`/sub/${item.slug}`}>
                                    {item.name}
                                </Link>
                            </List.Item>
                        }
                    />
                </div>
                <div className='col-md-4 col-6'>
                    <Divider className='justify-content-around'
                        orientation='left'>Brands</Divider>
                    <List
                        size='small'
                        dataSource={brands}
                        renderItem={item =>
                            <List.Item className='' >
                                <Link to={`/brand/${item.slug}`}>
                                    {item.name}
                                </Link>
                            </List.Item>
                        }
                    />
                </div> */}
            </div>
            <div className='row justify-content-around m-3'>
                <div className='col-12 mb-4'>
                    <span>classic-elctronics &copy; {year}</span>
                </div>
            </div>
        </div>
    )
}

export default Footer
