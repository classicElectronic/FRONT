import React from 'react'
// import ProductCreate from '../../pages/admin/product/ProductCreate';
import { Select } from 'antd';
import MultipleValueTextInput from 'react-multivalue-text-input';

const { Option } = Select;

const ProductCreateForm = ({ handleSubmit, handleChange, setValues, values, handleCategoryChange,
    subOption, showSub, loadBrands, handleBrandChange, loading }) => {
    // destructure
    const { title, description, price, categories, subs, quantity, brands }
        = values;
    // console.log('brands', brands);
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Title</label>
                <input type="text"
                    name="title"
                    disabled={loading}
                    className="form-control"
                    value={title}
                    onChange={handleChange} />
            </div>

            <div className="form-group">
                <label>Description</label>
                <textarea
                    rows={5}
                    name="description"
                    disabled={loading}
                    className="form-control"
                    value={description}
                    onChange={handleChange} />
            </div>

            <div className="form-group">
                <label>Price</label>
                <input type="number"
                    name="price"
                    disabled={loading}
                    className="form-control"
                    value={price}
                    onChange={handleChange} />
            </div>

            <div className="form-group">
                <label>Shipping</label>
                <select
                    name="shipping"
                    className="form-control"
                    disabled={loading}
                    onChange={handleChange}>
                    <option>Please Select</option>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                </select>
            </div>

            <div className="form-group">
                <label>Quantity</label>
                <input type="number"
                    name="quantity"
                    disabled={loading}
                    className="form-control"
                    value={quantity}
                    onChange={handleChange} />
            </div>

            <div className="form-group">
                <label>Color</label>
                {/* <select
                    name="color"
                    className="form-control"
                    onChange={handleChange}>
                    <option>Please Select</option>
                    {colors.map(c => <option key={c} value={c}>{c}</option>)}
                </select> */}
                <MultipleValueTextInput
                    className='form-control'
                    disabled={loading}
                    onItemAdded={(item, allItems) => {
                        // console.log(`Item added: ${item}`)
                        // console.log(`all items ${allItems}`)
                        setValues({ ...values, color: allItems })
                    }}
                    onItemDeleted={(item, allItem) => console.log(`Item removed: ${item}`)}
                    name="color"
                    placeholder="Enter product colors"
                />
            </div>



            <div className="form-group">
                <label>Category</label>
                <select
                    name="category"
                    disabled={loading}
                    className="form-control"
                    onChange={handleCategoryChange}>

                    <option>Please Select</option>
                    {categories.length > 0 && categories
                        .map((c) => (
                            <option key={c._id} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                </select>
            </div>

            {showSub && (
                <div className="form-group">
                    <label>sub categories</label>
                    <Select
                        mode="multiple"
                        disabled={loading}
                        style={{ width: '100%' }}
                        placeholder="Please select"
                        value={subs}
                        onChange={(value) => setValues({ ...values, subs: value })}>
                        {subOption.length &&
                            subOption.map((s) =>
                                <Option key={s._id} value={s._id}>
                                    {s.name}
                                </Option>)}
                    </Select>
                </div>
            )}

            <div className="form-group">
                <label>Brand</label>
                <select
                    onClick={loadBrands}
                    name="brand"
                    disabled={loading}
                    className="form-control"
                    onChange={handleBrandChange}>
                    <option>Please Select</option>
                    {brands.length > 0 && brands
                        .map((b) => (
                            <option key={b._id} value={b._id}>
                                {b.name}
                            </option>
                        ))}
                </select>
            </div>

            <button disabled={loading} className="btn btn-outline-info">Save</button>
        </form>
    );
}
export default ProductCreateForm