import React, { Component } from "react"
import Cookies from "js-cookie"
import Loader from "react-loader-spinner"
import HomeVideoCard from "../HomeVideoCard"
import { Button, Container, Grid, IconButton } from "@mui/material"
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai"
import { Box } from "@mui/system"
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
    searchInput: "",
    bannerStatus: true,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount = () => {
    this.getVideos()
  }

  getVideos = async () => {
    this.setState({ apiStatus: apiStatusConstants.inProgress })
    const { searchInput } = this.state
    const jwtToken = Cookies.get("jwt_token")
    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
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
        channelName: video.channel.name,
        channelProfileUrl: video.channel.profile_image_url,
        id: video.id,
        publishedAt: video.published_at,
        thumbnailUrl: video.thumbnail_url,
        title: video.title,
        viewCount: video.view_count,
      }))
      this.setState({
        videosData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({ apiStatus: apiStatusConstants.failure })
    }
  }

  onSearchInput = (event) => {
    this.setState({ searchInput: event.target.value })
  }
  onEnterSearch = () => {
    this.getVideos()
  }

  onCloseBanner = () => {
    this.setState({ bannerStatus: false })
  }
  renderBanner = () => (
    <div>
      <div className="banner-container">
        <div className="banner-logo">
          <img
            className="logo-img"
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="logo"
          />
          <IconButton onClick={this.onCloseBanner}>
            <AiOutlineClose />
          </IconButton>
        </div>
        <p>Buy Nxt Watch Premium prepaid palns with UPI</p>
        <Button variant="outlined">GET IT NOW</Button>
      </div>
    </div>
  )

  noVideosView = () => (
    <div className="loader-styles">
      <img
        className="failure-img"
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
        alt="failure view"
      />
      <h2 className="failure-title">No Search results found</h2>
      <p>Try different key words or remove search filter</p>
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

  renderVideosView = () => {
    const { videosData } = this.state
    return (
      <Grid container spacing={2} className="video-main-container">
        {videosData.length === 0
          ? this.noVideosView()
          : videosData.map((video) => (
              <HomeVideoCard key={video.id} video={video} />
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
    const { searchInput, bannerStatus, videosData } = this.state
    return (
      <ThemeContext.Consumer>
        {(value) => {
          const { isDarkTheme } = value
          const homeContainer = isDarkTheme
            ? "home-dark-container"
            : "home-main-container"
          return (
            <>
              {bannerStatus ? this.renderBanner() : ""}
              <Container maxWidth="xl" className={homeContainer}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={9} md={9} lg={9}>
                    <Box
                      className="search-container"
                      sx={{ width: { lg: "55%", md: "70%" } }}
                    >
                      <input
                        className="search-input"
                        type="search"
                        value={searchInput}
                        onChange={this.onSearchInput}
                      />
                      <button
                        className="search-btn"
                        onClick={this.onEnterSearch}
                      >
                        <AiOutlineSearch style={{ fontSize: "20px" }} />
                      </button>
                    </Box>
                  </Grid>
                </Grid>
                {this.renderVideos()}
              </Container>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
