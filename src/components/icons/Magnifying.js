import * as React from "react"
import Svg, { Path } from "react-native-svg"

function MagnifyingIcon(props) {
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
        d="M8.636 2.5a6.136 6.136 0 100 12.273 6.136 6.136 0 000-12.273v0z"
        stroke="#fff"
        strokeWidth={1.5}
        strokeMiterlimit={10}
      />
      <Path
        d="M13.214 13.214L17.5 17.5"
        stroke="#fff"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
      />
    </Svg>
  )
}

export default MagnifyingIcon
