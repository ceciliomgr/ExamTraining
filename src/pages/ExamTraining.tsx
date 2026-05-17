import { useState, ChangeEvent } from 'react'
import { Link } from 'react-router-dom'

interface Question {
  id: number
  text: string
  options: string[]
  correctAnswer: number
  explanation?: string
}

function ExamTraining() {
  const [allQuestionsPool, setAllQuestionsPool] = useState<Question[]>([])
  const [examQuestions, setExamQuestions] = useState<Question[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [isFinished, setIsFinished] = useState(false)
  const [score, setScore] = useState(0)
  const [isWaitingForFile, setIsWaitingForFile] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const [isConfiguringExam, setIsConfiguringExam] = useState(false)
  const [questionCount, setQuestionCount] = useState(10)
  const [showExplanations, setShowExplanations] = useState(true)
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const processFile = (file: File) => {
    if (file.type !== 'application/json' && !file.name.endsWith('.json')) {
      setError("Please upload a valid JSON file.")
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string)
        if (Array.isArray(json)) {
          const isValid = json.every(q => 
            typeof q.id === 'number' &&
            typeof q.text === 'string' &&
            Array.isArray(q.options) &&
            typeof q.correctAnswer === 'number'
          )

          if (isValid) {
            setAllQuestionsPool(json)
            setQuestionCount(Math.min(json.length, 10))
            setIsWaitingForFile(false)
            setIsConfiguringExam(true)
            setError(null)
          } else {
            setError("Invalid JSON format. Please ensure all questions have id, text, options (array), and correctAnswer (number).")
          }
        } else {
          setError("JSON must be an array of questions.")
        }
      } catch (err) {
        setError("Error parsing JSON file. Please check the file format.")
      }
    }
    reader.readAsText(file)
  }

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) processFile(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) processFile(file)
  }

  const startExam = () => {
    const shuffled = [...allQuestionsPool].sort(() => 0.5 - Math.random())
    setExamQuestions(shuffled.slice(0, questionCount))
    setIsConfiguringExam(false)
    setCurrentStep(0)
    setAnswers({})
    setScore(0)
    setIsFinished(false)
    setIsConfirmed(false)
  }

  const handleAnswer = (optionIndex: number) => {
    if (isConfirmed && showExplanations) return
    setAnswers({ ...answers, [currentStep]: optionIndex })
  }

  const nextStep = () => {
    if (currentStep < examQuestions.length - 1) {
      setCurrentStep(currentStep + 1)
      setIsConfirmed(false)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      setIsConfirmed(showExplanations) 
    }
  }

  const submitExam = () => {
    let finalScore = 0
    examQuestions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) {
        finalScore++
      }
    })
    setScore(finalScore)
    setIsFinished(true)
  }

  if (isWaitingForFile) {
    return (
      <div className="container">
        <div className="card upload-card">
          <h1 className="hero-title"><span className="gradient-text">Exam Training</span></h1>
          <p className="hero-description">
            Upload a JSON file containing your questions to begin the training.
          </p>
          
          <div 
            className={`upload-zone ${isDragging ? 'is-dragging' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input 
              type="file" 
              accept=".json" 
              onChange={handleFileUpload} 
              id="file-upload"
              className="file-input"
            />
            <label htmlFor="file-upload" className="btn btn-brand">Select or Drag JSON File</label>
            {error && <p className="error-message">{error}</p>}
          </div>

          <div className="format-hint">
            <h3>Expected Format:</h3>
            <pre>
{`[
  {
    "id": 1,
    "text": "Question text here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": 0,
    "explanation": "Why this answer is correct..."
  }
]`}
            </pre>
          </div>
        </div>
        <style>{`
          .upload-card { text-align: center; max-width: 600px; margin: 0 auto; padding: var(--spacing-3xl); }
          .upload-zone { 
            margin: var(--spacing-2xl) 0; 
            padding: var(--spacing-2xl);
            border: 2px dashed var(--border-color);
            border-radius: 12px;
            transition: all 0.3s ease;
            background: rgba(255, 255, 255, 0.02);
          }
          .upload-zone.is-dragging {
            border-color: var(--vp-c-brand);
            background: rgba(100, 108, 255, 0.1);
            transform: scale(1.02);
          }
          .file-input { display: none; }
          .error-message { color: #ff3e00; margin-top: var(--spacing-md); font-weight: 600; }
          .format-hint { text-align: left; margin-top: var(--spacing-2xl); background: var(--vp-c-bg-mute); padding: var(--spacing-lg); border-radius: 8px; }
          .format-hint h3 { font-size: 14px; margin-bottom: var(--spacing-sm); color: var(--vp-c-text-2); }
          .format-hint pre { font-size: 12px; color: var(--vp-c-brand); overflow-x: auto; }
        `}</style>
      </div>
    )
  }

  if (isConfiguringExam) {
    return (
      <div className="container">
        <div className="card config-card">
          <h1 className="hero-title"><span className="gradient-text">Configuration</span></h1>
          <p className="hero-description">
            Total questions available: {allQuestionsPool.length}. <br/>
            Configure your training settings below.
          </p>

          <div className="config-controls">
            <div className="input-group">
              <label htmlFor="q-count">Number of Questions:</label>
              <input 
                type="number" 
                id="q-count" 
                min="1" 
                max={allQuestionsPool.length} 
                value={questionCount}
                onChange={(e) => setQuestionCount(Math.max(1, Math.min(allQuestionsPool.length, parseInt(e.target.value) || 1)))}
                className="number-input"
              />
            </div>

            <div className="input-group toggle-group">
              <label className="toggle-label">
                <input 
                  type="checkbox" 
                  checked={showExplanations}
                  onChange={(e) => setShowExplanations(e.target.checked)}
                />
                <span className="toggle-text">Show explanations per question</span>
              </label>
            </div>

            <div className="config-actions">
              <button className="btn btn-brand" onClick={startExam}>Start Training</button>
              <button className="btn btn-alt" onClick={() => setIsWaitingForFile(true)}>Upload Different File</button>
            </div>
          </div>
        </div>
        <style>{`
          .config-card { text-align: center; max-width: 600px; margin: 0 auto; padding: var(--spacing-3xl); }
          .config-controls { margin-top: var(--spacing-2xl); }
          .input-group { margin-bottom: var(--spacing-xl); display: flex; flex-direction: column; align-items: center; gap: var(--spacing-sm); }
          .input-group label { font-weight: 600; color: var(--vp-c-text-2); }
          .number-input { 
            background: var(--vp-c-bg-mute); border: 1px solid var(--border-color); 
            color: var(--vp-c-text-1); padding: var(--spacing-sm) var(--spacing-md); 
            border-radius: 8px; font-size: 1.2rem; width: 100px; text-align: center;
          }
          .toggle-group { flex-direction: row; justify-content: center; align-items: center; gap: 12px; }
          .toggle-label { display: flex; align-items: center; gap: 10px; cursor: pointer; }
          .toggle-text { font-size: 15px; color: var(--vp-c-text-1); }
          .config-actions { display: flex; gap: var(--spacing-md); justify-content: center; }
        `}</style>
      </div>
    )
  }

  if (isFinished) {
    return (
      <div className="container">
        <div className="card result-card">
          <h1 className="hero-title"><span className="gradient-text">Training Results</span></h1>
          <div className="score-display">
            <span className="score-number">{score}</span>
            <span className="score-total">/ {examQuestions.length}</span>
          </div>
          <p className="hero-description">
            {score / examQuestions.length >= 0.8 ? "Great job! You have demonstrated good knowledge." : "Keep practicing! Review the explanations below and try again."}
          </p>
          <div className="result-actions">
            <button className="btn btn-brand" onClick={startExam}>Retake Same Training</button>
            <button className="btn btn-alt" onClick={() => {
              setIsWaitingForFile(true)
              setExamQuestions([])
              setCurrentStep(0)
              setAnswers({})
              setIsFinished(false)
              setScore(0)
            }}>Upload New File</button>
            <Link to="/" className="btn btn-alt">Back to Home</Link>
          </div>
        </div>

        <div className="review-section">
          <h2 className="review-title">Detailed Review</h2>
          <div className="review-list">
            {examQuestions.map((q, idx) => {
              const userAnswer = answers[idx];
              const isCorrect = userAnswer === q.correctAnswer;
              
              return (
                <div key={idx} className={`review-item ${isCorrect ? 'correct' : 'incorrect'}`}>
                  <div className="review-header">
                    <span className="review-number">Question {idx + 1}</span>
                    <span className={`review-status ${isCorrect ? 'status-correct' : 'status-incorrect'}`}>
                      {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                    </span>
                  </div>
                  <h3 className="review-question">{q.text}</h3>
                  <div className="review-answers">
                    <p className="answer-line">
                      <strong>Your Answer:</strong> <span className={isCorrect ? 'text-correct' : 'text-incorrect'}>
                        {q.options[userAnswer] || "No answer"}
                      </span>
                    </p>
                    {!isCorrect && (
                      <p className="answer-line">
                        <strong>Correct Answer:</strong> <span className="text-correct">{q.options[q.correctAnswer]}</span>
                      </p>
                    )}
                  </div>
                  {q.explanation && (
                    <div className="review-explanation">
                      <strong>Explanation:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <style>{`
          .result-card { text-align: center; padding: var(--spacing-4xl); border-color: var(--vp-c-brand); margin-bottom: var(--spacing-3xl); }
          .score-display { margin: var(--spacing-xl) 0; font-size: 4rem; font-weight: 800; }
          .score-total { font-size: 1.5rem; color: var(--vp-c-text-3); }
          .result-actions { display: flex; gap: var(--spacing-md); justify-content: center; margin-top: var(--spacing-2xl); }
          
          .review-section { max-width: 800px; margin: 0 auto; padding-bottom: var(--spacing-4xl); }
          .review-title { font-size: 2rem; margin-bottom: var(--spacing-2xl); text-align: center; }
          .review-list { display: flex; flex-direction: column; gap: var(--spacing-lg); }
          .review-item { 
            background: var(--vp-c-bg-soft); 
            border: 1px solid var(--border-color); 
            border-radius: 12px; 
            padding: var(--spacing-xl);
            border-left: 4px solid transparent;
          }
          .review-item.correct { border-left-color: #42d392; }
          .review-item.incorrect { border-left-color: #ff3e00; }
          
          .review-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-md); }
          .review-number { font-size: 12px; font-weight: 700; color: var(--vp-c-text-3); text-transform: uppercase; }
          .review-status { font-size: 14px; font-weight: 700; }
          .status-correct { color: #42d392; }
          .status-incorrect { color: #ff3e00; }
          
          .review-question { font-size: 1.25rem; margin-bottom: var(--spacing-lg); line-height: 1.4; }
          .review-answers { margin-bottom: var(--spacing-md); padding-bottom: var(--spacing-md); border-bottom: 1px solid var(--border-color); }
          .answer-line { font-size: 15px; margin-bottom: 4px; }
          
          .text-correct { color: #42d392; font-weight: 600; }
          .text-incorrect { color: #ff3e00; font-weight: 600; }
          
          .review-explanation { font-size: 14px; color: var(--vp-c-text-2); line-height: 1.6; }
        `}</style>
      </div>
    )
  }

  const currentQ = examQuestions[currentStep]
  const progress = ((currentStep + 1) / examQuestions.length) * 100
  const isAnswered = answers[currentStep] !== undefined
  const showExplanationNow = showExplanations && isConfirmed

  return (
    <div className="container">
      <div className="exam-layout">
        <header className="exam-header">
          <div className="header-top">
            <div className="progress-info">
              <span className="step-count">Question {currentStep + 1} of {examQuestions.length}</span>
              <span className="percentage">{Math.round(progress)}% Complete</span>
            </div>
            <button className="btn btn-alt btn-sm" onClick={startExam}>Reshuffle Questions</button>
          </div>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </header>

        <div className="card question-card">
          <h2 className="question-text">{currentQ.text}</h2>
          <div className="options-grid">
            {currentQ.options.map((option, idx) => (
              <button
                key={idx}
                className={`option-btn ${answers[currentStep] === idx ? 'selected' : ''}`}
                onClick={() => handleAnswer(idx)}
                disabled={isConfirmed && showExplanations}
              >
                <span className="option-letter">{String.fromCharCode(65 + idx)}</span>
                <span className="option-text">{option}</span>
              </button>
            ))}
          </div>

          {showExplanationNow && currentQ.explanation && (
            <div className="explanation-box">
              <h4 className="explanation-title">Explanation:</h4>
              <p className="explanation-text">{currentQ.explanation}</p>
            </div>
          )}
        </div>

        <footer className="exam-footer">
          <button className="btn btn-alt" onClick={prevStep} disabled={currentStep === 0}>Previous</button>
          
          {showExplanations && !isConfirmed ? (
            <button 
              className="btn btn-brand" 
              onClick={() => setIsConfirmed(true)} 
              disabled={!isAnswered}
            >
              Check Answer
            </button>
          ) : (
            <>
              {currentStep === examQuestions.length - 1 ? (
                <button className="btn btn-brand" onClick={submitExam} disabled={Object.keys(answers).length < examQuestions.length}>Submit Exam</button>
              ) : (
                <button className="btn btn-brand" onClick={nextStep} disabled={!isAnswered}>Next Question</button>
              )}
            </>
          )}
        </footer>
      </div>

      <style>{`
        .exam-layout { max-width: 800px; margin: 0 auto; }
        .exam-header { margin-bottom: var(--spacing-2xl); }
        .header-top { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: var(--spacing-sm); }
        .progress-info { display: flex; flex-direction: column; gap: 4px; font-size: 14px; font-weight: 600; color: var(--vp-c-text-2); }
        .btn-sm { padding: 4px 12px; font-size: 12px; }
        .progress-bar-bg { width: 100%; height: 6px; background: var(--vp-c-bg-mute); border-radius: 3px; overflow: hidden; }
        .progress-bar-fill { height: 100%; background: var(--vp-c-brand); transition: width 0.3s ease; }
        
        .question-card { margin-bottom: var(--spacing-2xl); border-left: 4px solid var(--vp-c-brand); }
        .question-text { font-size: 1.5rem; margin-bottom: var(--spacing-2xl); line-height: 1.4; color: var(--vp-c-text-1); }
        
        .options-grid { display: flex; flex-direction: column; gap: var(--spacing-md); }
        .option-btn {
          display: flex; align-items: center; gap: var(--spacing-md);
          padding: var(--spacing-lg); background: var(--vp-c-bg);
          border: 1px solid var(--border-color); border-radius: 8px;
          color: var(--vp-c-text-1); cursor: pointer; text-align: left;
          transition: all 0.2s;
        }
        .option-btn:hover:not(:disabled) { border-color: var(--vp-c-brand); background: var(--vp-c-bg-mute); }
        .option-btn.selected { border-color: var(--vp-c-brand); background: rgba(100, 108, 255, 0.1); box-shadow: 0 0 15px rgba(100, 108, 255, 0.1); }
        .option-btn:disabled { cursor: default; }
        
        .option-letter {
          width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;
          background: var(--vp-c-bg-mute); border-radius: 4px; font-weight: 700; font-size: 14px;
        }
        .option-btn.selected .option-letter { background: var(--vp-c-brand); color: white; }
        
        .explanation-box { margin-top: var(--spacing-2xl); padding: var(--spacing-lg); background: rgba(100, 108, 255, 0.05); border-radius: 8px; border: 1px dashed var(--vp-c-brand); }
        .explanation-title { font-size: 14px; font-weight: 700; color: var(--vp-c-brand); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em; }
        .explanation-text { font-size: 15px; color: var(--vp-c-text-2); line-height: 1.5; }

        .exam-footer { display: flex; justify-content: space-between; align-items: center; margin-top: var(--spacing-xl); }
        .btn:disabled { opacity: 0.5; cursor: not-allowed; }
      `}</style>
    </div>
  )
}

export default ExamTraining