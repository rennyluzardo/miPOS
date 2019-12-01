import { useState } from 'react'
import { Icon } from 'antd'

const LogoFloatTop = props => {
    const [hover, setHover] = useState(false)

    return (
        <div className={`logo-float-visible ${props.hide ? 'logo-float-hide' : ''}`}>
            <div className="logo-float-bg"
                onMouseOver={() => setHover(true)}
                onMouseLeave={() => setHover(false)}>
                <img src="static/images/logo/miPOS-Circle.png" alt="" />
                <span
                    className={`logo-float-text ${hover ? 'show-logo-float-text' : ''}`}
                    onClick={props.onHideTopBar}>mostrar</span>
            </div>
        </div>
    )
}

export default LogoFloatTop