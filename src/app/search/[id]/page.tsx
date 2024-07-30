"use client";

import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ItemCard from "@/components/ItemCard";
import { ProductsCategory } from "@/config.product";

type ProductItem = {
  name: string | null;
  id: number;
};

type ProductCategory = {
  name: string;
  id: number;
  list: ProductItem[];
};

const productsCategory: ProductCategory[] = ProductsCategory;

const ProductListDynamic = ({ params }: { params: { id: number } }) => {
  const [id, setId] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log(params.id);
    setId(params.id);
    console.log("Name : ", id);
  }, []);

  useEffect(() => {
    axios
      .get(`https://ali-express-clone.onrender.com/api/category/item_search`, {
        params: {
          q: name,
          sort: "default",
        },
      })
      .then(function (response) {
        console.log(response.data.result.resultList);
        setData(response.data.result.resultList);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    console.log("Product : ", data);
  }, []);

  return (
    <div className="w-full max-w-screen-xl mx-auto grid grid-cols-3 gap-4 mt-20"></div>
  );
};

export default ProductListDynamic;
