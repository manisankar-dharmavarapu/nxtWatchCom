import React, { Component } from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import "./App.css"
import Layout from "./components/Layout"
import Home from "./components/Home"
import Trending from "./components/Trending"
import Gaming from "./components/Gaming"
import SavedVideos from "./components/SavedVideos"
import LoginForm from "./components/LoginForm"
import VideoDetails from "./components/VideoDetails"
import NotFound from './components/NotFound'
import ProtectedRoute from "./components/ProtectedRoute"
import ThemeContext from "./context/ThemeContext"
import VideoContext from "./context/VideoContext"
import LikedVideos from "./context/LikedVideos"
import DisLikedVideos from "./context/DisLikedVideos"

class App extends Component {
  state = {
    isDarkTheme: false,
    savedVideos: [],
    likedVideos: [],
    disLikedVideos: [],
  }

  toggleTheme = () => {
    this.setState((prevState) => ({ isDarkTheme: !prevState.isDarkTheme }))
  }

  onSaveVideo = (video) => {
    const { savedVideos } = this.state
    this.setState({ savedVideos: [...savedVideos, video] })
  }
  // this.setState({videos:{...this.state.videos,savedVideos:[...this.state.videos.savedVideos]}})

  onRemoveSavedVideo = (id) => {
    const { savedVideos } = this.state
    const filteredVideos = savedVideos.filter((video) => video.id !== id)
    this.setState({ savedVideos: filteredVideos })
  }

  onLikeVideo = (video) => {
    const { likedVideos } = this.state
    this.setState({ likedVideos: [...likedVideos, video] })
  }

  onRemoveLike = (id) => {
    const { likedVideos } = this.state
    const filteredVideos = likedVideos.filter((video) => video.id !== id)
    this.setState({ likedVideos: filteredVideos })
  }

  onDisLikeVideo = (video) => {
    const { disLikedVideos } = this.state
    this.setState({ disLikedVideos: [...disLikedVideos, video] })
  }

  onRemoveDisLike = (id) => {
    const { disLikedVideos } = this.state
    const filteredVideos = disLikedVideos.filter((video) => video.id !== id)
    this.setState({ disLikedVideos: filteredVideos })
  }

  render() {
    const { isDarkTheme, savedVideos, likedVideos, disLikedVideos } = this.state
    return (
      <DisLikedVideos.Provider
        value={{
          disLikedVideos: disLikedVideos,
          onDisLikeVideo: this.onDisLikeVideo,
          onRemoveDisLike: this.onRemoveDisLike,
        }}
      >
        <LikedVideos.Provider
          value={{
            likedVideos: likedVideos,
            onLikeVideo: this.onLikeVideo,
            onRemoveLike: this.onRemoveLike,
          }}
        >
          <VideoContext.Provider
            value={{
              savedVideos: savedVideos,
              onSaveVideo: this.onSaveVideo,
              onRemoveSavedVideo: this.onRemoveSavedVideo,
            }}
          >
            <ThemeContext.Provider
              value={{
                isDarkTheme,
                toggleTheme: this.toggleTheme,
              }}
            >
              <Switch>
                <Route exact path="/login" component={LoginForm} />
                <Layout>
                  <Switch>
                    <ProtectedRoute exact path="/" component={Home} />
                    <ProtectedRoute
                      exact
                      path="/trending"
                      component={Trending}
                    />
                    <ProtectedRoute exact path="/gaming" component={Gaming} />
                    <ProtectedRoute
                      exact
                      path="/savedvideos"
                      component={SavedVideos}
                    />
                    <ProtectedRoute
                      exact
                      path="/videos/:id"
                      component={VideoDetails}
                    />
                    <ProtectedRoute
                      exact
                      path="/not-found"
                      component={NotFound}
                    />
                    <Redirect to="/not-found" />
                  </Switch>
                </Layout>
              </Switch>
            </ThemeContext.Provider>
          </VideoContext.Provider>
        </LikedVideos.Provider>
      </DisLikedVideos.Provider>
    )
  }
}

export default App
