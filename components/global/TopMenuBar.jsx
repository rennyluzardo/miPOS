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
                key="Menu2"
                onClick={() => selectMenu('Menu2')}>
                <Icon type="mail" />
                {selectedMenu === 'Menu2' && ' Menu2'}
            </Menu.Item>
            <Menu.Item
                key="Menu3"
                onClick={() => selectMenu('Menu3')}>
                <Icon type="mail" />
                {selectedMenu === 'Menu3' && ' Menu3'}
            </Menu.Item>
            <Menu.Item key="etc" onClick={() => selectMenu('Menu4')}>
                <Icon type="mail" />
            </Menu.Item>
            <Menu.Item key="etc" onClick={() => selectMenu('Menu5')}>
                <Icon type="mail" />
            </Menu.Item>
            <Menu.Item key="etc" onClick={() => selectMenu('Menu6')}>
                <Icon type="mail" />
            </Menu.Item>
        </Menu>
    )
}

export default TopMenuBar