import { useState } from 'react'
import { Menu, Icon } from 'antd'

const TopMenuBar = () => {
    const [selectedMenu, selectMenu] = useState('orders')

    return (
        <Menu
            mode="horizontal"
            defaultSelectedKeys={[selectedMenu]}
            className="custom-menu-horizontal">
            <Menu.Item
                key="orders"
                onClick={() => selectMenu('orders')}>
                <Icon type="mail" />
                {selectedMenu === 'orders' && ' Ordenes'}
            </Menu.Item>
            <Menu.Item
                key="restaurants"
                onClick={() => selectMenu('restaurants')}>
                <Icon type="mail" />
            </Menu.Item>
            <Menu.Item key="etc">
                <Icon type="mail" />
            </Menu.Item>
        </Menu>
    )
}

export default TopMenuBar