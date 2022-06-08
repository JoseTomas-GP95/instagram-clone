import { useState, useEffect } from 'react';
import './App.css';
import { Post } from './components/Post';
import { collection, onSnapshot } from 'firebase/firestore'
import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile, signOut, signInWithEmailAndPassword  } from "firebase/auth"
import { db, auth } from './firebase';
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Input from '@mui/material/Input'
import { ImageUpload } from './components/ImageUpload';
/*
  - Uso de onSnapshot: https://stackoverflow.com/questions/70214878/react-usestate-and-firebase-onsnapshot
  - Documentacion onSnapshot: https://firebase.google.com/docs/firestore/query-data/listen
  - Servicions de Firebase web: https://firebase.google.com/docs/web/setup
  - Actualizar datos del usuario: https://firebase.google.com/docs/auth/web/manage-users#update_a_users_profile
  - Crear usuario con email y password: https://firebase.google.com/docs/auth/web/password-auth#create_a_password-based_account
  - Deslogueo de usuario: https://firebase.google.com/docs/auth/web/password-auth#next_steps
  - Loguearse: https://firebase.google.com/docs/auth/web/password-auth#sign_in_a_user_with_an_email_address_and_password
*/

function App() {
  const [posts, setPosts] = useState([])
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [user, setUser] = useState(null)
  const [openSignIn, setOpenSignIn] = useState(false)
  

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false)


  // Actualización de usuario
  const updateUser = () => {
    console.log('x', auth.currentUser)

    updateProfile(auth.currentUser, {
      displayName: "Jose. Tomas Gonzalez Padron", photoURL: "https://example.com/jane-q-user/profile.jpg"
    })
      .then(() => alert('updated'))
      .catch((error) => alert(error))
  }

  // Un get con Firebase de toda la collection
  useEffect(() => {
    onSnapshot(collection(db, "post"), (querySnapshot) => {
      setPosts(querySnapshot.docs.map(post => ({
        id: post.id,
        post: post.data()
      })))
    })
  }, [])

  // Esto crea persistencia de usuario.
  // Si no existe usuario entonces este se desloguea con la nulidad
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // user has logged in...
        setUser(user)
      } else {
        // user has logged out ...
        setUser(null)
      }
    })

    return () => {
      unSubscribe()
    }
    
  }, [user, username])

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  // Crear cuenta nueva por correo y contraseña
  const signUp = (event) => {
    event.preventDefault()

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
    })
    .catch((error) => {
      alert('RESPUESTA ERROR: ', error.message)
    })
  } 

  // Desloguear usuario
  const logOut = () => {
    return signOut(auth).then(() => {
      console.log('DESLOGUEADO')
    }).catch((error) => {
      // An error happened.
      alert('Ha sucedido un error: ', error)
    });
  }

  const loginWidthEmailAndPassword = (event) => {
    event.preventDefault()

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log('logueo: ', user)
    })
    .catch((error) => {
      alert(error.message)
    })
  }

  console.log(email, password, username)

  return (
    <div className="app">
      {/* <button onClick={updateUser}>hacer update</button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={signUp} className='app__signup'>
            <center >
              <img
                className='app__headerImage'
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/840px-Instagram_logo.svg.png" 
                alt="Instagram logo" 
              />
            </center>

            <Input 
              placeholder='username'
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <Input 
              placeholder='email'
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input 
              placeholder='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type='submit'>Sign up</Button>
          </form>
        </Box>
      </Modal>



      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
        <Box sx={style}>
          <form onSubmit={loginWidthEmailAndPassword} className='app__signup'>
            <center >
              <img
                className='app__headerImage'
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/840px-Instagram_logo.svg.png" 
                alt="Instagram logo" 
              />
            </center>

            <Input 
              placeholder='email'
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input 
              placeholder='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type='submit'>LogIn</Button>
          </form>
        </Box>
      </Modal>




      {/* Header */}
      <div className="app__header">
        <img
          className='app__headerImage'
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/840px-Instagram_logo.svg.png" 
          alt="Instagram logo" 
        />

        <div>
          {
            user 
              ? <Button onClick={() => logOut()}>Logout</Button>
              : (<div>
                  <Button onClick={handleOpen}>Sign up</Button>
                  <Button onClick={() => setOpenSignIn(true)}>LogIn</Button>
              </div>)
          }
        </div>
      </div>
      
      {/* Post */}
      <ImageUpload />
      {
        posts.map(({id, post}) => (
          <Post 
            id={id} 
            username={post.username} 
            caption={post.caption} 
            imageUrl={post.imageUrl} 
          />
        ))
      }
    </div>
  );
}

export default App;
