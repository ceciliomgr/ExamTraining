import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import ExamTraining from './pages/ExamTraining'
import './App.css'

const TechLogo = () => (
  <svg className="logo-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="url(#logo-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 17L12 22L22 17" stroke="url(#logo-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 12L12 17L22 12" stroke="url(#logo-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="logo-grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#646cff"/>
        <stop offset="1" stopColor="#bd34fe"/>
      </linearGradient>
    </defs>
  </svg>
)

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="main-nav">
          <div className="nav-container">
            <Link to="/" className="nav-logo">
              <TechLogo />
              ExamTraining
            </Link>
            <div className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/training">Start Training</Link>
            </div>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/training" element={<ExamTraining />} />
          </Routes>
        </main>

        <footer className="main-footer">
          <div className="footer-content">
            <div className="footer-brand">
              <p>&copy; 2026 ExamTraining. Built by <a href="https://github.com/ceciliomgr" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', fontWeight: 'bold' }}>ceciliomgr</a></p>
            </div>
            <div className="footer-status">
              <span className="status-dot"></span>
              ALL_SYSTEMS_NOMINAL
            </div>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App
