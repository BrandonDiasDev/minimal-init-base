import { useEffect, useState } from 'react'

type Message = {
  id: string
  authorName: string
  content: string
  createdAt: string
}

function App() {
  const [messages, setMessages] = useState<Message[]>([])
  const [authorName, setAuthorName] = useState('')
  const [content, setContent] = useState('')

  async function loadMessages() {
    const res = await fetch('http://localhost:3000/messages')
    const data = await res.json()
    setMessages(data)
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
    <div style={{ padding: 20 }}>
      <h1>Mensagens</h1>

      <input
        placeholder="Seu nome"
        value={authorName}
        onChange={(e) => setAuthorName(e.target.value)}
      />

      <br /><br />

      <textarea
        placeholder="Mensagem"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <br /><br />

      <button onClick={sendMessage}>Enviar</button>

      <hr />

      {messages.map((msg) => (
        <div key={msg.id}>
          <b>{msg.authorName}</b>
          <p>{msg.content}</p>
          <small>{new Date(msg.createdAt).toLocaleString()}</small>
          <hr />
        </div>
      ))}
    </div>
  )
}

export default App