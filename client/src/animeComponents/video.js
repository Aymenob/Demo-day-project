import React from 'react'

const Video = ({url,Description}) => {
  return (
    
         <div >
        <p class="Title">{Description}</p>
      <iframe title={url}aria-hidden="true" width="700" height="395" src={url.replace(/\"/g,'').replace(/\'/g,'')} />
      
    </div>
    
  )
}

export default Video