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
dur: number
delay: number
easing: string
}

const CARD_W = 348
const CARD_H = 211

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min
}

function randomPos() {
  return {
    x: Math.floor(rand(0, Math.max(1, window.innerWidth - CARD_W))),
    y: Math.floor(rand(0, Math.max(1, window.innerHeight - CARD_H)))
  }
}

function randomEasing() {
  const easings = [
                    'linear',
                    'ease',
                    'ease-in-out',
                    'cubic-bezier(0.22, 1, 0.36, 1)'
                    ]
  return easings[Math.floor(Math.random() * easings.length)]
}

function App() {
  const [messages, setMessages] = useState<PositionedMessage[]>([])
  const [authorName, setAuthorName] = useState('')
  const [content, setContent] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  

  async function loadMessages() {
    const res = await fetch('http://localhost:3000/messages')
    const data = await res.json()

    const positioned = data.map((msg: Message) => {
      const p = randomPos()

      return {
        ...msg,
        x:p.x,
        y:p.y,
        dur: rand(3, 10),
        delay: rand(0, 1.5),
        easing: randomEasing()
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

      const id = requestAnimationFrame(() => {
        setMessages((prev) =>
          prev.map((m) => {
            const p = randomPos()
            return {
              ...m,
                x: p.x,
                y: p.y,
                dur: rand(3, 10),
                delay: rand(0, 1.5),
                easing: randomEasing()
            }
        })
      )
    })
    return () => cancelAnimationFrame(id)
  }, [messages.length])

  
  useEffect(() => {
  if (!messages.length) return

  console.table(
    messages.map((m) => ({
      id: m.id,
      x: Math.round(m.x),
      y: Math.round(m.y),
      dur: Number(m.dur.toFixed(2)),
      delay: Number(m.delay.toFixed(2))
    }))
  )
}, [messages])

  
  return (    
    <div className='app'>

      {isOpen && (
        <div className='modalinput-area'>
          <button className='close-div' 
            onClick={() => setIsOpen(false)}>
          </button>
          
        </div>
      )}
      
      <button className='input-area fab-div' 
        onClick={() => setIsOpen(true)}>
      </button>
      

      

      <div className='lousa-infinita'>

        {messages.map((msg) => (
          
          <div className='card card-drag'  
              key={msg.id} 
              
              onTransitionEnd={(e) => {  
                if (e.target !== e.currentTarget) return
                if (e.propertyName !== 'left' && e.propertyName !== 'top') return      
              
                const p = randomPos()
              
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === msg.id
                      ? {...m,
                          x: p.x,
                          y: p.y,
                          dur: rand(3, 10),
                          delay: rand(0, 1.5),
                          easing: randomEasing()
                        } : m
                    )
                )
              
              }}
              
              style={{left: msg.x, 
                      top : msg.y,
                      transitionProperty: 'left, top', 
                      transitionDuration: `${msg.dur}s`,
                      transitionTimingFunction: msg.easing, 
                      transitionDelay: `${msg.delay}s` 
                      
                    }}>
          
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
    </div>
  )
}

export default App

