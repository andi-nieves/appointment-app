import React, { useState } from "react";
import Svg, { Path } from "react-native-svg";
import { Animated, Easing } from "react-native";

function SpinnerSvg({
  height = 81,
  width = 81,
  ...props
}: {
  height?: number;
  width?: number;
  props?: object;
}) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox='0 0 81 80'
      fill='none'
      {...props}
    >
      <Path
        d='M80.5 40c0 22.091-17.909 40-40 40S.5 62.091.5 40s17.909-40 40-40 40 17.909 40 40zM7.765 40c0 18.079 14.656 32.735 32.735 32.735S73.235 58.079 73.235 40 58.579 7.265 40.5 7.265 7.765 21.921 7.765 40z'
        fill='#C9CBD9'
      />
      <Path
        d='M75.674 30.76c1.94-.51 3.116-2.503 2.432-4.39A40 40 0 0033.888.55c-1.979.332-3.138 2.336-2.628 4.276.51 1.94 2.495 3.079 4.48 2.787a32.735 32.735 0 0135.305 20.615c.721 1.872 2.689 3.042 4.63 2.532z'
        fill='#6F3CEB'
      />
    </Svg>
  );
}

export const LoadingSpinner = React.memo(({ size = 50 }: { size: number }) => {
  const [spinAnim] = useState(new Animated.Value(0));
  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  Animated.loop(
    Animated.timing(spinAnim, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: true,
    })
  ).start();

  return (
    <Animated.View
      style={{
        transform: [{ rotate: spin }],
        height: size,
        width: size,
      }}
    >
      <SpinnerSvg height={size} width={size} />
    </Animated.View>
  );
});

export default LoadingSpinner;
