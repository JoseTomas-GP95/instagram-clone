import React, { useState, useEffect } from 'react'
import './App.css';
import { db } from './firebase';
import { collection, addDoc, doc, setDoc, getDoc, getDocs, deleteDoc, updateDoc  } from "firebase/firestore";
import { AiFillDelete } from 'react-icons/ai'
import { BsPencilSquare } from 'react-icons/bs'
import { TbSend } from 'react-icons/tb'

function App() {
  const [userList, setUserList] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [user, setUser] = useState({
    name: '',
    surname: '',
    age: 0,
    email: ''
  })
  
  const getUsers = async () => {
    let array = []
    const querySnapshot = await getDocs(collection(db, "users"))
    querySnapshot.forEach((doc) => {
      array.push({data: doc.data(), id: doc.id})
    })
    setUserList(array)
  }

  useEffect(() => {
    getUsers()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()

    await addDoc(collection(db, 'users'), user)
    console.log('creado')

    setUser({
      name: '',
      surname: '',
      age: 0,
      email: ''
    })
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setUser({
      ...user,
      [name]: value
    })
  }

  const handleDelete = async (userId) => {
    await deleteDoc(doc(db, 'users', userId))
    console.log('Recarga la pagina. Está borrado')
  }

  const handleUpdate = async (data) => {
    setUser({
      name: data.name,
      surname: data.surname,
      age: data.age,
      email: data.email
    })
    setIsEditing(true)
  }

  const sendUpdateUser = async (userId) => {
    await updateDoc(doc(db, 'users', userId), user)
    console.log('Recarga la pagina. Está actualizado')
    setIsEditing(false)
  }
  
  return (
    <div className="App">
      {
        isEditing 
          ? null
          : <form onSubmit={handleSubmit}>
          <label>
            Nombre: 
            <input value={user.name} onChange={handleChange} name='name' type='text' placelholder='Jose'/>
          </label>
  
          <br />
  
          <label>
            Apellido: 
            <input value={user.surname} name='surname' onChange={handleChange} type='text' placelholder='Gonzalez'/>
          </label>
  
          <br />
  
          <label>
            Edad: 
            <input value={user.age} name='age' onChange={handleChange} type='number' placelholder='29'/>
          </label>
  
          <br />
  
          <label>
            Email: 
            <input value={user.email} name='email' onChange={handleChange} type='email' placelholder='example@example.com'/>
          </label>
  
          <button>Crear usuario</button>
        </form>
      }

      <hr />
      <br />
      <h1>Toca el botón para guardar a un usuario</h1>
      {
        userList.map(doc => {
          const { data, id } = doc
          return (
            <div key={id}>
              <div style={{ backgroundColor: '#add8e6' }}>
                <input onChange={handleChange} disabled={!isEditing} type='text' defaultValue={data.name} name='name'/>
                <br />
                <input onChange={handleChange} disabled={!isEditing} type='text' defaultValue={data.surname} name='surname'/>
                <br />
                <input onChange={handleChange} disabled={!isEditing} type='email' defaultValue={data.email} name='email'/>
                <br />
                <br />

                <AiFillDelete onClick={() => handleDelete(id)} />
                {
                  isEditing 
                    ? <TbSend onClick={() => sendUpdateUser(id)} />
                    : <BsPencilSquare onClick={() => handleUpdate(data)} />
                }
              </div>
              <hr />
              <br />
            </div>
          )
        })
      }
    </div>
  );
}

export default App;
