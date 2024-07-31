"use client";

import { useRouter } from "next/router";
import React from "react";

const ProductListPage = () => {
  const router = useRouter();
  const {
    query: { data },
  } = router;

  return (
    <div>
      <div>{data}</div>
    </div>
  );
};

export default ProductListPage;
