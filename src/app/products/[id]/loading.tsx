import React from "react";
import { Loader2Icon } from "lucide-react";

const LoadingPage = () => {
  return (
    <div className="w-full h-[600px] flex justify-center items-center">
      <div className="text-xl font-bold">Loading Product Details</div>
      <Loader2Icon className="animate-spin w-7 h-7 ml-2" />
    </div>
  );
};

export default LoadingPage;
