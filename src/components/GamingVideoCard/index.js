import React from "react"
import { CardMedia, Card, Grid } from "@mui/material"
import { GoPrimitiveDot } from "react-icons/go"
import { Link } from "react-router-dom"
import ThemeContext from "../../context/ThemeContext"
import "./index.css"

function index(props) {
  const { video } = props
  const {
    id,
    thumbnailUrl,
    title,
    viewCount,
  } = video

  return (
    <ThemeContext.Consumer>
      {(value) => {
        const { isDarkTheme } = value
        const titleStyle = isDarkTheme
          ? "dark-theme-title video-title"
          : "video-title"
        return (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Link to={`/videos/${id}`} className="link-styles">
              <Card sx={{ boxShadow: "none", backgroundColor: "transparent" }}>
                <CardMedia
                  component="img"
                  height="80%"
                  image={thumbnailUrl}
                  alt={title}
                />
                <div className={titleStyle}>
                  <p className="gaming-title">{title}</p>
                  <p className="gaming-watching">{`${viewCount} Watching Worldwide`}</p>
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
