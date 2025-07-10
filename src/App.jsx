import axios from 'axios'
import { useState } from 'react'
import './as.css' 

function App() {
  const [answer, setAnswer] = useState([])
  const [question, setQuestion] = useState('')

  function ask() {
    if (!question.trim()) return
    axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAtOX-Yvymqz8ogViLD1EyzdqLPK85W3wQ',
      {
        contents: [{ parts: [{ text: question }] }]
      },
      {
        headers: { 'Content-type': 'application/json' }
      }
    )
    .then(response => {
      const reply = response.data.candidates?.[0].content?.parts?.[0]?.text
      setAnswer([...answer, { question, answer: reply }])
      setQuestion('')
    })
  }
  return (
    <div className="p-6 max-w-3xl mx-auto bg-amber-100">
        <div> <h1 className="text-3xl truncate text-blue-700 text-center mb-6">
          Gemini Ai Suraq-Zhauap
        </h1></div>
      <div className="flex gap-4 mb-6">
        <input
          className="w-9/12 h-12 block border-3 border-blue-500 rounded-[16px] px-4 focus:outline-none"
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask something..."
        />
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded-[16px] hover:bg-blue-600 transition"
          onClick={ask}
        >
          Zhibery
        </button>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg min-h-[200px]">
        <div className="space-y-6">
          {answer.map((n, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow">
              <div className="mb-2">
                <h4 className="font-semibold">Qoiylgan suraq:</h4>
                <p>{n.question}</p>
              </div>
              <div>
         
                <h4 className="font-semibold w-9/12 h-12 block border-3 border-blue-500 rounded-[16px] px-4 focus:outline-none" >Zhauap:</h4>
                <p>{n.answer}</p>
              </div>
            </div>
          ))}
          {answer.length === 0 && (
            <p className="text-center text-gray-500">No questions asked yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App

