"use client";

import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Products = () => {
  const router = useRouter();
  const {
    query: { data },
  } = router;

  useEffect(() => {
    console.log(data);
  }, []);

  return (
    <div>
      <div>{data}</div>
    </div>
  );
};

export default Products;
