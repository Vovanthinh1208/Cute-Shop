import { GiClothes } from "react-icons/gi";
import { MdOutlineSmartToy } from "react-icons/md";
import { FaBaby } from "react-icons/fa";
import { url } from "inspector";
import { useHistory } from "react-router";

export const services = [
  {
    id: 1,
    icon: <MdOutlineSmartToy />,
    title: "toy",
    text: "toy text",
  },
  {
    id: 2,
    icon: <GiClothes />,
    title: "clothing",
    text: "clothing text",
  },
  {
    id: 3,
    icon: <FaBaby />,
    title: "accessories",
    text: "accessories text",
  },
];

export const API_ENDPOINT =
  "https://bqk6gkzk.api.sanity.io/v1/graphql/production/default";

export const QUERY = `
{
  allProduct {
    _id
    name
    slug {
      current
    }
    brand
    categories {
      categories
    }
    clothingCategories {
      clothingCategories
    }
    price
    stock
    forWhom {
      forWhom
    }
    height {
      height
    }
    heightDescription
    age {
      age
    }
    ageDescription
    itemDescription
    featured
    images {
      asset {
        url
      }
    }
  }
}

`;
