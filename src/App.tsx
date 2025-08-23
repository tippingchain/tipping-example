import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThirdwebProvider } from 'thirdweb/react'
import { Layout, ErrorBoundary } from './components'
import { HomePage, StreamingPage, AdminPage } from './pages'
import { useSDK } from './hooks'
import { ENV } from './utils/constants'
import './App.css'

// Main App Component
const App = () => {
  return (
    <ThirdwebProvider clientId={ENV.THIRDWEB_CLIENT_ID}>
      <ErrorBoundary>
        <Router>
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
    </ThirdwebProvider>
  )
}

export default App
