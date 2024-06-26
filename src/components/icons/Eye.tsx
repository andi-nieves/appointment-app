import * as React from "react";
import Svg, { Path } from "react-native-svg";

function EyeIcon(props: { type?: string | undefined }) {
  return (
    <Svg width={12} height={12} viewBox='0 0 12 12' fill='none' {...props}>
      {props.type === "hide" ? (
        <>
          <Path
            d='M1.877 1.736l.014.013 1.048 1.049.256.256.324-.163a5.475 5.475 0 012.48-.59h0A5.502 5.502 0 0111.2 6 5.509 5.509 0 019.429 8.5l-.438.349.396.396.88.88a.1.1 0 01-.004.138l.354.353-.354-.354a.1.1 0 01-.138.003L4.523 4.665l.178-.105.634.634.204.204.278-.074a.702.702 0 01.859.859l-.074.278.204.204.908.908.456.456.328-.555a2.9 2.9 0 00-3.618-4.15l-.6-.6v1.698L1.735 1.875a.1.1 0 01.143-.14z'
            fill='#6A6E95'
            stroke='#6A6E95'
          />
          <Path
            d='M7.473 10.018L5.85 8.395a2.4 2.4 0 01-2.245-2.244L1.4 3.947A5.988 5.988 0 00.275 6a6.003 6.003 0 007.197 4.018z'
            fill='#6A6E95'
          />
        </>
      ) : (
        <>
          <Path
            d='M6.495 6.495l.354.353-.354-.353a.7.7 0 11-.99-.99.7.7 0 01.99.99z'
            fill='#6A6E95'
            stroke='#6A6E95'
          />
          <Path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M.275 6a6.002 6.002 0 0111.45 0A6.002 6.002 0 01.275 6zM8.4 6a2.4 2.4 0 11-4.8 0 2.4 2.4 0 014.8 0z'
            fill='#6A6E95'
          />
        </>
      )}
    </Svg>
  );
}

export default EyeIcon;
