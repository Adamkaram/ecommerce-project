import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.writeHead(302, {
    Location: "/",
    "Set-Cookie": "token=; Path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;",
  });
  res.end();
};
