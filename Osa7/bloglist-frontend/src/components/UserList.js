import React, { useState, useEffect } from 'react'
import userService from '../services/users'
import { Link } from 'react-router-dom'

const UserList = () => {

  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll().then(users => {
      setUsers(users)
    })
  }, [])

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Blogs created</th>
          </tr>
          {users.map(user =>
            <tr key={user.id}>
              <td>
                <Link to={{
                  pathname: `/users/${user.id}`,
                  state: { user }
                }}>
                  {user.name}
                </Link>
              </td>
              <td>
                {user.blogs.length}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default UserList