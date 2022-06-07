import { useState, useEffect } from 'react';
import './App.css';
import { Post } from './components/Post';
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from './firebase';


/*
  - Uso de onSnapshot: https://stackoverflow.com/questions/70214878/react-usestate-and-firebase-onsnapshot
  - Documentacion onSnapshot: https://firebase.google.com/docs/firestore/query-data/listen
*/

function App() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    onSnapshot(collection(db, "post"), (querySnapshot) => {
      setPosts(querySnapshot.docs.map(post => ({
        id: post.id,
        post: post.data()
      })))
    })
  }, [])

  return (
    <div className="app">
      {/* Header */}
      <div className="app__header">
        <img
          className='app__headerImage'
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/840px-Instagram_logo.svg.png" 
          alt="Instagram logo" 
        />
      </div>
      
      {/* Post */}
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
