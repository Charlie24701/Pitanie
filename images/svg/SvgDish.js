import * as React from "react"
import Svg, { Path } from "react-native-svg"


const SvgDish = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size}
    height={props.size}
    fill="none"
    {...props}
  >
    <Path
      fill={props.color}
      scale={props.size/50}
      fillRule="evenodd"
      d="M26.227 9.588a1.588 1.588 0 0 0-3.175 0v2.972A20.64 20.64 0 0 0 4 33.138c0 .877.71 1.588 1.588 1.588H43.69a1.588 1.588 0 0 0 1.588-1.588A20.64 20.64 0 0 0 26.227 12.56V9.588Zm-1.587 6.086A17.464 17.464 0 0 0 7.248 31.551h34.784A17.464 17.464 0 0 0 24.64 15.674ZM4 40.018c0-.877.71-1.588 1.588-1.588H43.69a1.588 1.588 0 0 1 0 3.175H5.588c-.877 0-1.588-.71-1.588-1.587Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default SvgDish
