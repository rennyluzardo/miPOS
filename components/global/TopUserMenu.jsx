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

const TopUserMenu = () => {
    return (
        <ul className="top-user-menu">
            <li className="top-user-menu__username" key="username">
                <div className="username-box">
                    <div className="username-box__1"><img src="static/svg/user-icon.svg" alt="" /></div>
                    <div className="username-box__2">
                        <Dropdown overlay={menu} trigger={['click']}>
                            <a className="ant-dropdown-link username-box__2--dropdown" href="#">
                                <span>Renny</span> <Icon type="down" />
                            </a>
                        </Dropdown>
                    </div>
                </div>

            </li>
            <li className="custom-divider">
                <Divider type="vertical" />
            </li>
            <li className="top-user-menu__btn-top-hide" key="hideBar">
                <span>ocultar</span> <div className="top-user-menu__btn-top-hide--arrow-hide-container">
                    <Button type="primary" shape="circle">
                        <Icon type="up" className="up-icon" />
                    </Button>
                </div>
            </li>
        </ul>
    )
}

export default TopUserMenu