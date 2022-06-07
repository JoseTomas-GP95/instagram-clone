import './Post.css'
import Avatar from '@mui/material/Avatar'
export const Post = ({ id, username, caption, imageUrl }) => {

  return (
    <div key={id} className="post">
      <div className="post__header">
        <Avatar 
          className='post__avatar'
          alt="Remy Sharp" 
          src="" 
          />
        <h3>{username}</h3>
      </div>

      {/* header - avatar + username */}
      <img className='post__image' src={imageUrl} alt="Default Username" />
    
      {/* Username + caption */}
      <h4 className='post__text'><strong>{username}</strong> {caption}</h4>
    </div>
  )
}