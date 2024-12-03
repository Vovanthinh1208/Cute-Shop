import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useProductsContext } from "../../context/products_context";

export const NavLinks: React.FC<{ className: string; isSidebar?: boolean }> = ({
  className,
  isSidebar,
}) => {
  const { closeSidebar } = useProductsContext();
  const history = useHistory();
  const menuitems = [
    {
      id: 1,
      text: "home",
      url: "/",
    },
    // {
    //   id: 2,
    //   text: "shipping",
    //   url: "/shipping",
    // },
    {
      id: 2,
      text: "products",
      url: "/products",
    },

    {
      id: 3,
      text: "Order",
      url: "/order",
    },
    {
      id: 4,
      text: "Review",
      url: "/products_review",
    },
    {
      id: 5,
      text: "Log out",
      handleLogout: () => {
        localStorage.removeItem("token");
        history.push("sign_in");
      },
    },
  ];
  return (
    <ul className={className}>
      {menuitems.map((item) => (
        <li key={item.id}>
          {item.text === "Log out" ? (
            <a onClick={item.handleLogout}>{item.text}</a>
          ) : (
            <a href={item.url}>{item.text}</a>
          )}
        </li>
      ))}
      {isSidebar && (
        <li>
          <Link to="/checkout" onClick={closeSidebar}>
            checkout
          </Link>
        </li>
      )}
    </ul>
  );
};
