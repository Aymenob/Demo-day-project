import React from 'react'
import { useNavigate } from 'react-router-dom'

const SearchTrailer = ({ animeName, animePicture, season, number, url, Id }) => {
    const Navigate = useNavigate()

    return (
        <div>
            <div>
                <button class="animePicture-btn" onClick={() => {
                    Navigate(`/watch/${animeName}/${season||0}`) 
                }} type="button" >
                    <img style={{ marginLeft: "-0.2cm", marginTop: "-0.1cm", position: "relative", minWidth: "4.5cm", maxWidth: '4.5cm', minHeight: "5.5cm", maxHeight: '5.5cm', width: "2.1cm" }} alt="" src={animePicture} />

                </button>
            </div>
            <div class="animeTitle">{animeName}</div>
            <div class="animeSubTitle">Season:{season}</div>
        </div>
    )
}

export default SearchTrailer