import React from 'react'
import { Menu, Slider } from 'antd'
import { DollarOutlined, DownSquareOutlined, StarOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

const Filter = ({
    price, handleSlider, showCategories, showStars, showSubs, showBrands
}) => {
    return (
        <>
            <Menu
                defaultOpenKeys={["1", "2", '3', "4", '5']}
                mode="inline">
                {/* Price */}
                <SubMenu key="1"
                    title={
                        <span className="h6">
                            <DollarOutlined /> Price
                        </span>
                    }>
                    <div style={{ marginTop: "10px" }} >
                        <Slider className="ml-4 mr-4"
                            tipFormatter={(v) => `${v.toLocaleString('ja-JP', { style: 'currency', currency: 'BIF' })}`}
                            range value={price}
                            onChange={handleSlider}
                            max="1000000" />
                    </div>
                </SubMenu>

                {/* category */}
                <SubMenu key="2"
                    title={
                        <span className="h6">
                            <DownSquareOutlined /> Categories
                        </span>
                    }>
                    <div style={{ marginTop: "10px" }} >
                        {showCategories()}
                    </div>
                </SubMenu>

                {/* stars */}
                <SubMenu key="3"
                    title={
                        <span className="h6">
                            <StarOutlined /> Rating
                        </span>
                    }>
                    <div style={{ marginTop: "10px" }} >
                        {showStars()}
                    </div>
                </SubMenu>

                {/* sub category */}
                <SubMenu key="4"
                    title={
                        <span className="h6">
                            <DownSquareOutlined /> Sub Categories
                        </span>
                    }>
                    <div style={{ marginTop: "10px" }}
                        className="pl-4 pr-4" >
                        {showSubs()}
                    </div>
                </SubMenu>

                {/* brand */}
                <SubMenu key="5"
                    title={
                        <span className="h6">
                            <DownSquareOutlined /> Brands
                        </span>
                    }>
                    <div style={{ marginTop: "10px" }}
                        className="pl-4 pr-4" >
                        {showBrands()}
                    </div>
                </SubMenu>
            </Menu>
        </>
    )
}

export default Filter
