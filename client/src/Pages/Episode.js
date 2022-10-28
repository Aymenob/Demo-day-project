import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { logOUT } from '../Redux/usersSlice'
import {  getTrailers2, getEpisode, modifyEpisode, deleteEpisode,searchTrailer,random } from '../Redux/animeSlice'
import { getTrailerComments,postComment,deleteComment,modifyComment,toggleLike,toggleDeslike } from '../Redux/commentsSlice'
import { useEffect } from 'react'
import NewAnimes from '../animeComponents/newAnimes'
import Video from '../animeComponents/video'
import Swal from 'sweetalert2'
import HomeDropDown from '../animeComponents/HomeDropDown'
import GenreDropDown from '../animeComponents/genreDropDown'
import Comments from '../animeComponents/Comments'
import PostedComments from '../animeComponents/postedComments'
const Episode = () => {
  
  let { number, season, animeName } = useParams();
  const user = JSON.parse(localStorage.getItem('user'))
  const authorized = useSelector(state => state.Users.authorized)
  const admin = useSelector(state => state.Users.user?.Role)
  const trailers2 = useSelector(state => state.animes.trailers2);
  const Episodes = useSelector(state => state.animes?.clickedEpisode?.episodes)
  const Id = useSelector(state => state.animes?.clickedEpisode?._id);
  const EpComments=useSelector(state=>state.Comments.Comments)
  const Com=useSelector(state=>state.Comments);
   const dispatch = useDispatch()
  const navigate = useNavigate()
  const [oldUrl, setOldUrl] = useState({ number: number }); 
  const [url, seturl] = useState(null)
  const [typedComment, settypedComment] = useState("");
  const [typedNewComment, settypedNewComment] = useState("")
  const [show,setShow]=useState(false)
  const data = new FormData();
  data.append('episodes', JSON.stringify(oldUrl)); 
  data.append('newEpisodes', JSON.stringify(url));
  const handleType=(e)=>{settypedComment(e.target.value)};
  const handleSubmit=()=>{dispatch(postComment({TrailerId:Id,episodes:number,Owner:user._id,text:typedComment})).then(result=>dispatch(getTrailerComments({TrailerId:Id,number:number}))&&settypedComment(""))}//text,episodes,Owner,TrailerId
  const handleCancel=()=>{settypedComment("")}
 const handleCancelModify=()=>{setShow(!show)}
  const handleDelete=(e)=>{dispatch(deleteComment(e._id)).then(result=>dispatch(getTrailerComments({TrailerId:Id,number:number})))}
  const handleSave=(e)=>{dispatch(modifyComment({id:e._id,text:typedNewComment})).then(result=>dispatch(getTrailerComments({TrailerId:Id,number:number}))&&setShow(!show))}
  const handleModify=()=>{setShow(!show)}
  const handleNewTyped=(e)=>{settypedNewComment(e.target.value)}
  const handleLike=(e)=>{dispatch(toggleLike({commentId:e,userId:user._id}))} 
  const handleDeslike=(e)=>{dispatch(toggleDeslike({commentId:e,userId:user._id}))}
  useEffect(() => {
    Id?dispatch(getTrailerComments({TrailerId:Id,number:number})):console.log("comments loading...")
    authorized ? navigate() : navigate("/")
    dispatch(getTrailers2())
    dispatch(getEpisode({ season: season, animeName: animeName })).then(result => result.payload.episodes?.map(e => JSON.parse(e).number == number ? setOldUrl({ ...oldUrl, number: number, url: JSON.parse(e).url }) : null)
    );
   
  }, [number])
  useEffect(() => {
    Id?dispatch(getTrailerComments({TrailerId:Id,number:number})):console.log("comments loading...")
    }, [Id,number,Com.toggledLike,Com.toggledDeslike])
    
  

  return (
    <div class="homeBackground">
      <div class="home">
        <nav>
          
          <li><a onClick={() => navigate("/")} href="/">Home</a></li>
          <li><a href="#news" onClick={(e)=>dispatch(random()).then(result=>navigate(`/watch/${result.payload[0].animeName}/${result.payload[0].season||0}`))}>Random</a></li>
          <GenreDropDown handleSearch2={(e) => { dispatch(searchTrailer({genre:[e.target.name]})).then(result=>navigate("/HomeSearch")) }}/>
          <input style={{marginLeft:"4cm"}}  onKeyDown={(e)=>e.keyCode==13?navigate("/HomeSearch",{state:e.target.value}):null} onChange={(e)=>{dispatch(searchTrailer({animeName:e.target.value}))}} type="search"></input><svg style={{ marginLeft: "0.3cm" }}  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
          <div class="container">
          <HomeDropDown handleSingOut={() => { dispatch(logOUT()); navigate("/") }} handleRegister={() => { navigate("/Register") }} src={user ? user.Image?.path : "https://png.pngtree.com/png-clipart/20190924/original/pngtree-user-vector-avatar-png-image_4830521.jpg"} user={user} authorized={authorized}/>

          </div>
        </nav>
        <section class="firstSection">
          <div class="subFirstSection">
            <div class="newEpisodesBar">
              <h4 style={{ marginLeft: "1cm", color: "white" }}>Episode</h4 >
              {admin === "admin" ? <button style={{ marginLeft: "4cm", color: "black" }} type="button" class="btn btn-primary" onClick={() => { Swal.fire({ text: "Url :", input: 'text', }).then(result => result.isConfirmed ? seturl({ number: number, url: result.value }) : null) }} >Modify</button> : null}
              {admin === "admin" ? <button style={{ color: "black" }} type="button" class="btn btn-success" onClick={() => { url ? Swal.fire({ text: "are you sure you want to save changes?", confirmButtonText: "yes", confirmButtonColor: "green" }).then(result => result.isConfirmed ? dispatch(modifyEpisode({ id: Id, Data: data,index:(number- Math.min(...Episodes.map(f => JSON.parse(f).number)) )}))&& window.location.reload()  : null) : Swal.fire({ icon: 'warning', text: "you didn't apply any changes", showCloseButton: true, showConfirmButton: false }) }} >Save</button> : null}
              {admin === "admin" ? <button style={{ color: "black" }} type="button" class="btn btn-danger" onClick={() => { ; Swal.fire({ text: "are you sure you want to delete The episode", showCloseButton: true, showConfirmButton: true, confirmButtonText: "yes", confirmButtonColor: "red" }).then(result => result.isConfirmed ? dispatch(deleteEpisode({ id: Id, data: data })) && oldUrl && window.location.reload() : null) }} >Delete</button> : null}
               <button style={{ color: "black" }} type="button" class="btn btn-danger" onClick={()=>{navigate(`/watch/${animeName}/${season||0}`)}} >Trailer</button> 

            </div>
            <div class="newEpisode" >
              <div class="episodeVideo">
                <div class="videoSpace">{Episodes ? Episodes?.map((e, i) => JSON.parse(e).number == number ? <Video url={JSON.parse(e)?.url} /> : null) : null}</div>
                <div class="nextPrevious">
                  {Episodes ? parseInt(number) > Math.min(...Episodes.map(e => JSON.parse(e).number)) ? <button onClick={() => { navigate(`/watch/${animeName}/${season }/${parseInt(number) - 1}`); dispatch(getTrailers2()) }} > &lt;&lt; previous episode</button> : null : null}
                  {Episodes ? parseInt(number) < Math.max(...Episodes.map(e => JSON.parse(e).number)) ? <button onClick={() => { navigate(`/watch/${animeName}/${season }/${parseInt(number) + 1}`); dispatch(getTrailers2()); }}>&nbsp;&nbsp;next episode&nbsp;&nbsp;&nbsp;&nbsp;&gt;&gt;</button> : null : null}

                </div>
                if you can't watch the video please try to reload page
              </div>
              <section class="postingComment">
              <Comments  value={typedComment} handleCancel={handleCancel} handleSubmit={handleSubmit} handleType={handleType} url={user.Image.path}/>
              </section>
              <div class="episodeComments">
             
              {EpComments.length!=0? EpComments.map(e=><PostedComments toggleDeslike={e.deslikes} toggleLike={e.likes} handleDeslike={()=>handleDeslike(e._id)} handleLike={()=>handleLike(e._id)} handleNewTyped={handleNewTyped} handleModify={handleModify} handleCancelModify={handleCancelModify}  show={show} handleSave={()=>handleSave(e)} OwnerId={e.Owner._id}  handleDelete={()=>handleDelete(e)} updatedAt={e.updatedAt} owner={e.Owner.userName} text={e.text} url={e.Owner.Image.path}/>):<h5 style={{marginTop:"1.5cm"}}>No comment was posted yet ...</h5>}
             
          
              </div>
            </div>

          </div>
          <div class="subFirstSection">
            <div class="newAnimeBar"><h4 style={{ marginLeft: "1cm", color: "white" }}>New Animes</h4 ></div>
            <div class="newAnimes">
              {true && trailers2.map((e, i) =>  <NewAnimes Rate={9 - i} animeName={e.animeName} animePicture={e.animePicture} season={e.season} Id={e._id} /> )}

            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Episode