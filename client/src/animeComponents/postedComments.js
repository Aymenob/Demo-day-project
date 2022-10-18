import React from 'react'

const PostedComments = () => {
    return (

        
                <div class="col-md-11">
                    <div class="d-flex flex-column comment-section">
                        <div class="bg-white p-2">
                            <div class="d-flex flex-row user-info"><img class="rounded-circle" src="https://i.imgur.com/RpzrMR2.jpg" width="40" />
                                <div class="d-flex flex-column justify-content-start ml-2"><span class="d-block font-weight-bold name">Marry Andrews</span><span class="date text-black-50">Shared publicly - Jan 2020</span></div>
                            </div>
                            <div class="mt-3">
                                <p class="comment-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                            </div>
                        </div>
                        <div style={{marginLeft:"0.4cm",marginTop:"-0.5cm",color:"orange"}} class="">
                            <div class="d-flex flex-row fs-12">
                                <div class="like p-1 cursor"><i class="fa fa-thumbs-o-up"></i><span class="ml-1">Like</span></div>
                                <div class="like p-1 cursor"><i class="fa fa-commenting-o"></i><span class="ml-1">Comment</span></div>
                            </div>
                        </div>
                        
                    </div>
                </div>
           

    )
}

export default PostedComments