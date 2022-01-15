import Layout from '../components/layout/layout'
import Notification from '../components/ui/notification'
import { NotificationContextProvider } from '../store/notification-context'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Component {...pageProps} />
        <Notification title='Test' message='Testing man' status='pending'/>
      </Layout>
    </NotificationContextProvider>
  )
}

export default MyApp
