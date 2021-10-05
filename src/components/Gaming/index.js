import React, { Component } from "react"
import Cookies from "js-cookie"
import Loader from "react-loader-spinner"
import { SiYoutubegaming } from "react-icons/si"
import { Button, Container, Grid } from "@mui/material"
import GamingVideoCard from "../GamingVideoCard"
import ThemeContext from "../../context/ThemeContext"
import "./index.css"

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
}

const lightFailureView =
  "https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
const darkFailureView =
  "https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png"

export default class Home extends Component {
  state = {
    videosData: [],
    bannerStatus: true,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount = () => {
    this.getVideos()
  }

  getVideos = async () => {
    this.setState({ apiStatus: apiStatusConstants.inProgress })
    const jwtToken = Cookies.get("jwt_token")
    const url = "https://apis.ccbp.in/videos/gaming"
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "GET",
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.videos.map((video) => ({
        id: video.id,
        thumbnailUrl: video.thumbnail_url,
        title: video.title,
        viewCount: video.view_count,
      }))
      this.setState({
        videosData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else if (response.status === 400) {
      this.setState({ apiStatus: apiStatusConstants.failure })
    }
  }

  renderVideosView = () => {
    const { videosData } = this.state
    return (
      <Grid container spacing={2} className="video-main-container">
        {videosData.length === 0
          ? this.noVideosView()
          : videosData.map((video) => (
              <GamingVideoCard key={video.id} video={video} />
            ))}
      </Grid>
    )
  }

  renderLoadingView = () => (
    <div className="loader-styles">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <ThemeContext.Consumer>
      {(value) => {
        const { isDarkTheme } = value
        const failureImg = isDarkTheme ? darkFailureView : lightFailureView
        return (
          <div className="failure-styles">
            <img className="failure-img" src={failureImg} alt="failure view" />
            <h2 className="failure-title">Oops! Something Went Wrong</h2>
            <p>We cannot seem to find the page you are looking for</p>
            <Button
              variant="contained"
              type="button"
              className="retry-btn"
              onClick={this.onRetry}
            >
              Retry
            </Button>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )

  renderVideos = () => {
    const { apiStatus } = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVideosView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const { videosData } = this.state
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
                  <SiYoutubegaming className="section-logo" />
                </div>
                <h3 className="section-title">Gaming</h3>
              </div>
              <Container maxWidth="xl" className={homeContainer}>
                {this.renderVideos()}
              </Container>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
