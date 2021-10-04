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
import ThemeContext from "./context/ThemeContext"
import VideoContext from "./context/VideoContext"
import NotFound from './components/NotFound'
import ProtectedRoute from "./components/ProtectedRoute"

class App extends Component {
  state = {
    isDarkTheme: false,
    savedVideos: [],
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
    this.setState({savedVideos:filteredVideos})
  }

  render() {
    const { isDarkTheme, savedVideos } = this.state
    return (
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
              <ProtectedRoute exact path="/trending" component={Trending} />
              <ProtectedRoute exact path="/gaming" component={Gaming} />
              <ProtectedRoute exact path="/savedvideos" component={SavedVideos} />
              <ProtectedRoute exact path="/videos/:id" component={VideoDetails} />
              <ProtectedRoute exact path="/not-found" component={NotFound}/>
              <Redirect to="/not-found"/>
              </Switch>
            </Layout>
          </Switch>
        </ThemeContext.Provider>
      </VideoContext.Provider>
    )
  }
}

export default App
