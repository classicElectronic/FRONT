import React from 'react';

const CategoryForm = ({ handleSubmit, name, handleChange, loading }) => {


    return (
        <form onSubmit={handleSubmit} >
            <div className="form-group">
                <label>Name</label>
                <input type="text" disabled={loading} name='name' className="form-control"
                    value={name} onChange={handleChange} autoFocus required />
                <br />
                <button disabled={loading} className="btn btn-outline-primary">Save</button>
            </div>
        </form >
    )
}

export default CategoryForm;