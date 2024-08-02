import axios from "axios";

export const getProductsList = async (name: string | null) => {
  const options = {
    method: "GET",
    url: "https://aliexpress-datahub.p.rapidapi.com/item_search",
    params: {
      q: name,
      page: "1",
      sort: "default",
      locale: "en_US",
      region: "US",
      currency: "USD",
    },
    headers: {
      "x-rapidapi-key": "8fd9fec7d6msh253b64b0b38c2abp1ddf82jsn09344b5aaefc",
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
      currency: "USD",
      region: "US",
      locale: "en_US",
    },
    headers: {
      "x-rapidapi-key": "8fd9fec7d6msh253b64b0b38c2abp1ddf82jsn09344b5aaefc",
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
