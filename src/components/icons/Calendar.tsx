import * as React from "react"
import Svg, { G, Path, Defs, ClipPath, SvgProps } from "react-native-svg"

function CalendarIcon(props: SvgProps) {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      {...props}
    >
      <G clipPath="url(#clip0_4_1026)">
        <Path
          d="M14.625 2.813H3.375c-.932 0-1.688.755-1.688 1.687v10.125c0 .932.756 1.688 1.688 1.688h11.25c.932 0 1.688-.756 1.688-1.688V4.5c0-.932-.756-1.688-1.688-1.688z"
          stroke="#FF7900"
          strokeWidth={1.5}
          strokeLinejoin="round"
        />
        <Path
          d="M10.406 9a.844.844 0 100-1.688.844.844 0 000 1.688zM13.219 9a.844.844 0 100-1.688.844.844 0 000 1.688zM10.406 11.813a.844.844 0 100-1.688.844.844 0 000 1.688zM13.219 11.813a.844.844 0 100-1.688.844.844 0 000 1.688zM4.781 11.813a.844.844 0 100-1.688.844.844 0 000 1.688zM7.594 11.813a.844.844 0 100-1.688.844.844 0 000 1.688zM4.781 14.625a.844.844 0 100-1.688.844.844 0 000 1.688zM7.594 14.625a.844.844 0 100-1.688.844.844 0 000 1.688zM10.406 14.625a.844.844 0 100-1.688.844.844 0 000 1.688z"
          fill="#FF6D00"
        />
        <Path
          d="M4.5 1.688v1.125m9-1.126v1.125"
          stroke="#FF6D00"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M16.313 5.625H1.688"
          stroke="#FF6D00"
          strokeWidth={1.5}
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_4_1026">
          <Path fill="#fff" d="M0 0H18V18H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default CalendarIcon
