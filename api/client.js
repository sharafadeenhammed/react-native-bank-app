import { create } from "apisauce";

import cache from "../utility/cache";
import AuthStorage from "../utility/AuthStorage";

const client = create({
  baseURL: "https://bankapp-mongodb.onrender.com/api/v1",
});

client.addAsyncRequestTransform(async (request) => {
  const authToken = await AuthStorage.get();
  if (!authToken) return;
  request.headers["authorization"] = "Token " + authToken;
});

const get = client.get;
client.get = async (url, params, axiosConfig) => {
  const response = await get(url, params, axiosConfig);
  if (response.ok) {
    await cache.store(url, response.data);
    return response;
  }

  // fetch cached data...
  const data = await cache.get(url);

  if (!data) return response;

  return { ok: true, data };
};

export default client;
