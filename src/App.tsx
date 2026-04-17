import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { TransitionProvider } from './context/TransitionContext'
import PortfolioPage from './pages/PortfolioPage'

const CaseStudyPage = lazy(() => import('./pages/CaseStudyPage'))

export default function App() {
  return (
    <BrowserRouter>
      <TransitionProvider>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<PortfolioPage />} />
            <Route path="/case/:id" element={<CaseStudyPage />} />
          </Routes>
        </Suspense>
      </TransitionProvider>
    </BrowserRouter>
  )
}
