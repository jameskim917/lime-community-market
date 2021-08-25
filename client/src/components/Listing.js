import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { likeListing } from '../actions/listings'
import comment from '../assets/comments.svg'
import like from '../assets/like.svg'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Tooltip from '../components/Tooltip.js';

const Listing = ({listing, user}) => {
    const listingId = listing._id
    const userData = JSON.parse(sessionStorage.getItem('userData'))
    const userId = userData?.sub
    const [listingData, setListingData] = useState(listing)
    const history = useHistory()
    const [toggle, setToggle] = useState(false)

    const handleLike = () => {
        if (userData) { 
            axios
                .patch(`http://localhost:5000/listings/${listingId}/likeListing`, userId)
                .then((response) => {
                    setListingData(response.data)
                    console.log('(un)liked & listing data updated')
                })
        } else {
            setToggle(true)
            setTimeout(() => {
                setToggle(false)
            }, 2500)
        }
    }

    
    
    return (
        <div className="listing">
            <div className="listing-img-div">
                <img src={listing.selectedFile[0].base64} />
            </div>
            <div className="listing-tooltip">
                
                    <button className="listing-tooltip-like p-1" onClick={handleLike}>
                        <img src={like} />
                    </button>
                    <span><h5 className="p-1">{listingData.likers.length}</h5></span>
                
                
                    <button className="listing-tooltip-comment p-1">
                    <img src={comment} />
                    </button>
                    <span><h5 className="p-1">{listing.commentCount}</h5></span>
                    <Tooltip content="Please sign in to like and comment" toggle={toggle} setToggle={setToggle}/>
            </div>
            <div className="listing-title">
                <h3>{listing.title}</h3>
            </div>
            <div className="listing-price">
                <h3>${listing.price}</h3>
            </div>
            <div className="listing-btn">
                {/* <Link to={`listings/${listingId}`}> */}
                    <button className="button-primary" 
                        onClick={() => {
                        history.push(`/listings/${listingId}`)
                        }}
                    >Details</button>
                {/* </Link> */}
            </div>
        </div>
    )
}

export default Listing
