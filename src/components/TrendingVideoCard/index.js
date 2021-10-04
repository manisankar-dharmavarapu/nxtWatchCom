import { Grid, CardMedia } from "@mui/material"
import React from "react"
import { GoPrimitiveDot } from "react-icons/go"
import { Link } from "react-router-dom"
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
    <>
      <Grid item xs={12} sm={4} md={4} lg={4}>
        <Link to={`/videos/${id}`} className="link-styles">
          <CardMedia component="img" image={thumbnailUrl} alt="video" />
        </Link>
      </Grid>
      <Grid item xs={12} sm={8} md={8} lg={8}>
        <Link to={`/videos/${id}`} className="link-styles">
          <p className="trending-title">{title}</p>
          <p className="channel-view-item">{channelName}</p>
          <p className="view-published channel-view-item">
            {`${viewCount}Views`}
            <span className="dot-icon">
              <GoPrimitiveDot />
            </span>
            {publishedAt}
          </p>
        </Link>
      </Grid>
    </>
  )
}

export default index
