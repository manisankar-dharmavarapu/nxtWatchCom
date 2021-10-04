import React, { Component } from "react"
import Cookies from "js-cookie"
import Loader from "react-loader-spinner"
import { GoPrimitiveDot } from "react-icons/go"
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai"
import { MdPlaylistAdd } from "react-icons/md"
import { Button, Container, Grid } from "@mui/material"
import ReactPlayer from "react-player"
import ThemeContext from "../../context/ThemeContext"
import VideoContext from "../../context/VideoContext"
import TrendingVideoCard from '../TrendingVideoCard'
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

export default class VideoDetails extends Component {
  state = {
    videoDetails: [],
    similarVideos:[],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount = () => {
    this.getVideos()
  }

  updatedVideoDetails = (video) => ({
    channelName: video.channel.name,
    channelProfileUrl: video.channel.profile_image_url,
    channelSubscribersCount: video.channel.subscriber_count,
    id: video.id,
    description: video.description,
    publishedAt: video.published_at,
    thumbnailUrl: video.thumbnail_url,
    title: video.title,
    videoUrl: video.video_url,
    viewCount: video.view_count,
  })

  getVideos = async () => {
    this.setState({ apiStatus: apiStatusConstants.inProgress })
    const { match } = this.props
    const { params } = match
    const { id } = params
    const jwtToken = Cookies.get("jwt_token")
    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "GET",
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = this.updatedVideoDetails(data.video_details)
      const similarVideosData = data.similar_videos.map((video) => ({
        channelName: video.channel.name,
        channelProfileUrl: video.channel.profile_image_url,
        id: video.id,
        publishedAt: video.published_at,
        thumbnailUrl: video.thumbnail_url,
        title: video.title,
        viewCount: video.view_count,
      }))
      this.setState({
        videoDetails: updatedData,
        similarVideos:similarVideosData,
        apiStatus: apiStatusConstants.success,
      })
    } else if (response.status === 400) {
      this.setState({ apiStatus: apiStatusConstants.failure })
    }
  }

  renderVideosView = () => (
    <ThemeContext.Consumer>
      {(value) => {
        const { isDarkTheme } = value
        const reactionBtn = isDarkTheme
          ? "dark-reaction-item reaction-item"
          : "reaction-item"
          const {similarVideos}=this.state
        return (
          <VideoContext.Consumer>
            {(videoStatus) => {
              const { videoDetails, isDark } = this.state
              const {
                channelName,
                channelProfileUrl,
                channelSubscribersCount,
                description,
                id,
                publishedAt,
                thumbnailUrl,
                title,
                videoUrl,
                viewCount,
              } = videoDetails
              const {
                savedVideos,
                onSaveVideo,
                onRemoveSavedVideo,
              } = videoStatus
              const isSaved = savedVideos.find((video) => video.id === id)

              const onSaveVideoClicked = () => {
                if (isSaved) {
                  onRemoveSavedVideo(id)
                } else {
                  onSaveVideo(videoDetails)
                }
              }
              const saveVideoStyle = isDarkTheme
                ? isSaved
                  ? "reaction-item active-btn"
                  : "dark-reaction-item reaction-item"
                : isSaved
                ? "reaction-item active-btn"
                : "reaction-item"
              //  isSaved
              //   ? "reaction-item active-btn"
              //   : "reaction-item"

              return (
                <Grid container spacing={2} className="video-main-container">
                  <Grid item xs={12} md={12} lg={12}>
                    <ReactPlayer
                      className="videoFrame"
                      width="100%"
                      height={screen.width === 1440 ? "490px" : "360px"}
                      url={videoUrl}
                      light={thumbnailUrl}
                      playing
                      controls
                    />
                  </Grid>
                  <Grid item xs={12} md={12} lg={12}>
                    <p>{title}</p>
                    <div className="view-reaction-conatainer">
                      <p className="view-published">
                        {`${viewCount}View`}
                        <span className="dot-icon">
                          <GoPrimitiveDot />
                        </span>
                        {publishedAt}
                      </p>
                      <div className="reaction-conatainer">
                        <button className={reactionBtn}>
                          <AiOutlineLike />
                          Like
                        </button>
                        <button className={reactionBtn}>
                          <AiOutlineDislike />
                          Dislike
                        </button>
                        <button
                          className={saveVideoStyle}
                          onClick={onSaveVideoClicked}
                        >
                          <MdPlaylistAdd />
                          Save Video
                        </button>
                      </div>
                    </div>
                    <hr />
                    <div className="chanel-details">
                      <img
                        className="chanel-logo"
                        src={channelProfileUrl}
                        alt="channel image"
                      />
                      <div className="chanel">
                        <p className="sub-count">{channelName}</p>
                        <p>{channelSubscribersCount}</p>
                      </div>
                    </div>
                    <p className="chanel-description">{description}</p>
                  </Grid>
                  <Grid item xs={12}>
                    <h3>Similar Videos</h3>
                  </Grid>
                  {similarVideos.length === 0
                    ? this.noVideosView()
                    : similarVideos.map((video) => (
                        <TrendingVideoCard key={video.id} video={video} />
                      ))}
                </Grid>
              )
            }}
          </VideoContext.Consumer>
        )
      }}
    </ThemeContext.Consumer>
  )

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
          <div className="loader-styles">
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
    return (
      <ThemeContext.Consumer>
        {(value) => {
          const { isDarkTheme } = value
          const homeContainer = isDarkTheme
            ? "home-dark-container"
            : "home-main-container"
          return (
            <Container maxWidth="xl" className={homeContainer}>
              {this.renderVideos()}
            </Container>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
