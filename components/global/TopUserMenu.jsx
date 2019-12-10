// import { useState } from 'react'
import { Menu, Dropdown, Icon, Divider, Button } from 'antd'

const menu = (
    <Menu>
        <Menu.Item key="0">
            <a href="#">1st menu item</a>
        </Menu.Item>
        <Menu.Item key="1">
            <a href="#">2nd menu item</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3">3rd menu item</Menu.Item>
    </Menu>
)

const TopUserMenu = props => {
    return (
        <ul className="top-user-menu">
            <li className="top-user-menu__btn-top-hide" key="hideBar">
                <div className="top-user-menu__btn-top-hide--arrow-hide-container">
                    <Button type="primary" shape="circle" className="btn-confirm">
                        <img src="static/images/top-bar-menu/miPOS-Shop_phone.svg" alt=""/>
                    </Button>
                </div> <span>Delivery</span>
            </li>
            <li className="custom-divider">
                <Divider type="vertical" />
            </li>
            <li className="top-user-menu__username" key="username">
                <div className="username-box">
                    <div className="username-box__1">
                        <img src="static/svg/user-icon.svg" alt="" />
                        <Dropdown overlay={menu} trigger={['click']}>
                            <a className="ant-dropdown-link username-box__1--dropdown" href="#">
                                <Icon type="down" />
                            </a>
                        </Dropdown>
                    </div>
                    <div className="username-box__2">
                        <Button type="primary" shape="circle" onClick={props.onHideTopBar}>
                            <Icon type="up" className="up-icon" />
                        </Button>
                    </div>
                </div>

            </li>
        </ul>
    )
}

export default TopUserMenu