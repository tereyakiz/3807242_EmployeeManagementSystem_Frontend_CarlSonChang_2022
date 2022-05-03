// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { makeAPIProxyRequest } from "./proxy";
import getConfig from "next/config";
// import gsccodes from "../../common/enums/gsccodes";
export default async function fun (req, res) {
  res.statusCode = 200;
  const { publicRuntimeConfig } = getConfig();
  try {
    console.log("req.query.route", req.query.route);
    const data = await makeAPIProxyRequest(`/${req.query.route}`, req);
    res.send(data);
  } catch (err) {
    res.json({
      gsc: err?.gsc ? err.gsc : 'ERROR',
      data: { consoleMessage: err?.msg ? err.msg : err.message },
    });
  }
};
