import * as React from "react";
import Svg, { Path } from "react-native-svg";

function ArrowLeftComponent() {
  return (
    <Svg width={31} height={31} viewBox='0 0 31 31' fill='none'>
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M12.447 22.816a1.493 1.493 0 01-2.11 0l-5.97-5.97a1.493 1.493 0 010-2.11l5.97-5.97a1.493 1.493 0 012.11 2.11l-3.422 3.422h17.292a1.492 1.492 0 110 2.985H9.025l3.422 3.422a1.492 1.492 0 010 2.11z'
        fill='#191A24'
      />
    </Svg>
  );
}

export default ArrowLeftComponent;
