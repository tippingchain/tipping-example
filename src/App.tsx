import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThirdwebProvider } from 'thirdweb/react'
import { createThirdwebClient } from 'thirdweb'
import { NotificationProvider } from '@tippingchain/ui-react'
import { Layout, ErrorBoundary } from './components'
import { HomePage, StreamingPage, AdminPage } from './pages'
import { ENV } from './utils/constants'
import './App.css'

// Create ThirdWeb client
const client = createThirdwebClient({
  clientId: ENV.THIRDWEB_CLIENT_ID,
})

// Main App Component
const App = () => {
  return (
    <ThirdwebProvider client={client}>
      <NotificationProvider>
        <ErrorBoundary>
          <Router basename="/tipping-example">
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/streaming" element={<StreamingPage />} />
                <Route path="/admin" element={<AdminPage />} />
                {/* Add more routes as needed */}
                <Route path="*" element={<HomePage />} />
              </Routes>
            </Layout>
          </Router>
        </ErrorBoundary>
      </NotificationProvider>
    </ThirdwebProvider>
  )
}

export default App
