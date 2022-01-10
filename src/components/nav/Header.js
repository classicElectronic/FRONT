import React, { useState } from 'react';
import { Menu, Badge } from 'antd';
import {
    AppstoreOutlined,
    SettingOutlined,
    ShoppingOutlined,
    UserOutlined,
    UserAddOutlined,
    LogoutOutlined,
    ShoppingCartOutlined,
    MenuOutlined,
} from '@ant-design/icons';
import { Link, } from "react-router-dom";
import firebase from 'firebase/compat/app';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import SearchBox from '../forms/Search';

const { SubMenu, Item } = Menu;

const Header = () => {
    const [current, setCurrent] = useState("home");

    let dispatch = useDispatch();
    let { user, cart } = useSelector((state) => ({ ...state }));

    let history = useHistory();

    const handleClick = (e) => {
        // console.log('key', e.key);
        if (e.key !== 'navMenu') {
            setCurrent(e.key)
        }
    }
    const logout = () => {
        firebase.auth().signOut();
        dispatch({
            type: "LOGOUT",
            payload: null,
        });
        history.push('/login');
    };

    const openSideMenu = () => {
        // console.log('side Menu');
        // show nav in side drawer
        dispatch({
            type: "SET_NAV_VISIBLE",
            payload: true,
        });

    }



    return (
        <>
            <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
                <Item key="home" icon={<AppstoreOutlined />}>
                    <Link to="/" >Home</Link>
                </Item>

                <Item key="shop" icon={<ShoppingOutlined />} >
                    <Link to="/shop" >Shop</Link>
                </Item>

                <Item key="cart" icon={<ShoppingCartOutlined />} className='mobileHidden'>
                    <Link to="/cart" >
                        <Badge count={cart.length} offset={[9, 0]}>
                            Cart
                        </Badge>
                    </Link>
                </Item>
                {!user && (
                    <Item key="register" icon={<UserAddOutlined />}
                        className="mobileHidden float-right ">
                        <Link to="/register" >Register</Link>
                    </Item>
                )}

                {!user && (
                    <Item key="login" icon={<UserOutlined />}
                        className="mobileHidden float-right ">
                        <Link to="/login" >Login</Link>
                    </Item>
                )}

                {user && (
                    <SubMenu key="SubMenu"
                        icon={<SettingOutlined />}
                        title={user.email && user.email.split('@')[0]}
                        className="mobileHidden float-right ">
                        {user && user.role === "subscriber" && (
                            <Item key="setting:1" className=''>
                                <Link to="/user/history"> Dashboard </Link>
                            </Item>
                        )}
                        {user && user.role === "admin" && (
                            <Item key="setting:1" className=''>
                                <Link to="/admin/dashboard"> Dashboard </Link>
                            </Item>
                        )}

                        <Item key='logout' icon={<LogoutOutlined />} onClick={logout}
                            className=''>
                            Logout
                        </Item>
                    </SubMenu>
                )}

                <span className="mobileHidden float-right p-1">
                    <SearchBox />
                </span>

                <Item key='navMenu' className='mobileVisible float-right'>
                    <MenuOutlined style={{ fontSize: '20px' }}
                        onClick={openSideMenu}
                    />
                </Item>
            </Menu>
        </>
    );
}
export default Header;
