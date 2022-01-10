import React, { useState, } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux'

const { Item } = Menu;

const UserNav = () => {

    let { user } = useSelector((state) => ({ ...state }));

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

                <Item key='/user/history' style={{ borderBottom: '1px solid', }}>
                    <Link to="/user/history" className="nav-link" style={{ padding: '0em' }}>
                        History
                    </Link>
                </Item>

                <Item key='/user/password' style={{ borderBottom: '1px solid', }}>
                    <Link to="/user/password" className="nav-link" style={{ padding: '0em' }}>
                        Settings
                    </Link>
                </Item>

                <Item key='/user/wishlist' style={{ borderBottom: '1px solid', }}>
                    <Link to="/user/wishlist" className="nav-link" style={{ padding: '0em' }}>
                        Wishlist
                    </Link>
                </Item>
                {user && user.role === "admin" && (
                    <Item key="/admin/dashboard" style={{ borderBottom: '1px solid', }}>
                        <Link to="/admin/dashboard" className="nav-link" style={{ padding: '0em' }}>
                            <SettingOutlined />{' '}
                            Admin
                        </Link>
                    </Item>
                )}
            </Menu>
        </>
    )
}

export default UserNav;
