import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  useNavigate } from 'react-router-dom';
import { cleanPassword, RegisterUser,cleanName,cleanEmail,cleanImage, logOUT } from '../Redux/usersSlice'
import '../App.css';
import swal from "sweetalert2"
function Register() {

     const Dispatch=useDispatch()
    const Navigate=useNavigate()
    const [selectedFile, setSelectedFile] = useState()
    const  [newUser, setnewUser] = useState({userName:"",Email:"",Password:"",Image:{path: "",public_id: ""}})
    const data = new FormData();
    data.append('userName',newUser.userName);
    data.append("Email",newUser.Email)
    data.append("Password",newUser.Password)
    data.append('Image', selectedFile);
    const user=useSelector(state=>state.Users.user)
    const errors=useSelector(state=>state.Users)
    const signedIn=useSelector(state=>state.Users.user?.msg)

   
     
       useEffect(() =>{
            signedIn&&swal.fire({ title: "Your account was created successfully", icon: "success", showCloseButton: false,showConfirmButton:false,timer:3000,customClass: 'swal-height' })

            if (signedIn) {
               
                Navigate("/Login")
            }
        }, [user])
    return (

        <div class="bg-light" style={{height:"100vh"}}>
                        <button class="btn btn-outline-primary" style={{position:"absolute",right:"40px",top:"20px"}} onClick={() => { Navigate("/") }}>Home</button>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span> 
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                              
                            </li>
                        </ul>
                        <div class="d-flex">
                            <div class="mx-4">
                          
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div class="container p-4 mt-4">
                <div class="row justify-content-evenly mt-4">

                    <div class="col-lg-6 col-md-12 mt-4">
                        <div class="d-flex">
                            <i class="fa-solid fa-right-to-bracket fs-1 mx-2"></i>
                            <h2>Register</h2>
                        </div>
                        <div class="p-6 shadow-lg p-3 mb-5 bg-body rounded" style={{backgroundColor:"white"}}>
                            <form>
                                <div class=" mb-3">
                                    <label class="form-label">Name</label>
                                    <div class="input-group">
                                        <span class="input-group-text" id="basic-addon1"><i
                                            class="fa-solid fa-user"></i></span>
                                        <input  name="userName" value={newUser.userName} onChange={(e)=>{setnewUser({...newUser,[e.target.name]:e.target.value});Dispatch(cleanName())}} type="text" class="form-control" />
                                    </div>
                                    {errors.errorsUserName?<p class="errors">{errors.errorsUserName.msg||errors.errorsUserName}</p>:null}
                                </div>
                                <div class=" mb-3">
                                    <label   class="form-label">Email address</label>
                                    <div class="input-group">
                                        <span class="input-group-text" id="basic-addon1"><i
                                            class="fa-solid fa-at"></i></span>
                                        <input  name="Email" onChange={(e)=>{setnewUser({...newUser,[e.target.name]:e.target.value});Dispatch(cleanEmail())}} type="text" class="form-control" />
                                    </div>
                                    {errors.errorsEmail?<p class="errors">{errors.errorsEmail.msg||errors.errorsEmail}</p>:null}
                                </div>
                                <div class="mb-3">
                                    <label  class="form-label">Password</label>
                                    <div class="input-group">
                                        <span class="input-group-text" id="basic-addon1"><i
                                            class="fa-solid fa-key"></i></span>
                                        <input  name="Password"  onChange={(e)=>{setnewUser({...newUser,[e.target.name]:e.target.value});Dispatch(cleanPassword())}} type="password" class="form-control" />
                                    </div>
                                    {errors.errorsPassword?<p class="errors">{errors.errorsPassword.msg||errors.errorsPassword}</p>:null}
                                </div>
                                <div class="mb-3">
                                    <label  class="form-label">Image</label>
                                    <div class="input-group">
                                        <span class="input-group-text" id="basic-addon1"><i
                                            class="fa-solid fa-image"></i></span>
                                        <input  name="Image"  onChange={(e)=>{setSelectedFile(e.target.files[0]);Dispatch(cleanImage())}} type="file" class="form-control" />
                                    </div>
                                    <span style={{color:"grey"}}  class="form-label">Acceptable formats:&nbsp;&nbsp;&nbsp;jpg-jpeg-png.</span>
                                    {errors.errorsImage?<p class="errors">{errors.errorsImage.msg||errors.errorsImage}</p>:null}
                                </div>
                                <div class="d-flex justify-content-between">
                                    <button type="submit" onClick={(e)=>{e.preventDefault();Dispatch(RegisterUser(data))}} class="btn btn-outline-primary">Save <i
                                        class="fa-solid fa-floppy-disk"></i></button>
                                        <button class="btn btn-outline-danger" onClick={(e)=>{e.preventDefault();Navigate("/Login");Dispatch(logOUT())}}>Login</button>
                                    
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default Register