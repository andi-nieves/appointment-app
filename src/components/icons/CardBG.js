import * as React from "react"
import Svg, { G, Rect, Ellipse, Defs, ClipPath } from "react-native-svg"

function CardBG(props) {
  return (
    <Svg
      width={311}
      height={136}
      viewBox="0 0 311 136"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_53_14929)">
        <Rect y={0.5} width={311} height={135} rx={8} fill="#FF9E00" />
        <Ellipse cx={116.5} cy={111} rx={167.5} ry={152.5} fill="#FF7900" />
      </G>
      <Defs>
        <ClipPath id="clip0_53_14929">
          <Rect y={0.5} width={311} height={135} rx={8} fill="#fff" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default CardBG
