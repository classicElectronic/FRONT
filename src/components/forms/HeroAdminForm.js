import React from 'react'
import HeroImageUpload from './HeroImageUpload'
import { Button } from 'antd'

const HeroAdminForm = ({ handleSubmit, handleChange, setValues, setLoading, values, loading }) => {
    const { slogan, buttonInfo, color } = values
    return (
        <div className='col'>
            <form onSubmit={handleSubmit}>
                <div className='form-group '>
                    <label>Text Slogan</label>
                    <input
                        disabled={loading} name='slogan' onChange={handleChange}
                        value={slogan} type='text' className='form-control' />
                </div>
                <div className='form-group mt-4'>
                    <label>Button info</label>
                    <input disabled={loading} name='buttonInfo' onChange={handleChange}
                        value={buttonInfo} type='text' className='form-control' />
                </div>
                <div className='form-group mt-4'>
                    <label>Background Color</label>
                    <input disabled={loading} name='color' onChange={handleChange}
                        value={color} placeholder='enter background color start with #, example: #fff'
                        type='text' className='form-control' />
                </div>

                <div className='form-group mt-4'>
                    <HeroImageUpload values={values} setValues={setValues}
                        setLoading={setLoading} loading={loading} />
                </div>

                <div className='form-group mt-4'>
                    <Button disabled={loading} type='primary' onClick={handleSubmit}> SAVE</Button>
                </div>
            </form>

        </div>
    )
}

export default HeroAdminForm
