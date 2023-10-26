import './UserList.css'

function UserList({users, handleDeletUser}) {
  return (
    <ul className='UlContainer'>
    {users.map((user, index) => (
      <li key={index}>
        {user.name}
        <button onClick={() => handleDeletUser(user.id)}>Delete</button>
      </li>
    ))}
  </ul>
  )
}

export default UserList