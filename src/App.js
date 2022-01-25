/* src/App.js */
import './App.css'
import { useState } from 'react'
import { create } from 'ipfs-http-client'


const client = create('https://ipfs.infura.io:5001/api/v0')

function App() {
  const [fileUrl, changeFileUrl] = useState(``)
  async function onChange(e) {
    const file = e.target.files[0]
    try {
      const added = await client.add(file)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      changeFileUrl(url)
    } catch (error) {
      console.log('File ain`t uploadin..', error)
    }  
  }

  function fireUpload(){
    document.getElementById("image-input").click();
  }

  return (
    <div className="app">
      <h1 className="text">Trying out IPFS :)</h1>
      <input
        type="file"
        onChange={onChange}
        id="image-input"
        className="ugly-input"
      />
      <button className='img-button' onClick={()=>{fireUpload()}} >Upload</button>
      <h1 className="text">This is the image you uploaded :0</h1>
      {
        fileUrl && (
          <img src={fileUrl} className='img-display' alt="gg" />
        )
      }
    </div>
  );
}

export default App