import React, { useState, useEffect } from 'react';
import ModalImage from 'react-modal-image';
import defaultLaptop from '../../images/default.png';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined } from '@ant-design/icons'
import { getProduct } from '../../functions/product';

const ProductCardInCheckout = ({ p }) => {
    let dispatch = useDispatch();
    const [colors, setColors] = useState([])
    const [brand, setBrand] = useState([])
    const [category, setCategory] = useState([])
    const [selectedColor, setSelectedColor] = useState('');

    useEffect(() => {
        getProduct(p.slug)
            .then(res => {
                setColors(res.data.color)
                setBrand(res.data.brand)
                setCategory(res.data.category)
                // console.log(res.data.color[0]);
                setSelectedColor(res.data.color[0])
            })
    }, [])

    const handleColorChange = (e) => {
        // console.log('color changed', e.target.value);
        let cart = [];
        if (typeof window !== undefined) {
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'));
            };

            cart.map((product, i) => {
                if (product._id === p._id) {
                    cart[i].color = e.target.value;
                    console.log(e.target.value);
                    setSelectedColor(e.target.value)
                }
            });
            // console.log('updated cart color', cart);

            localStorage.setItem('cart', JSON.stringify(cart));
            dispatch({
                type: "ADD_TO_CART",
                payload: cart,
            });
        }
    };

    const handleQuantityChange = (e) => {
        let count = e.target.value < 1 ? 1 : e.target.value;

        let cart = [];
        // console.log('available quantity', p.quantity);
        if (count > p.quantity) {
            toast.error(`Max available quantity: ${p.quantity}`);
            return;
        }

        if (typeof window !== undefined) {
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'));
            };

            cart.map((product, i) => {
                if (product._id === p._id) {
                    cart[i].count = count;
                }
            });

            localStorage.setItem('cart', JSON.stringify(cart));
            dispatch({
                type: "ADD_TO_CART",
                payload: cart,
            });
        }
    };

    const handleRemove = () => {
        // console.log(p._id, 'to remove');

        let cart = [];

        if (typeof window !== undefined) {
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'));
            };

            cart.map((product, i) => {
                if (product._id === p._id) {
                    cart.splice(i, 1);
                }
            });

            localStorage.setItem('cart', JSON.stringify(cart));
            dispatch({
                type: "ADD_TO_CART",
                payload: cart,
            });
        }
    };

    return (
        <tbody>
            <tr>
                <td>
                    <div style={{ width: '100px', height: 'auto' }}>
                        {
                            p.images.length ?
                                (
                                    <ModalImage small={p.images[0].url} large={p.images[0].url} />
                                ) :
                                (
                                    <ModalImage small={defaultLaptop} large={defaultLaptop} />
                                )
                        }
                    </div>
                </td>
                <td>{p.title}</td>
                <td>{(p.price).toLocaleString('de-DE', { style: 'currency', currency: 'BIF' })}</td>
                <td>{category.name}</td>
                <td>{brand.name}</td>
                <td>
                    <select
                        onChange={handleColorChange}
                        name="color"
                        value={selectedColor ? selectedColor : p.color[0]}
                        className="form-control">
                        {/* {
                            p.color ?
                                (
                                    <option value={p.color}>{p.color}</option>
                                ) :
                                (
                                    <option>Select</option>
                                )
                        } */}
                        {/* <option>Select</option> */}
                        {colors.map((c) => (
                            <option key={c}
                                value={c}>
                                {c}
                            </option>
                        ))}
                        {/* {
                            colors
                                .filter((c) => c !== p.color)
                                .map((c) =>
                                    <option key={c}
                                        value={c}>
                                        {c}
                                    </option>)
                        } */}
                    </select>
                </td>
                <td className="text-center">
                    <input
                        type="number" className="form-control"
                        value={p.count}
                        onChange={handleQuantityChange}
                    />
                </td>
                <td className="text-center">
                    {p.shipping === "Yes" ?
                        (
                            <CheckCircleOutlined className="text-success" />
                        ) : (
                            <CloseCircleOutlined className="text-danger" />
                        )}
                </td>
                <td className="text-center">
                    <DeleteOutlined
                        onClick={handleRemove}
                        className="text-danger pointer"
                    />
                </td>
            </tr>
        </tbody>
    )
}

export default ProductCardInCheckout
