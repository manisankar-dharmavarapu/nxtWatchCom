import React, { Component } from "react"
import TrendingVideoCard from "../TrendingVideoCard"
import { Container, Grid } from "@mui/material"
import ThemeContext from "../../context/ThemeContext"
import VideoContext from "../../context/VideoContext"
import { HiFire } from "react-icons/hi"
import "./index.css"

export default class Home extends Component {
  state = {
    bannerStatus: true,
  }

  noVideosView = () => (
    <div className="loader-styles">
      <img
        className="failure-img"
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
        alt="no saved videos"
      />
      <h2 className="failure-title">No Saved Videos found</h2>
      <p className="novideos-description">
        You can save your videos while watching them
      </p>
    </div>
  )

  renderVideosView = () => (
    <VideoContext>
      {(value) => {
        const { savedVideos } = value
        return (
          <Grid
            container
            spacing={2}
            style={{ minHeight: "84vh" }}
            className="video-main-container"
          >
            {savedVideos.length === 0
              ? this.noVideosView()
              : savedVideos.map((video) => (
                  <TrendingVideoCard key={video.id} video={video} />
                ))}
          </Grid>
        )
      }}
    </VideoContext>
  )

  render() {
    return (
      <ThemeContext.Consumer>
        {(value) => {
          const { isDarkTheme } = value
          const homeContainer = isDarkTheme
            ? "home-dark-container"
            : "home-main-container"
          const sectionContainer = isDarkTheme
            ? "dark-logo-container section-logo-container"
            : "section-logo-container"
          const section = isDarkTheme
            ? "darsk-section section-heading"
            : "section-heading"
          return (
            <>
              <div className={section}>
                <div className={sectionContainer}>
                  <HiFire className="section-logo" />
                </div>
                <h3 className="section-title">Saved Videos</h3>
              </div>
              <Container maxWidth="xl" className={homeContainer}>
                {this.renderVideosView()}
              </Container>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
