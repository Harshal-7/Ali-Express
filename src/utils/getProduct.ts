import axios from "axios";

export const getProductsList = async (name: string | null) => {
  const options = {
    method: "GET",
    url: "https://aliexpress-datahub.p.rapidapi.com/item_search",
    params: {
      q: name,
      page: "1",
      sort: "default",
      currency: "USD",
    },
    headers: {
      "x-rapidapi-key": "1911afcb43msh95547d4cce2bc50p1fed1ejsna113f0d91de9",
      "x-rapidapi-host": "aliexpress-datahub.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getProductInfo = async (id: Number | undefined) => {
  const options = {
    method: "GET",
    url: "https://aliexpress-datahub.p.rapidapi.com/item_detail",
    params: {
      itemId: id,
    },
    headers: {
      "x-rapidapi-key": "1911afcb43msh95547d4cce2bc50p1fed1ejsna113f0d91de9",
      "x-rapidapi-host": "aliexpress-datahub.p.rapidapi.com",
    },
  };

  try {
    console.log("ID IS : ", id);

    const response = await axios.request(options);
    return response;
  } catch (error) {
    console.error(error);
  }
};
