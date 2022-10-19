import React from 'react'

const Comments = ({url,handleType,handleSubmit,handleCancel,value}) => {
    return (



        <div style={{marginLeft:'1.5cm',marginTop:"-0.2cm"}} class="col-md-11">
            <div class="d-flex flex-column comment-section">

                <div class="bg-white p-2">
                    <div class="d-flex flex-row align-items-start"><img  style={{borderRadius:"4px"}} class="" src={url} height="49" width="49" /><textarea style={{height:"1.3cm",width:"80%",marginLeft:'0.2cm',borderRadius:"4px"}} value={value} onChange={handleType} class="form-control ml-1 shadow-none textarea"></textarea></div>
                    <div class="mt-2 text-right">
                        <button style={{border:"none",backgroundColor:"tomato",padding:"0px",width:"2.7cm",height:"0.7cm",textAlign:"center"}} onClick={handleSubmit} class="btn btn-primary btn-sm shadow-none" type="button">Post comment</button>
                        <button style={{border:"black solid 1.5px",backgroundColor:"",marginLeft:"0.2cm",padding:"0px",width:"1.5cm",height:"0.7cm",textAlign:"center"}} onClick={handleCancel} class="btn btn-outline-danger btn-sm ml-1 shadow-none" type="button">Cancel</button>
                        </div>
                </div>
            </div>
        </div>



    )
}

export default Comments