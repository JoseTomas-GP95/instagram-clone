import { useState } from "react"
import { Button } from "@mui/material"

export const ImageUpload = () => {
  const [caption, setCaption] = useState('')
  const [image, setImage] = useState(null)
  const [progress, setProgress] = useState(null)

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const handleUpload = () => {

  }
  return (
    <div>
      <input type="text" placeholder="Enter a caption..." value={caption} onChange={(event) => setCaption(event.target.value)} />
      <input type="file"  onChange={handleChange}/>
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  )
}