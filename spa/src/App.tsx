import { useEffect, useState } from 'react'
import './App.css'
import './Lousa.css'

type Message = {
  id: string
  authorName: string
  content: string
  createdAt: string
}

type PositionedMessage = Message & {
x: number
y: number
}

function App() {
  const [messages, setMessages] = useState<PositionedMessage[]>([])
  const [authorName, setAuthorName] = useState('')
  const [content, setContent] = useState('')

  async function loadMessages() {
    const res = await fetch('http://localhost:3000/messages')
    const data = await res.json()
    const positioned = data.map((msg: Message) => ({
    ...msg,
    x: Math.floor(Math.random() * (window.innerWidth - 260)),
    y: Math.floor(Math.random() * (window.innerHeight - 180))
    }))
    setMessages(positioned)
  }

  async function sendMessage() {
    await fetch('http://localhost:3000/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ authorName, content })
    })

    setContent('')
    loadMessages()
  }

  useEffect(() => {
    loadMessages()
  }, [])

  
  return (
    <div className='lousa-infinita'>

      {messages.map((msg) => (
        
        <div className='card card-drag'  key={msg.id} style={{left: msg.x, top : msg.y}}>
         
          <div className='card-content'> 
            <p>{msg.content}</p> 
          </div>
          
          <div className='card-infos'>
            <small>{msg.authorName}</small>
          
            <small>{new Date(msg.createdAt).toLocaleString()}</small>
          </div>
          
        </div>
      ))}
    </div>
  )
}

export default App