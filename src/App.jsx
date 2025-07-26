import { useState } from 'react'

function App() {
  const [studentId, setStudentId] = useState('')
  const [recommendations, setRecommendations] = useState([])

  const fetchRecommendations = async () => {
    const response = await fetch('http://localhost:8000/recommend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ student_id: studentId })
    })

    const data = await response.json()
    setRecommendations(data.recommended_courses || [])
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Smart Course Planner</h1>
      <input
        type="text"
        value={studentId}
        placeholder="Enter Student ID"
        onChange={(e) => setStudentId(e.target.value)}
      />
      <button onClick={fetchRecommendations}>Get Recommendations</button>

      <ul>
        {recommendations.map((course, idx) => (
          <li key={idx}>{course}</li>
        ))}
      </ul>
    </div>
  )
}

export default App