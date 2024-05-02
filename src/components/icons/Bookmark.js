import * as React from "react"
import Svg, { Path } from "react-native-svg"

function BookmarkIcon(props) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M13.75 1.875h-7.5A1.875 1.875 0 004.375 3.75v14.375l5.625-5 5.625 5V3.75a1.875 1.875 0 00-1.875-1.875z"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default BookmarkIcon
