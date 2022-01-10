import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom';
import { Drawer, Badge, Menu, Dropdown, Button } from 'antd'
import firebase from 'firebase/compat/app';
import {
    LogoutOutlined, SettingOutlined,
    ShoppingCartOutlined, UserAddOutlined, UserOutlined,
} from '@ant-design/icons';
import SearchBox from '../forms/Search';

const { Item, ItemGroup } = Menu;

const NavDrawer = () => {

    // redux
    const { user, nav, cart } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();

    let history = useHistory();

    const linkClicked = () => {
        dispatch({
            type: "SET_NAV_VISIBLE",
            payload: false,
        });
    }

    const logout = () => {
        firebase.auth().signOut();
        dispatch({
            type: "LOGOUT",
            payload: null,
        });

        dispatch({
            type: "SET_NAV_VISIBLE",
            payload: false,
        });

        history.push('/login');
        return;
    };

    const menu = (
        <Menu onClick={linkClicked}>
            {user && user.role === 'admin' && (
                <ItemGroup title="Admin Dashboard">
                    <Item key='/admin/dashboard'
                        style={{ borderBottom: '1px solid', }}
                    >
                        <Link to="/admin/dashboard" className="nav-link" >
                            Dashboard
                        </Link>
                    </Item>
                    <Item key='/admin/product'
                        style={{ borderBottom: '1px solid', }}
                    >
                        <Link to="/admin/product" className="nav-link">
                            Product
                        </Link>
                    </Item>
                    <Item key='/admin/products'
                        style={{ borderBottom: '1px solid', }}
                    >
                        <Link to="/admin/products" className="nav-link">
                            Products
                        </Link>
                    </Item>
                    <Item key="/admin/category"
                        style={{ borderBottom: '1px solid', }}
                    >
                        <Link to="/admin/category" className="nav-link">
                            Category
                        </Link>
                    </Item>
                    <Item key='/admin/sub'
                        style={{ borderBottom: '1px solid', }}
                    >
                        <Link to="/admin/sub" className="nav-link">
                            Sub Category
                        </Link>
                    </Item>

                    <Item key="/admin/brand"
                        style={{ borderBottom: '1px solid', }}
                    >
                        <Link to="/admin/brand" className="nav-link">
                            Brand
                        </Link>
                    </Item>

                    <Item key='/admin/coupon'
                        style={{ borderBottom: '1px solid', }}
                    >
                        <Link to="/admin/coupon" className="nav-link">
                            Coupon
                        </Link>
                    </Item>

                    <Item key='/admin/hero'
                        style={{ borderBottom: '1px solid', }}
                    >
                        <Link to="/admin/hero" className="nav-link">
                            Hero section
                        </Link>
                    </Item>
                </ItemGroup>
            )}

            <ItemGroup title="User Dashboard">
                <Item key='/user/history' style={{ borderBottom: '1px solid', }}>
                    <Link to="/user/history" className="nav-link">
                        History
                    </Link>
                </Item>

                <Item key='/user/password' style={{ borderBottom: '1px solid', }}>
                    <Link to="/user/password" className="nav-link">
                        Settings
                    </Link>
                </Item>

                <Item key='/user/wishlist' style={{ borderBottom: '1px solid', }}>
                    <Link to="/user/wishlist" className="nav-link">
                        Wishlist
                    </Link>
                </Item>
            </ItemGroup>
        </Menu>
    );

    return <Drawer
        className='text-center'
        placement="right"
        onClose={() => {
            dispatch({
                type: "SET_NAV_VISIBLE",
                payload: false,
            });

        }}
        title={'Menu'}
        visible={nav}
    >
        <div className='container-fluid'>
            <div className='row'>
                <hr />

                <div className='col-md'>
                    <SearchBox />
                    <hr />
                </div>

                <div className='col-md'>
                    <Link to="/cart" onClick={linkClicked}>
                        <Badge count={cart.length} offset={[9, 0]}>
                            <ShoppingCartOutlined /> {' '}
                            Cart
                        </Badge>
                    </Link>
                    <hr />
                </div>

                <div className='col-md'>
                    {!user && (
                        <Link onClick={linkClicked} to="/register"
                            style={{ color: '#000', }}>
                            <UserAddOutlined />{' '}
                            Register
                        </Link>
                    )}
                    {!user && (
                        <hr />
                    )}
                </div>

                <div className='col-md'>
                    {!user && (
                        <Link onClick={linkClicked} to="/login"
                            style={{ color: '#000', }}>
                            <UserOutlined />{' '}
                            Login
                        </Link>
                    )}
                    {!user && (
                        <hr />
                    )}
                </div>

                <div className='col-md'>
                    {user && (
                        <Dropdown overlay={menu}>
                            <p style={{ color: '#000', }}>
                                <SettingOutlined /> {user.email && user.email.split('@')[0]}
                            </p>
                        </Dropdown>
                    )}
                    <hr />

                </div>

                <div className='col-md'>
                    {user && (
                        <p key='logout' onClick={logout}
                            style={{ color: '#000', }}>
                            <LogoutOutlined />{' '}
                            Logout
                        </p>
                    )}
                    {user && (
                        <hr />
                    )}
                </div>
            </div>
        </div>
    </Drawer>
}

export default NavDrawer