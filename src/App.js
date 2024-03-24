import { useState, useEffect } from 'react'
 

const App = () => {
   const [value, setValue] = useState(null)
   const [message, setMessage] = useState(null)
   const [previousChats, setPreviousChats] = useState([])
   const [currentTitle, setCurrentTitle] = useState([])

  

   function createNewChat() {
    setMessage(null);
    setValue("");
    setCurrentTitle(null);
  }

   const handleClick = (uniqueTitles) =>
   {
      setCurrentTitle(uniqueTitles)
      setMessage(null)
      setValue("")
   }



  const getMessages = async () => {
   const messageInput = document.getElementById("input").value;

    const options = {
      method: "POST",
      body: JSON.stringify({
        message: value
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch("http://localhost:5000/completions",options)
      const data = await response.json()
      //console.log(data);
      // Update the state or perform actions based on data
       setMessage(data.choices[0].message)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(currentTitle, value, message)
    if(!currentTitle && value && message)
    {
      setCurrentTitle(value)
    }

    if (currentTitle && value && message)
    {
      setPreviousChats(prevChats => (
        [...prevChats,
            {
              title: currentTitle,
              role: "user",
              content: value
              
            },
            {
              title : currentTitle,
              role: message.role,
              content : message.content
            }
        ]
      ))
    }
  }, [message, currentTitle, value] ) 

  const currentChat = previousChats.filter(previousChats => previousChats.title === currentTitle)
  const uniqueTitles = Array.from(new Set(previousChats.map(previousChats => previousChats.title)))

  return (
    <div className="App">
      <section className="side-bar">
        <button onClick={createNewChat}>+ New chat</button>
        <ul className="history">
          {uniqueTitles?.map((uniqueTitles, index) => <li key={index} onClick={ () => handleClick(uniqueTitles)}>{uniqueTitles}</li>)}
        </ul>
        <nav>
          <p>Title</p>
        </nav>
      </section>
      <section className="main">
       {!currentTitle && <h1>Chatgpt</h1> }
        <ul className="feed">
          {currentChat.map((chatMessage, index) => <li key={index}>
            <p className="role">{chatMessage.role}</p>
            <p>{chatMessage.content}</p>
          </li>)}
        </ul>
        <div className="bottom-section">
          <div className="input-container">
            <input value={value} onChange={e => setValue(e.target.value)} name="input" id="input" />
            <div id="submit" onClick={getMessages}>
              *
            </div>
          </div>
          <p className="info">
            Chat gpt mar 14 version. free research preview. our goal is to make
            ai system more natural and safe to interact your feedback will help
            us improve
          </p>
        </div>
      </section>
    </div>
  );
};

export default App;
