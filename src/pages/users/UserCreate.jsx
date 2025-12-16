import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useUsers } from '../../hooks/useUsers'
import UserForm from './UserForm'

const UserCreate = () => {
  const navigate = useNavigate()
  const { createUser } = useUsers()

  const handleCreateUser = async (data) => {
    try {
      await createUser({
        ...data,
        date: new Date(data.date),
      })

      navigate('/dashboard/users')
    } catch (error) {
      console.error('Error al crear al usuario:', error)
    }
  }
  return (
    <UserForm
      onSubmit={handleCreateUser}
      onCancel={() => navigate('/dashboard/users')}
    />
  )
}

export default UserCreate