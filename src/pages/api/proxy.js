import { NextApiRequest } from "next";
import getConfig from "next/config";
import fetch from "node-fetch";

export const makeAPIProxyRequest = (url, req, host) => {
  const { serverRuntimeConfig } = getConfig();
  const fullUrl = serverRuntimeConfig.apiHost + url;
  const currentHeaders = { ...req.headers };
  delete currentHeaders["host"];
  delete currentHeaders["content-length"];
  const fetchOptions = {
    method: req.method,
    headers: {
      ...currentHeaders,
    },
  };
  if (req["credentials"]) {
    fetchOptions.credentials = req["credentials"];
  }
  if (req["referrer"]) {
    fetchOptions.referrer = req["referrer"];
  }
  if (req["mode"]) {
    fetchOptions.mode = req["mode"];
  }
  if (req?.body) {
    fetchOptions["body"] = JSON.stringify(req?.body);
  }
  return new Promise((resolve, reject) => {
    fetch(fullUrl, fetchOptions)
      .then((res) => {
        const contentType = res.headers.get("content-type");
        if (!res.ok) {
          console.error(
            new Error(`${fullUrl} - ${res.statusText} - ${res.status}`)
          );
          console.error(res.headers.raw());
        }
        if (contentType && contentType.indexOf("application/json") !== -1) {
          try {
            return res.json();
          } catch (err) {
            console.error(err);
          }
        } else {
          return res.text();
        }
        return res.json();
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
};
