import App from 'next/app'
import StoreProvider from '../config/store'
import '../scss/styles.scss'

class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}
        return {
            pageProps
        }
    }

    render() {
        const { Component, router, pageProps } = this.props

        return (
            <StoreProvider>
                <Component {...pageProps} router={router} />
            </StoreProvider>
        )
    }
}

export default MyApp
