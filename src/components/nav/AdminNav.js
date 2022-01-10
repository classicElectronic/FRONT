import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

const { Item } = Menu;

const AdminNav = () => {
    const location = useLocation()
    // console.log('location.pathname', location.pathname);
    const [current, setCurrent] = useState(location.pathname);

    const handleClick = (e) => {
        // console.log('key', e.key);
        if (e.key !== 'navMenu') {
            setCurrent(e.key)
        }
    }

    return (
        <>
            <Menu
                onClick={handleClick}
                mode='inline' selectedKeys={current}>
                <Item key='/admin/dashboard'
                    style={{ borderBottom: '1px solid', }}
                >
                    <Link to="/admin/dashboard" className="nav-link" style={{ padding: '0em' }}>
                        Dashboard
                    </Link>
                </Item>
                <Item key='/admin/product'
                    style={{ borderBottom: '1px solid', }}
                >
                    <Link to="/admin/product" className="nav-link"
                        style={{ padding: '0em' }}
                    >
                        Product
                    </Link>
                </Item>
                <Item key='/admin/products'
                    style={{ borderBottom: '1px solid', }}
                >
                    <Link to="/admin/products" className="nav-link"
                        style={{ padding: '0em' }}
                    >
                        Products
                    </Link>
                </Item>
                <Item key="/admin/category"
                    style={{ borderBottom: '1px solid', }}
                >
                    <Link to="/admin/category" className="nav-link"
                        style={{ padding: '0em' }}
                    >
                        Category
                    </Link>
                </Item>
                <Item key='/admin/sub'
                    style={{ borderBottom: '1px solid', }}
                >
                    <Link to="/admin/sub" className="nav-link"
                        style={{ padding: '0em' }}
                    >
                        Sub Category
                    </Link>
                </Item>
                <Item key="/admin/brand"
                    style={{ borderBottom: '1px solid', }}
                >
                    <Link to="/admin/brand" className="nav-link"
                        style={{ padding: '0em' }}
                    >
                        Brand
                    </Link>
                </Item>

                <Item key='/admin/coupon'
                    style={{ borderBottom: '1px solid', }}
                >
                    <Link to="/admin/coupon" className="nav-link"
                        style={{ padding: '0em' }}
                    >
                        Coupon
                    </Link>
                </Item>

                <Item key='/admin/hero'
                    style={{ borderBottom: '1px solid', }}
                >
                    <Link to="/admin/hero" className="nav-link"
                        style={{ padding: '0em' }}
                    >
                        Hero section
                    </Link>
                </Item>

                <Item key='/admin/password'
                    style={{ borderBottom: '1px solid', }}
                >
                    <Link to="/user/history" className="nav-link"
                        style={{ padding: '0em' }}
                    >
                        <SettingOutlined />{' '}
                        User Dashboard
                    </Link>
                </Item>
            </Menu>
        </>
    )
};

export default AdminNav;
