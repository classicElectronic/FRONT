import React, { useState, useEffect } from 'react';
import { getProductsByCount } from '../functions/product';
import { getCategories } from '../functions/category';
import { useSelector, useDispatch } from 'react-redux';
// import ProductCard from '../components/cards/ProductCard'
import { fetchProductsByFilter } from '../functions/product';
import { Checkbox, Button } from 'antd'
import { SearchOutlined, LoadingOutlined } from '@ant-design/icons';
import Star from '../components/forms/Star';
import { getSubs } from '../functions/sub'
import SearchDrawer from '../components/drawer/SearchDrawer';
import Filter from '../components/cards/FIlter';
import Footer from '../components/footer/footer'
import ShopPagination from '../components/pagination/ShopPagination';
import { getBrands } from '../functions/brand'

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState([0, 0]);
    const [ok, setOk] = useState(false);
    const [categories, setCategories] = useState([]);
    const [categoryIds, setCategoyIds] = useState([]);
    const [star, setStar] = useState("");
    const [subs, setSubs] = useState([]);
    const [sub, setSub] = useState("");
    const [brands, setBrands] = useState([])
    const [brand, setBrand] = useState("")

    let dispatch = useDispatch();
    let { search } = useSelector((state) => ({ ...state }));
    const { text } = search;

    useEffect(() => {
        // fetch categories
        getCategories().then((res) => setCategories(res.data))
            .catch((e) => console.log("get categories", e));
        // fetch sub categories
        getSubs().then((res) => setSubs(res.data))
            .catch((e) => console.log("get categories", e));
        // fetch brands
        getBrands().then(res => setBrands(res.data))
            .catch(e => console.log('get brands', e));

        loadAllProducts();

    }, []);

    const fetchProducts = (arg) => {
        fetchProductsByFilter(arg)
            .then((res) => {
                setProducts(res.data);
            })
    };

    // 1. load products by default on page load
    const loadAllProducts = () => {
        setLoading(true);
        getProductsByCount(12)
            .then((p) => {
                setProducts(p.data);
                setLoading(false);
            });
    };


    // 2. load Products on user search input
    useEffect(() => {
        // console.log("load Products on user search input", text);
        const delayed = setTimeout(() => {
            fetchProducts({ query: text });
            if (!text) {
                loadAllProducts();
            }
        }, 300);

        return () => clearTimeout(delayed);

    }, [text])



    // 3. load products based on price range
    useEffect(() => {
        // console.log('ok to request');
        fetchProducts({ price });
    }, [ok]);

    const handleSlider = (value) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" },
        });

        // reset
        setCategoyIds([])
        setPrice(value);
        setStar('');
        setSub('');
        setBrand('');
        setTimeout(() => {
            setOk(!ok)
        }, 300);
    };

    // 4.load products based on category
    // show categories in a list of checkbox
    const showCategories = () => categories.map((c) => <div key={c._id}>
        <Checkbox
            onChange={handleCheck}
            className="pb-2 pl-4 pr-4"
            value={c._id} name="category"
            checked={categoryIds.includes(c._id)}>
            {c.name}
        </Checkbox>
    </div>);

    // handle to check categories
    const handleCheck = (e) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" },
        });
        setPrice([0, 0]);
        setStar('');
        setSub('');
        setBrand('');
        // console.log(e.target.value);
        let inTheState = [...categoryIds];
        let justChecked = e.target.value;
        let foundInTheState = inTheState.indexOf(justChecked); // true or -1

        // indexOf method ?? if not found returns -1 else return index
        if (foundInTheState) {
            inTheState.push(justChecked);
        } else {
            // if found pull out one item from the index
            inTheState.splice(foundInTheState, 1);
        }

        setCategoyIds(inTheState);
        // console.log(inTheState);
        fetchProducts({ category: inTheState })
    };

    // 5. show products by star rating
    const handleStarClick = (num) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" },
        });
        setPrice([0, 0]);
        setCategoyIds([]);
        // console.log(num);
        setStar(num);
        setSub('');
        setBrand('');
        fetchProducts({ stars: num });
    };


    const showStars = () => (
        <div className="pr-4 pb-2 pl-4">
            <Star starClick={handleStarClick} numberOfStars={5} />
            <Star starClick={handleStarClick} numberOfStars={4} />
            <Star starClick={handleStarClick} numberOfStars={3} />
            <Star starClick={handleStarClick} numberOfStars={2} />
            <Star starClick={handleStarClick} numberOfStars={1} />
        </div>
    );

    // 6. show product by sub categories
    const handleSub = sub => {
        // console.log("SUB", sub);
        setSub(sub);
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" },
        });
        setPrice([0, 0]);
        setCategoyIds([]);
        setStar('');
        setBrand('');
        fetchProducts({ sub });
    }

    const showSubs = () => subs.map((s) => <div
        key={s._id}
        onClick={() => handleSub(s)}
        className="p-1 m-1 badge badge-secondary"
        style={{ cursor: "pointer" }}>
        {s.name}
    </div>);

    // 7. show products based on brand name

    const showBrands = () => brands.map((b) => (
        <div
            key={b._id}
            onClick={() => handleBrand(b)}
            className="p-1 m-1 badge badge-secondary"
            style={{ cursor: "pointer" }}>
            {b.name}
        </div>
    )
    );

    const handleBrand = brand => {
        setSub('');
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" },
        });
        setPrice([0, 0]);
        setCategoyIds([]);
        setStar('');
        setBrand(brand)
        // console.log("brand", brand);
        fetchProducts({ brand });
    };
    const [searchBtn, setSearchBtn] = useState(false)
    const handleSearchBtnClick = () => {
        // alert('clicked');
        setSearchBtn(true);
    }

    const ShowDrawer = () => {
        const onClose = () => {
            setSearchBtn(false);
        };
        return <SearchDrawer
            onClose={onClose} searchBtn={searchBtn} price={price} handleSlider={handleSlider}
            showCategories={showCategories} showStars={showStars} showSubs={showSubs}
            showBrands={showBrands}
        />
    }

    return (
        <>
            <div className="container-fluid" >
                <div className='row'>
                    {ShowDrawer()}
                </div>
                <div className="row" >
                    <div className="col-md-3 pt-2" >
                        <div className='d-flex' >
                            <h4 style={{ marginBotom: '0.2em' }}>Search Filter</h4>
                            <div className='mobileVisible float-right'
                                style={{ marginLeft: '50%', alignSelf: 'center', }}>
                                <Button onClick={handleSearchBtnClick}
                                    shape="circle" danger icon={<SearchOutlined />} size="large" />
                            </div>
                        </div>
                        <hr style={{ marginTop: '3%' }} />
                        <div className='mobileHidden'>
                            <Filter
                                price={price} handleSlider={handleSlider}
                                showCategories={showCategories} showStars={showStars}
                                showSubs={showSubs}
                                showBrands={showBrands}
                            />
                        </div>
                    </div>

                    <div className="col-md-9 pt-2" >
                        {
                            loading ?
                                (
                                    <h4 className="text-danger" >
                                        <LoadingOutlined />
                                    </h4>
                                )
                                :
                                (
                                    <h4 className="text-danger" >Products</h4>
                                )
                        }

                        {products.length < 1 && <div className='text-center'>
                            <h4>No products found</h4>
                        </div>}

                        <div className="row pb-5">
                            {products &&
                                <ShopPagination products={products} loading={loading} />
                            }
                        </div>
                    </div>
                </div>
            </div>
            {/* footer */}
            <hr />
            <Footer />
        </>
    )
};

export default Shop
