import { useState } from 'react'
import { Menu, Icon } from 'antd'
import images from '../../lib/images'

const TopMenuBar = () => {
    const [selectedMenu, selectMenu] = useState('orders')

    console.log(selectedMenu)

    return (
        <Menu
            mode="horizontal"
            defaultSelectedKeys={[selectedMenu]}
            className="custom-menu-horizontal">
            <Menu.Item
                key="orders"
                onClick={() => selectMenu('orders')}>
                <div className={selectedMenu === 'orders' ? 'icon' : null}><img src={images.topMenu.ico1} alt="" /></div>
                {selectedMenu === 'orders' && ' Ordenes'}
            </Menu.Item>
            <Menu.Item
                key="Menu2"
                onClick={() => selectMenu('Menu2')}>
                <div className={selectedMenu === 'Menu2' ? 'icon' : null}><img src={images.topMenu.ico2} alt="" /></div>
                {selectedMenu === 'Menu2' && ' Menu2'}
            </Menu.Item>
            <Menu.Item
                key="Menu3"
                onClick={() => selectMenu('Menu3')}>
                <div className={selectedMenu === 'Menu3' ? 'icon' : null}><img src={images.topMenu.ico3} alt="" /></div>
                {selectedMenu === 'Menu3' && ' Menu3'}
            </Menu.Item>
            <Menu.Item
                key="Menu4"
                onClick={() => selectMenu('Menu4')}>
                <div className={selectedMenu === 'Menu4' ? 'icon' : null}><img src={images.topMenu.ico4} alt="" /></div>
                {selectedMenu === 'Menu4' && ' Menu4'}
            </Menu.Item>
            <Menu.Item
                key="Menu5"
                onClick={() => selectMenu('Menu5')}>
                <div className={selectedMenu === 'Menu5' ? 'icon' : null}><img src={images.topMenu.ico5} alt="" /></div>
                {selectedMenu === 'Menu5' && ' Menu5'}
            </Menu.Item>
            <Menu.Item
                key="Menu6"
                onClick={() => selectMenu('Menu6')}>
                <div className={selectedMenu === 'Menu6' ? 'icon' : null}><img src={images.topMenu.ico6} alt="" /></div>
                {selectedMenu === 'Menu6' && ' Menu6'}
            </Menu.Item>
        </Menu>
    )
}

export default TopMenuBar