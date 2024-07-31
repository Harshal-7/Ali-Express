import axios from "axios";

export async function GET(request: Request) {
  const res = await axios("https://data.mongodb-api.com/...", {
    headers: {
      "Content-Type": "application/json",
      "API-Key": process.env.DATA_API_KEY,
    },
  });
  const data = await res.data;

  return Response.json({ data });
}
