import { useState } from 'react'
import { Menu, Icon } from 'antd'
import images from '../../lib/images'

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
                <img src={images.topMenu.ico1} alt="" />
                {selectedMenu === 'orders' && ' Ordenes'}
            </Menu.Item>
            <Menu.Item
                key="Menu2"
                onClick={() => selectMenu('Menu2')}>
                <img src={images.topMenu.ico2} alt="" />
                {selectedMenu === 'Menu2' && ' Menu2'}
            </Menu.Item>
            <Menu.Item
                key="Menu3"
                onClick={() => selectMenu('Menu3')}>
                <img src={images.topMenu.ico3} alt="" />
                {selectedMenu === 'Menu3' && ' Menu3'}
            </Menu.Item>
            <Menu.Item
                key="Menu4"
                onClick={() => selectMenu('Menu4')}>
                <img src={images.topMenu.ico4} alt="" />
                {selectedMenu === 'Menu4' && ' Menu4'}
            </Menu.Item>
            <Menu.Item
                key="Menu5"
                onClick={() => selectMenu('Menu5')}>
                <img src={images.topMenu.ico5} alt="" />
                {selectedMenu === 'Menu5' && ' Menu5'}
            </Menu.Item>
            <Menu.Item
                key="Menu6"
                onClick={() => selectMenu('Menu6')}>
                <img src={images.topMenu.ico6} alt="" />
                {selectedMenu === 'Menu6' && ' Menu6'}
            </Menu.Item>
        </Menu>
    )
}

export default TopMenuBar