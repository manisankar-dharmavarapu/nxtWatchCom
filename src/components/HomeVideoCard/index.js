import React from "react"
import { CardMedia, Card, Grid } from "@mui/material"
import { GoPrimitiveDot } from "react-icons/go"
import {Link} from 'react-router-dom'
import ThemeContext from "../../context/ThemeContext"
import "./index.css"

function index(props) {
  const { video } = props
  const {
    channelName,
    channelProfileUrl,
    id,
    publishedAt,
    thumbnailUrl,
    title,
    viewCount,
  } = video

 return (
   <ThemeContext.Consumer>
     {(value) => {
       const {isDarkTheme}=value
       const titleStyle = isDarkTheme
         ? "dark-theme-title video-title"
         : "video-title"
       return (
         <Grid item xs={12} sm={6} md={4} lg={4}>
           <Link to={`/videos/${id}`} className="link-styles">
             <Card sx={{ boxShadow: "none", backgroundColor: "transparent" }}>
               <CardMedia
                 component="img"
                 height="100%"
                 image={thumbnailUrl}
                 alt={title}
               />
               <div className="video-content">
                 <div className="video-title-container">
                   <img
                     className="video-channelImg"
                     src={channelProfileUrl}
                     alt="channel image"
                   />
                   <p className={titleStyle}>{title}</p>
                 </div>
                 <div className="view-container">
                   <p className="video-channelname">{channelName}</p>
                   <p className="view-published">
                     {`${viewCount}Views`}
                     <span className="dot-icon">
                       <GoPrimitiveDot />
                     </span>
                     {publishedAt}
                   </p>
                 </div>
               </div>
             </Card>
           </Link>
         </Grid>
       )
     }}
   </ThemeContext.Consumer>
 )
}

export default index
