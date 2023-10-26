import { useEffect, useState, useRef } from "react";
import UserList from "./UserList";

import './App.css'

function App() {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [newUserName, setNewUserName] = useState('')
  const [isAddingUser, setIsAddingUser] = useState(false);

  const inputRef = useRef(null);

  const url = 'https://jsonplaceholder.typicode.com/users'

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setUsers(data)
        setIsLoading(false)
      })
      .catch(error => {
        setError(error)
        setIsLoading(false)
      })

  },[])

  const handleAddUser = () => {
    setIsAddingUser(true)

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({name: newUserName})
    })
      .then(response => response.json())
      .then(data => {
        setUsers([...users, data])
        setIsAddingUser(false)
        setNewUserName('')
        inputRef.current.focus()
      })
      .catch(error => {
        setError(error)
        setIsAddingUser(false)
      })
  }

  const handleDeletUser = (userId) => {
    fetch(`${url}/${userId}`, {
      method: "DELETE",
    })
      .then(() => {
        const upDateUsers = users.filter(user => user.id !== userId )
        setUsers(upDateUsers)
      })
      .catch(error => {
        setError(error)
      })
  }

  if(isLoading) {
    return <div>Loading...</div>
  }

  if(error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div className="AppContainer" >
      <h1>LIST OF USERS</h1>
      <input 
        type="text"
        placeholder="Enter user's name"
        value={newUserName}
        onChange={e => setNewUserName(e.target.value)}
        ref={inputRef}
      />

      <button onClick={handleAddUser} disabled={isAddingUser} className="btnAdd">
        {isAddingUser ? 'Adding...' : 'Add User'}
      </button>

      <UserList users={users} handleDeletUser={handleDeletUser}/>

    </div>
  );
}

export default App;
