import { Layout } from 'antd'
// Components
import Head from '../global/Header'

const CreateOrderLayout = props => {
    return (
        <Layout>
            <Head goToHome={props.goToHome} />
            {props.children}
        </Layout>
    )
}

export default CreateOrderLayout