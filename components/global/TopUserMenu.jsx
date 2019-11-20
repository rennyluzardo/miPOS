import { useState } from 'react'
import { Menu, Icon, Divider, Button } from 'antd'

const TopUserMenu = () => {
    return (
        <ul className="top-user-menu">
            <li key="username">
                <Icon type="mail" /> <span>Renny</span>
            </li>
            <li className="custom-divider">
                <Divider type="vertical" />
            </li>
            <li className="top-user-menu__btn-top-hide"  key="hideBar">
                <span>ocultar</span> <div className="top-user-menu__btn-top-hide--arrow-hide-container">
                    <Button type="primary" shape="circle">
                        <Icon type="up" className="up-icon" />
                    </Button></div>
            </li>
        </ul>
    )
}

export default TopUserMenu