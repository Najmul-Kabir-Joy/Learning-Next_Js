import { useRef, useState } from "react"
export default function Home() {
  const [items, setItems] = useState([]);
  const emailInput = useRef();
  const messageInput = useRef();
  const formHandler = (e) => {
    e.preventDefault();

    const email = emailInput.current.value;
    const msg = messageInput.current.value;

    const reqBody = {
      email: email,
      text: msg
    }

    fetch('/api/fedback', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => console.log(data))

  }

  const loadFedback = () => {
    fetch('/api/fedback')
      .then(res => res.json())
      .then(data => setItems(data.feedback))

  }
  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={formHandler}>
        <div>
          <label htmlFor="email">Email:</label>
          <input ref={emailInput} type="email" placeholder='email' id='email' />
        </div>
        <div>
          <label htmlFor="message">Feedback</label>
          <textarea ref={messageInput} id='message' rows='5'></textarea>
        </div>
        <button>send </button>
      </form>

      <hr />
      <button onClick={loadFedback}>LOAD FEDBACK</button>

      <ul>
        {
          items.map(item => <li key={item.id}>{item.msg}</li>)
        }
      </ul>
    </div>
  )
}
