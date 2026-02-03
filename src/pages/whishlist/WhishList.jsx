import { useSelector } from "react-redux";

const WhishList = () => {
  const data = useSelector((state) => state.WhishList);
  console.log(data);

  return <div className="min-h-screen bg-[#232222] py-8"></div>;
};

export default WhishList;
