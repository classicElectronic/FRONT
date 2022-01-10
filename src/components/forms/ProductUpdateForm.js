import React, { useState } from 'react'
// import ProductCreate from '../../pages/admin/product/ProductCreate';
import { Select } from 'antd';
import MultipleValueTextInput from 'react-multivalue-text-input';

const { Option } = Select;

const ProductUpdateForm = ({
    handleSubmit,
    handleChange,
    setValues,
    values,
    handleCategoryChange,
    handleBrandChange,
    categories,
    brands,
    subOption,
    arrayOfSubIds,
    setArrayOfSubIds,
    selectedCategory,
    selectedBrand,
    stringOfColors,
    loading,
}) => {
    // destructure
    const { title, description, price, category, shipping, quantity, brand }
        = values;

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
                    row={10}
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
                    value={shipping === "Yes" ? "Yes" : "No"}
                    name="shipping"
                    disabled={loading}
                    className="form-control"
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
                    value={color}
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
                    values={stringOfColors}
                    onItemDeleted={(item, allItem) => console.log(`Item removed: ${item}`)}
                    name="color"
                    // charCodes={[44]}
                    placeholder="Enter product colors"
                />
            </div>


            <div className="form-group">
                <label>Category</label>
                <select
                    name="category"
                    disabled={loading}
                    className="form-control"
                    onChange={handleCategoryChange}
                    value={selectedCategory ? selectedCategory : category._id}>

                    <option>Please Select</option>
                    {categories.length > 0 && categories
                        .map((c) => (
                            <option key={c._id} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                </select>
            </div>

            <div className="form-group">
                <label>sub categories</label>
                <Select
                    mode="multiple"
                    disabled={loading}
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    value={arrayOfSubIds}
                    onChange={(value) => setArrayOfSubIds(value)}>
                    {subOption.length &&
                        subOption.map((s) =>
                            <Option key={s._id} value={s._id}>
                                {s.name}
                            </Option>)}
                </Select>
            </div>

            <div className="form-group">
                <label>Brand</label>
                <select
                    value={selectedBrand ? selectedBrand : brand._id}
                    name="brand"
                    disabled={loading}
                    className="form-control"
                    onChange={handleBrandChange}>
                    <option>Please Select</option>
                    {brands.length > 0 && brands
                        .map((c) => (
                            <option key={c._id} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                </select>
            </div>


            <button disabled={loading} className="btn btn-outline-info">Save</button>
        </form>
    );
}
export default ProductUpdateForm