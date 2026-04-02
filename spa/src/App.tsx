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
mx: number
my: number
dur: number
delay: number
}

function App() {
  const [messages, setMessages] = useState<PositionedMessage[]>([])
  const [authorName, setAuthorName] = useState('')
  const [content, setContent] = useState('')

  async function loadMessages() {
    const res = await fetch('http://localhost:3000/messages')
    const data = await res.json()

    const positioned = data.map((msg: Message) => {
      const mode = Math.floor(rand(1, 4)) // 1=horizontal, 2=vertical, 3=diagonal

      const sx = Math.random() < 0.5 ? -1 : 1
      const sy = Math.random() < 0.5 ? -1 : 1

      const mx = mode === 2 ? 0 : rand(40, 180) * sx
      const my = mode === 1 ? 0 : rand(40, 180) * sy

      return {
        ...msg,
        x: Math.floor(Math.random() * (window.innerWidth - 260)),
        y: Math.floor(Math.random() * (window.innerHeight - 180)),
        mx,
        my,
        dur: rand(4, 12),
        delay: rand(0, 3)
      }
    })
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

  useEffect(() => {
  if (!messages.length) return

  console.table(
    messages.map((m) => ({
      id: m.id,
      x: Math.round(m.x),
      y: Math.round(m.y),
      mx: Math.round(m.mx),
      my: Math.round(m.my),
      dur: Number(m.dur.toFixed(2)),
      delay: Number(m.delay.toFixed(2))
    }))
  )
}, [messages])

  
  return (
    <div className='lousa-infinita'>

      {messages.map((msg) => (
        
        <div className='card card-drag card-float'  
            key={msg.id} style={{left: msg.x, 
                                 top : msg.y,
                                  '--mx': `${msg.mx}px`, 
                                  '--my': `${msg.my}px`, 
                                  '--dur': `${msg.dur}s`, 
                                  '--delay': `${msg.delay}s` 
                                 
                                } as any}>
         
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

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min
}
