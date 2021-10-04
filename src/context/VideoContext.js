import React from "react"

const VideoContext = React.createContext({
  savedVideos: [],
  onSaveVideo: () => {},
  onRemoveSavedVideo: () => {},
})

export default VideoContext
