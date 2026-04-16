import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { TransitionProvider } from './context/TransitionContext'
import PortfolioPage from './pages/PortfolioPage'
import CaseStudyPage from './pages/CaseStudyPage'

export default function App() {
  return (
    <BrowserRouter>
      <TransitionProvider>
        <Routes>
          <Route path="/" element={<PortfolioPage />} />
          <Route path="/case/:id" element={<CaseStudyPage />} />
        </Routes>
      </TransitionProvider>
    </BrowserRouter>
  )
}
