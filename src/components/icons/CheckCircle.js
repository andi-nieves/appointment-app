import * as React from "react"
import Svg, { Path } from "react-native-svg"

function CheckCircleIcon(props) {
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
        d="M17.5 10c0-4.14-3.36-7.5-7.5-7.5-4.14 0-7.5 3.36-7.5 7.5 0 4.14 3.36 7.5 7.5 7.5 4.14 0 7.5-3.36 7.5-7.5z"
        stroke="#fff"
        strokeWidth={1.5}
        strokeMiterlimit={10}
      />
      <Path
        d="M13.75 6.875l-5.25 6.25-2.25-2.5"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default CheckCircleIcon
