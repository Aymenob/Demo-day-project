import React from 'react'

const Comments = () => {
    return (

    
           
                <div  class="col-md-11">
                    <div class="d-flex flex-column comment-section">
                       
                        <div class="bg-white p-2">
                            <div class="d-flex flex-row align-items-start"><img class="rounded-circle" src="https://i.imgur.com/RpzrMR2.jpg" width="40" /><textarea class="form-control ml-1 shadow-none textarea"></textarea></div>
                            <div class="mt-2 text-right"><button class="btn btn-primary btn-sm shadow-none" type="button">Post comment</button><button class="btn btn-outline-primary btn-sm ml-1 shadow-none" type="button">Cancel</button></div>
                        </div>
                    </div>
                </div>
            
        

    )
}

export default Comments