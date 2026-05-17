import { Link } from 'react-router-dom'

const GithubIcon = () => (
  <svg className="icon-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.477 2 2 6.477 2 12C2 16.417 4.867 20.162 8.836 21.488C9.336 21.572 9.519 21.272 9.519 21.006C9.519 20.772 9.511 20.15 9.507 19.325C6.725 19.929 6.139 17.983 6.139 17.983C5.685 16.832 5.03 16.525 5.03 16.525C4.122 15.906 5.099 15.918 5.099 15.918C6.103 15.989 6.63 16.949 6.63 16.949C7.522 18.477 8.971 18.035 9.541 17.779C9.632 17.133 9.891 16.691 10.177 16.441C7.956 16.189 5.621 15.33 5.621 11.498C5.621 10.407 6.011 9.514 6.65 8.815C6.547 8.562 6.204 7.545 6.748 6.175C6.748 6.175 7.587 5.906 9.5 7.2C10.297 6.644 11.154 6.368 12 6.364C12.846 6.368 13.703 6.644 14.5 7.2C16.412 5.906 17.25 6.175 17.25 6.175C17.796 7.545 17.453 8.562 17.35 8.815C17.99 9.514 18.378 10.407 18.378 11.498C18.378 15.339 16.04 16.186 13.813 16.433C14.171 16.641 14.49 17.051 14.49 17.678C14.49 18.577 14.482 19.301 14.482 19.519C14.482 19.789 14.662 20.103 15.168 20.005C19.131 18.675 22 14.925 22 12C22 6.477 17.523 2 12 2Z" fill="currentColor"/>
  </svg>
)

function Home() {
  return (
    <div className="container">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Master Your Skills with <span className="gradient-text">ExamTraining</span>
          </h1>
          <p className="hero-description">
            The ultimate platform to practice and validate your technical knowledge. 
            Upload your custom question sets and start training instantly.
          </p>
          <div className="hero-actions">
            <Link to="/training" className="btn btn-brand">Start Training Now</Link>
            <a href="https://github.com/ceciliomgr/ExamTraining" target="_blank" rel="noopener noreferrer" className="btn btn-alt">
              <GithubIcon />
              View on GitHub
            </a>
          </div>
          
          <div className="bio-card">
            <p>Built with passion by <strong>ceciliomgr</strong></p>
            <div className="bio-links">
               <a href="https://github.com/ceciliomgr" target="_blank" rel="noopener noreferrer">@ceciliomgr</a>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-background"></div>
          <div className="card floating-card">
             <div className="card-icon">JSON</div>
             <h3>Dynamic Assessments</h3>
             <p>Fully driven by your own data. No databases, no restrictions.</p>
          </div>
        </div>
      </section>

      <section className="features-grid">
        <div className="card feature">
          <h3>Drag & Drop</h3>
          <p>Seamlessly upload your JSON files to begin any examination.</p>
        </div>
        <div className="card feature">
          <h3>Real-time Feedback</h3>
          <p>Optional explanations per question to help you learn as you go.</p>
        </div>
        <div className="card feature">
          <h3>Reshuffle Logic</h3>
          <p>Instantly mix your question pool for a fresh attempt every time.</p>
        </div>
      </section>

      <style>{`
        .hero {
          display: flex;
          align-items: center;
          gap: var(--spacing-4xl);
          margin-bottom: var(--spacing-4xl);
          min-height: 70vh;
        }
        .hero-content { flex: 1.2; }
        .hero-title { font-size: 4rem; line-height: 1.1; margin-bottom: var(--spacing-lg); }
        .hero-description { font-size: 1.25rem; color: var(--vp-c-text-2); margin-bottom: var(--spacing-2xl); max-width: 600px; }
        .hero-actions { display: flex; gap: var(--spacing-md); align-items: center; margin-bottom: var(--spacing-3xl); }
        .hero-actions .btn { display: flex; align-items: center; gap: 8px; padding: 12px 24px; font-size: 1rem; }
        
        .bio-card { 
          padding: var(--spacing-lg); 
          background: rgba(255, 255, 255, 0.03); 
          border-radius: 12px; 
          border: 1px solid var(--border-color);
          display: inline-block;
        }
        .bio-card p { font-size: 14px; color: var(--vp-c-text-2); margin-bottom: 4px; }
        .bio-links a { font-size: 14px; color: var(--vp-c-brand); text-decoration: none; font-weight: 600; }

        .hero-visual {
          flex: 1;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .visual-background {
          position: absolute;
          width: 120%;
          height: 120%;
          background: var(--vp-home-hero-image-background-image);
          filter: var(--vp-home-hero-image-filter);
          opacity: 0.2;
          z-index: -1;
        }
        .floating-card {
          padding: var(--spacing-2xl);
          animation: float 6s ease-in-out infinite;
          text-align: center;
        }
        .card-icon { 
          font-size: 2rem; font-weight: 800; color: var(--vp-c-brand); 
          margin-bottom: var(--spacing-md); background: var(--vp-c-bg-mute);
          width: 80px; height: 80px; line-height: 80px; border-radius: 50%;
          margin: 0 auto var(--spacing-md);
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--spacing-xl);
          margin-top: var(--spacing-4xl);
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        @media (max-width: 1024px) {
          .hero { flex-direction: column; text-align: center; }
          .hero-description { margin: 0 auto var(--spacing-2xl); }
          .hero-actions { justify-content: center; }
          .features-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  )
}

export default Home