import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Product } from "../../components";

const CategoryPage = () => {
  const { type } = useParams();
  const products = useSelector((state) => state.products);
  const data = products.find((product) => product.category === type);

  return (
    <div>
      {data.length > 0 ? (
        <div>
          {data.map((item, idx) => (
            <Product product={item} key={idx} />
          ))}
        </div>
      ) : (
        <p>no products</p>
      )}
    </div>
  );
};

export default CategoryPage;
