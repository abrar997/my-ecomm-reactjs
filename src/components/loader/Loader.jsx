import { SpinnerDiamond } from "spinners-react";
import ReactDom from "react-dom";
const Loader = () => {
  return ReactDom.createPortal(
    <div className="flex items-center justify-center absolute inset-0 z-50">
      <SpinnerDiamond
        size={150}
        thickness={100}
        speed={100}
        color="teal"
        secondaryColor="#fff"
      />
    </div>,
    document.getElementById("loader")
  );
};

export default Loader;
