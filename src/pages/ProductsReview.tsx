import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import RatingStar from "../components/RatingStar";
import { useProductsContext } from "../../src/context/products_context";
const Section = styled.section`
  padding: 56px 0;
  background-color: #fff;
  color: #111;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 16px;
`;

const ProductImage = styled.div`
  position: relative;
  margin-top: 22px;

  img {
    width: 100%;
    border-radius: 8px;
  }

  h6 {
    position: absolute;
    top: 12px;
    right: 20px;
    background-color: #28a745;
    color: #fff;
    padding: 4px 12px;
    border-radius: 20px;
  }
`;

const ProductDetails = styled.div`
  grid-column: span 7 / span 7;
  padding-top: 24px;

  h5 {
    font-size: 19px;
    font-weight: 500;
    margin-bottom: 8px;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }

  ul {
    margin-top: 16px;
    padding-left: 24px;
    list-style: disc;

    li {
      opacity: 0.7;
      font-size: 14px;
    }
  }
`;

const ProductPricing = styled.div`
  grid-column: span 3 / span 3;
  padding-top: 24px;

  h5 {
    color: #007bff;
    font-size: 24px;
    font-weight: 500;
  }

  .discount {
    font-size: 14px;
    opacity: 0.6;
    display: flex;
    align-items: center;

    .line-through {
      text-decoration: line-through;
      margin-right: 8px;
    }
  }

  .actions {
    display: flex;
    flex-direction: column;
    margin-top: 24px;

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px 12px;
      border-radius: 4px;
      margin-bottom: 8px;
      .btn {
        width: 100%;
        margin-top: 1rem;
        text-align: center;
        font-weight: 700;
      }
      &:first-child {
        background-color: transparent;
        color: #ab7a5f;
        border: 1px solid #ab7a5f;

        &:hover {
          background-color: #ab7a5f;
          color: #fff;
        }
      }

      &:last-child {
        background-color: #ab7a5f;
        color: #fff;

        &:hover {
          opacity: 0.9;
        }
      }
    }
  }
`;

type ProductSpec = {
  ram: string;
  drive: string;
  gen: string;
  brand: string;
  security: string;
};

type Product = {
  img: string;
  title: string;
  subTitle: string;
  spec: ProductSpec;
  discountPrice: string;
  realPrice: string;
  discount: string;
  rating: number;
  count: string;
  shipping: string;
  availibility: string;
};

type IProps = {
  product: Product;
};

const ProductItem = ({ product }: IProps) => {
  const [rating, setRating] = useState<number>(3.8);
  const [isFavourite, setIsFavourite] = useState(false);

  const handleFavourite = () => {
    setIsFavourite(!isFavourite);
  };
  const handleRating = (newRating: number) => {
    setRating(newRating);
  };
  const handleAddToFavourite = () => {
    alert("Added to favorite products list!");
  };
  const handleSendReview = () => {
    alert("Product review submitted");
  };

  return (
    <ProductGrid>
      <ProductImage>
        <h6>New</h6>
        <img src={product.img} alt={product.title} />
      </ProductImage>

      <ProductDetails>
        <h5>{product.title}</h5>
        <h5>{product.subTitle}</h5>
        <ul>
          {Object.values(product.spec).map((spec, index) => (
            <li key={index}>{spec}</li>
          ))}
        </ul>
      </ProductDetails>

      <ProductPricing>
        <h5>${product.discountPrice}</h5>
        <div className="discount">
          <span className="line-through">${product.realPrice}</span>
          <span style={{ marginLeft: "15px" }}>Sales:{product.discount}</span>
        </div>
        <RatingStar
          count={5}
          value={rating}
          onChange={handleRating}
          size={24}
          color="#d3d3d3"
          hoverColor="#ffcc00"
          activeColor="#ff6600"
          edit={true}
          isHalf={true}
        />
        <div className="actions">
          <button
            className="btn"
            onClick={() => {
              handleFavourite();
              handleAddToFavourite();
            }}
          >
            <FontAwesomeIcon
              style={{ color: isFavourite ? "red" : "black" }}
              icon={faHeart}
            />
            <span style={{ marginLeft: "8px" }}> Favourite </span>
          </button>
          <button className="btn" onClick={handleSendReview}>
            <FontAwesomeIcon icon={faShoppingCart} />
            <span style={{ marginLeft: "8px" }}> Send Review</span>
          </button>
        </div>
      </ProductPricing>
    </ProductGrid>
  );
};

const ProductsReview = () => {
  const { allProducts } = useProductsContext();

  const [convertedData, setConvertedData] = useState<any[]>([]);

  useEffect(() => {
    const convertData = allProducts.map((e) => ({
      img: e.images[0],
      title: e.name,
      subTitle: e.forWhom,
      spec: {
        ram: e.categories || "description",
        drive: e.clothingCategories || "description",
        gen: e.forWhom || "description",
        brand: e.brand || "description",
        security: e.age || "description",
      },
      discountPrice: (e.price * 0.8).toFixed(0),
      realPrice: e.price,
      discount: "20%",
      rating: 4,
      count: "8",
      shipping: "50",
      availibility: "Available",
    }));

    setConvertedData(convertData);
  }, [allProducts]);

  return (
    <Section>
      <Container>
        {convertedData.map((product, index) => (
          <ProductItem product={product} key={index} />
        ))}
      </Container>
    </Section>
  );
};

export default ProductsReview;
