import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { logOUT } from '../Redux/usersSlice'
import { getTrailers2, getEpisode, addEpisode, deleteTrailer, modifyTrailer, cleanTrailerErreurs,searchTrailer,random } from '../Redux/animeSlice'
import { useEffect } from 'react'
import NewAnimes from '../animeComponents/newAnimes'
import { useState } from 'react'
import Video from '../animeComponents/video'
import EpisodesBtn from "../animeComponents/episodesBtn"
import ModalAddEp from '../animeComponents/modalAddEp'
import { useRef } from 'react'
import Swal from "sweetalert2"
import Modals2 from '../animeComponents/modal2'
import HomeDropDown from '../animeComponents/HomeDropDown'
import GenreDropDown from '../animeComponents/genreDropDown'
const Random = () => {
  let { season, animeName } = useParams();//console.log(number)
  const user = JSON.parse(localStorage.getItem('user'))
  const authorized = useSelector(state => state.Users.authorized)
  const admin = useSelector(state => state.Users.user?.Role)
  const trailers2 = useSelector(state => state.animes?.trailers2);
  const Trailer = useSelector(state => state.animes?.clickedEpisode);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(getTrailers2()); dispatch(getEpisode({ season: season, animeName: animeName }));// console.log(season); console.log(animeName)
  }, [authorized])
  const formRef = useRef();
  const handleClick = () => {
    formRef.current.reset();
  }
  const [EpInfo, setEpInfo] = useState({ number: 0, url: "" }); console.log(EpInfo); const [checked, setchecked] = useState()
  /*add Episode modal handles*/const handleClose = () => { setShow(false); setEpInfo({}) }; const [show, setShow] = useState(false); const handleShow = () => { setShow(true) }
  const data = new FormData();
  data.append("newEpisodes", JSON.stringify(EpInfo)); checked ? data.append("New", checked) : console.log("not new"); console.log(data.get("newEpisodes")); console.log(data.get("New"))
  const handleSubmit = () => { EpInfo.number <= 0 || EpInfo.url === "" || EpInfo.number === "" ? Swal.fire({ text: "empty input fields", icon: "warning", showConfirmButton: false, timer: 1000, showCloseButton: true }) : dispatch(addEpisode({ id: Trailer._id, Data: data })).then(result => { setEpInfo({ number: 0, url: "" }); dispatch(getEpisode({ season: season, animeName: animeName })); handleClick() }) }
  const handleNew = (e) => { e.target.checked === true ? setchecked(true) : setchecked() };
  const [TRInfo, setTRInfo] = useState({}); console.log(TRInfo)
  const handleClose2 = () => { setShow2(false); setTRInfo({}) }; const [show2, setShow2] = useState(false); const handleShow2 = () => { setShow2(true); dispatch(cleanTrailerErreurs()) };
  const handleSubmit2 = () => { dispatch(modifyTrailer({ id: Trailer._id, Data: TRInfo })).then(result => { result.payload !== "your input is empty" ? setShow2(false) : Swal.fire({ text: "empty input fields", icon: "warning", showConfirmButton: false, timer: 1000, showCloseButton: true }) && handleClick(); setTRInfo({}); result.payload.animeName && result.payload.animeName !== Trailer?.animeName || result.payload.season && result.payload.season !== Trailer.season ? navigate("/") : dispatch(getEpisode({ season: season, animeName: animeName })) && dispatch(getTrailers2()); }) }
  return (

    <div class="homeBackground">
      <div class="home">
        <nav>
          
          <li><a onClick={() => navigate("/")} href="/">Home</a></li>
          <li><a href="#news" onClick={(e)=>dispatch(random()).then(result=>navigate(`/watch/${result.payload[0].animeName}/${result.payload[0].season||0}`))}>Random</a></li>
          <GenreDropDown handleSearch2={(e) => { dispatch(searchTrailer({genre:[e.target.name]})).then(result=>navigate("/HomeSearch")) }}/>
          <input style={{marginLeft:"4cm"}}  type="search"></input><svg style={{ marginLeft: "0.3cm" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
          <div class="container">
            <HomeDropDown handleSingOut={() => { dispatch(logOUT()); navigate("/") }} handleRegister={() => { navigate("/Register") }} src={user ? user.Image?.path : "https://png.pngtree.com/png-clipart/20190924/original/pngtree-user-vector-avatar-png-image_4830521.jpg"} user={user} authorized={authorized} />
          </div>
        </nav>

        <section class="firstSection">
          <div class="subFirstSection">
            <div class="newEpisodesBar">
              <h4 style={{ marginLeft: "1cm", color: "white" }}>Anime Trailer</h4 >
              {admin === "admin" ? <Modals2 formRef={formRef} Trailer={Trailer} handleSubmit={handleSubmit2} handleNumber={(e) => setTRInfo({ ...TRInfo, [e.target.name]: e.target.value })} handleUrl={(e) => setTRInfo({ ...TRInfo, [e.target.name]: e.target.value })} handleClose={handleClose2} handleShow={handleShow2} show={show2} /> : null}
              {admin === "admin" ? <ModalAddEp formRef={formRef} handleNew={handleNew} handleSubmit={handleSubmit} handleNumber={(e) => setEpInfo({ ...EpInfo, [e.target.name]: e.target.value })} handleUrl={(e) => setEpInfo({ ...EpInfo, [e.target.name]: e.target.value })} handleClose={handleClose} handleShow={handleShow} show={show} /> : null}
              {admin === "admin" ? <button onClick={() => { Swal.fire({ text: "Are you sure you want to delete This Trailer?", showCloseButton: true, showConfirmButton: true, confirmButtonText: "yes", confirmButtonColor: "red" }).then(result => result.isConfirmed ? dispatch(deleteTrailer(Trailer._id)).then(navigate("/")) : null) }}>Delete Trailer</button> : null}

            </div>
            <div class="newTrailer" >
              {Trailer ? (<Video url={Trailer.trailer} />) : null}
              <p style={{}}>Episodes :</p>
              <div class="buttons">
                {Trailer ? Trailer.episodes.map((e, i) => <EpisodesBtn season={Trailer.season} animeName={Trailer.animeName} number={JSON.parse(e).number} />) : null}



              </div>
              {Trailer ? <p style={{ width: "93%", maxHeight: "2cm" }}>{Trailer.animeDescription}</p> : null}


            </div>

          </div>
          <div class="subFirstSection">
            <div class="newAnimeBar"><h4 style={{ marginLeft: "1cm", color: "white" }}>New Animes</h4 ></div>
            <div class="newAnimes">
              {true && trailers2.map((e, i) => <NewAnimes Rate={9 - i} animeName={e.animeName} animePicture={e.animePicture} season={e.season} Id={e._id} /> )}

            </div>
          </div>
        </section>

      </div>
    </div>
  )
}

export default Random