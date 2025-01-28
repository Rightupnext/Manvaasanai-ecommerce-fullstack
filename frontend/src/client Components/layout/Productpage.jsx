import React, { useState, useEffect } from "react";
import ReactImageMagnify from "react-image-magnify";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../store/reducers/productReducers";
import "./ProductPage.css";
import FeedBackForm from "./FeedBackForm";

const ProductPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const { title } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.products);
  const [ReviewShow, setReviewShow] = useState(false);
  useEffect(() => {
    dispatch(getProduct(title));
  }, [dispatch, title]);

  useEffect(() => {
    if (product && product.image && product.image.length > 0) {
      setSelectedImage(product.image[0]);
    }
  }, [product]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>Product not found.</p>;

  const getImageURL = (filename) =>
    `http://localhost:5000/api/products/images/${filename}`;
  const capitalizeWords = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };
  const showReview = () => {
    setReviewShow(!ReviewShow);
  };
  return (
    <>
      <div className="container mt-4">
        <div className="row">
          {/* Left: Product Images */}
          <div className="col-md-6">
            <div className="product-images">
              <div className="thumbnail-container">
                {product.image?.map((filename, index) => (
                  <img
                    key={index}
                    className={`thumbnail ${
                      selectedImage === filename ? "active" : ""
                    }`}
                    src={getImageURL(filename)}
                    alt={`Thumbnail ${index + 1}`}
                    onClick={() => setSelectedImage(filename)}
                  />
                ))}
              </div>

              <div className="main-image-container ">
                <ReactImageMagnify
                  {...{
                    smallImage: {
                      alt: "Product",
                      src: getImageURL(selectedImage),
                      width: 400,
                      height: 400,
                    },
                    largeImage: {
                      src: getImageURL(selectedImage),
                      width: 1200,
                      height: 1200,
                    },
                    enlargedImageContainerDimensions: {
                      width: "150%",
                      height: "100%",
                    },
                    isHintEnabled: true,
                    enlargedImagePosition: "beside",
                  }}
                />
              </div>
              {/* <p className="text-center mt-2">🔍 Roll over image to zoom in</p> */}
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="col-md-6">
            <h2>{capitalizeWords(product.title)}</h2>
            <span className="badge bg-danger">{product.offer}</span>
            {/* <p className="mt-2">
            Brand: <strong>Narayan Ji</strong>
          </p> */}
            <div className="rating">⭐ 1 review</div>

            <div className="mt-3">
              <p>
                <strong>Pack:</strong> {product.packSize}
              </p>
              <button className="btn btn-outline-dark btn-sm">
                {product.packSize}
              </button>
            </div>

            <div className="price mt-3">
            <p>
                <strong>Description:</strong> {product.description}
              </p>
              <span className="text-danger fs-4">Rs. {product.price}</span>
              <span className="text-muted ms-2">
                <del>Rs. {product.discountprice}</del>
              </span>
              <p className="text-muted">
                Tax included. Shipping calculated at checkout.
              </p>
            </div>

            <button className="btn btn-primary btn-lg mt-3 w-100">
              🛒 Add to cart
            </button>
            <p className="text-danger mt-2">
              🔥 13 people are watching right now!
            </p>
          </div>
        </div>
      </div>
      <div className="container mt-4">
        <h2>Customer Reviews</h2>
        <button
          className="btn btn-primary me-2"
          onClick={() => setReviewShow(!ReviewShow)}
        >
          {ReviewShow ? "Cancel Comments" : "Write Comments"}
        </button>

        {/* Collapsible Content */}
        {ReviewShow && (
          <div className="mt-3 card card-body">
            <FeedBackForm />
          </div>
        )}
      </div>
    </>
  );
};

export default ProductPage;
