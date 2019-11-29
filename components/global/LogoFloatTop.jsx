import { Icon } from 'antd'

const LogoFloatTop = props => {
    return (
        <div className={`logo-float-visible ${props.hide ? 'logo-float-hide' : ''}`} onClick={props.onHideTopBar}>
            <img src="static/images/logo/miPOS-Circle.png" alt=""/>
        </div>
    )
}

export default LogoFloatTop