import { Button } from 'antd'

const MotiveSelector = () => {
    return (
        <div className="motive-selector">
            <Button className="motive-selector--1 off">Sin</Button>
            <Button className="motive-selector--2 on">Con</Button>
            <Button className="motive-selector--3 off">Poco</Button>
            <Button className="motive-selector--4 off">Aparte</Button>
        </div>
    )
}

export default MotiveSelector