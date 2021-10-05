import React from "react"

const LikedVideos = React.createContext({
  likedVideos: [],
  onLikeVideo: () => {},
  onRemoveLike: () => {},
})

export default LikedVideos
