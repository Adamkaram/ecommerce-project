/* eslint-disable no-param-reassign */
import { serialize } from "cookie";

/**
 * This sets `cookie` on `res` object
 */
const cookie = (res, name, value) => {
  const stringValue =
    typeof value === "object" ? `j:${JSON.stringify(value)}` : String(value);

  res.setHeader("Set-Cookie", serialize(name, String(stringValue)));
};

/**
 * Adds `cookie` function on `res.cookie` to set cookies for response
 */
const cookies = handler => (req, res) => {
  res.cookie = (name, value, options) => cookie(res, name, value);

  return handler(req, res);
};

export default cookies;
