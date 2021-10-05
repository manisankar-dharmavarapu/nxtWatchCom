import React from "react"

const DisLikedVideos = React.createContext({
  disLikedVideos: [],
  onDisLikeVideo: () => {},
  onRemoveDisLike: () => {},
})

export default DisLikedVideos
