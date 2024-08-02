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
      "x-rapidapi-key": "375c11db99msh733f21c081ddcbap1a7494jsnc8735483bd70",
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
      "x-rapidapi-key": "375c11db99msh733f21c081ddcbap1a7494jsnc8735483bd70",
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
