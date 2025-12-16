import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useUsers } from '../../hooks/useUsers'
import UserForm from './UserForm'

const UserEdit = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { updateUser, getUserById } = useUsers()
  const [userData, setUserData] = useState(null)

  useEffect(() => {
      const fetchUserData = async () => {
        const data = await getUserById(id)
        setUserData(data)
      }
      fetchUserData()
    }, [id, getUserById])

    const handleEditUser = async (data) => {
    try {
      await updateUser(id, data)
      navigate('/dashboard/users')
    } catch (error) {
      console.error('Error al editar el usuario:', error)
    }
  }
  
  return (
    <UserForm
      onSubmit={handleEditUser}
      onCancel={() => navigate('/dashboard/users')}
      defaultValues={userData}
    />
  )
}

export default UserEdit