import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { productDataType } from "../utils/productData";
import { useCartContext } from "../context/cart_context";
import AmountButtons from "./AmountButtons";

type IProps = {
  singleProduct: productDataType | {};
};

const AddToCart = ({ singleProduct }: IProps) => {
  const { addToCart } = useCartContext();
  const { id, slug } = singleProduct as productDataType;
  const [amount, setAmount] = useState(1);

  const increaseAmount = () => setAmount((prev) => prev + 1);

  const decreaseAmount = () => {
    if (amount > 1) {
      setAmount((prev) => prev - 1);
    }
  };

  return (
    <Wrapper>
      <div className="btn-container">
        <AmountButtons
          amount={amount}
          increase={increaseAmount}
          decrease={decreaseAmount}
        />
        <Link
          to="/cart"
          className="btn"
          onClick={() => addToCart(id, slug, amount, singleProduct)}
        >
          add to cart
        </Link>
      </div>
    </Wrapper>
  );
};

export default AddToCart;

const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    /* border: none; */
    border: 1px solid black;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }

  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    width: 140px;
  }
`;
