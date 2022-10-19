import React from 'react'
import { useSelector } from 'react-redux';

const PostedComments = ({url,text,owner,updatedAt,handleDelete,OwnerId}) => {
    const user = JSON.parse(localStorage.getItem('user'))
    const admin = useSelector(state => state.Users.user?.Role)
    const updated=new Date(updatedAt);//console.log(updated.toUTCString().slice(0, -3))
    return (

        
                <div class="col-md-11">
                    <div class="d-flex flex-column comment-section">
                        <div class="bg-white p-2">
                            <div class="d-flex flex-row user-info"><img style={{borderRadius:"4px"}} class="" src={url} height="43" width="43" />
                                <div class="d-flex flex-column justify-content-start ml-2"><span class="d-block font-weight-bold name">{owner}</span><span class="date text-black-50">Posted-{updated.toUTCString().slice(0, -3)}</span></div>
                            </div>
                            <div class="mt-1">
                                <p class="comment-text-1">{text}</p>
                            </div>
                        </div>
                        <div style={{marginLeft:"0.4cm",marginTop:"-0.75cm",color:"grey"}} class="">
                            <div class="d-flex flex-row fs-12">
                                <div class="like p-1 cursor"><i class="fa fa-thumbs-o-up"></i><span class="ml-1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-square-fill" viewBox="0 0 16 16"><path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/></svg></span></div>
                                <div class="like p-1 cursor"><i class="fa fa-thumbs-o-up"></i><span class="ml-1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-square-fill" viewBox="0 0 16 16"><path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/></svg></span></div>
                                <div class="like p-1 cursor"><i class="fa fa-commenting-o"></i><span class="ml-1">Comment</span></div>
                                {admin==="admin"||user._id===OwnerId?<div class="like p-1 cursor"><i style={{color:"red",padding:"0.1cm",fontSize:"0.38cm"}} onClick={handleDelete} class="fa fa-trash"></i></div>:null}

                            </div>
                        </div>
                        
                    </div>
                </div>
           

    )
}

export default PostedComments