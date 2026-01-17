import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  setFilters,
  resetFilters,
} from "../../redux/slice/productSlice";
import { addToCart } from "../../redux/slice/cartSlice";
import Loader from "../../components/loader/Loader";
import Product from "../../components/reusable/Product/Product";

const Gallery = () => {
  const dispatch = useDispatch();
  const { products, filteredProducts, loading, error, filters } = useSelector(
    (state) => state.products
  );
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (products.length > 0) {
      const uniqueCategories = [...new Set(products.map((p) => p.category))];
      setCategories(uniqueCategories);
    }
  }, [products]);

  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      })
    );
  };

  const handleCategoryChange = (category) => {
    dispatch(setFilters({ category }));
  };

  const handlePriceChange = (minPrice, maxPrice) => {
    dispatch(setFilters({ minPrice, maxPrice }));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  if (loading) return <Loader />;
  if (error)
    return <div className="text-red-500 text-center py-8">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-[#232222] py-8">
      <h1 className="text-4xl text-teal-500 font-semibold text-center mb-12">
        Product Gallery
      </h1>
      <div className="grid grid-cols-3">
        <div className="px-4 cols-span-1">
          {/* Filters Section */}
          <div className="mb-8 bg-[#232222] p-6 rounded border border-teal-900">
            <div className="grid grid-cols-1  gap-6">
              {/* Category Filter */}
              <div>
                <label className="text-teal-500 font-semibold block mb-3">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full bg-[#1a1a1a] text-white border border-teal-500 rounded px-3 py-2 focus:outline-none focus:border-teal-400"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Min Price Filter */}
              <div>
                <label className="text-teal-500 font-semibold block mb-3">
                  Min Price: ${filters.minPrice}
                </label>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={filters.minPrice}
                  onChange={(e) =>
                    handlePriceChange(
                      parseInt(e.target.value),
                      filters.maxPrice
                    )
                  }
                  className="w-full accent-teal-500"
                />
              </div>

              {/* Max Price Filter */}
              <div>
                <label className="text-teal-500 font-semibold block mb-3">
                  Max Price: ${filters.maxPrice}
                </label>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={filters.maxPrice}
                  onChange={(e) =>
                    handlePriceChange(
                      filters.minPrice,
                      parseInt(e.target.value)
                    )
                  }
                  className="w-full accent-teal-500"
                />
              </div>
            </div>

            {/* Reset Button */}
            <button
              onClick={handleResetFilters}
              className="mt-6 bg-teal-500 hover:bg-teal-700 text-white font-semibold py-2 px-6 rounded transition-colors duration-200"
            >
              Reset Filters
            </button>

            {/* Results Count */}
            <p className="text-slate-300 text-sm mt-4">
              Showing {filteredProducts.length} of {products.length} products
            </p>
          </div>
        </div>
        <div className="col-span-2 pr-4">
          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, idx) => (
                <Product
                  key={product.id}
                  product={product}
                  handleAddToCart={handleAddToCart}
                  idx={idx}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-slate-300 text-lg">
                No products found matching your filters.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-4 text-teal-500 hover:text-teal-400 underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
