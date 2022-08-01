import 'bootstrap/dist/css/bootstrap.min.css'
import 'antd/dist/antd.css'
import '../public/css/styles.css'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import TopNav from '../components/TopNav'
import { Provider } from '../context'

function MyApp({Component, pageProps}) {
    return (
        <Provider>
            <TopNav />
            <Component {...pageProps} />
            <ToastContainer position="top-center" />
        </Provider>
    )
}

export default MyApp