import httpProxy from 'http-proxy';
import cookieParser from 'cookie-parser';
import LZString from 'lz-string';
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { CheckProxyId, GetConfig } from './GetConfig.js';
import { KissCookieTypes } from './types.js';

dotenv.config();

const app = express();
const proxy = httpProxy.createProxyServer({});
const port = process.env.PORT || 9879;

app.use(cookieParser());

app.all('/k/:ProxyId', async (req: Request, res: Response) => {
  const PROXYID = req.params.ProxyId || null;

  if (CheckProxyId(PROXYID)) {
    const GetConfigRes = await GetConfig(PROXYID);

    if (GetConfigRes) {
      const IsProxy = GetConfigRes.proxy;

      if (IsProxy) {
        res.cookie(
          'kiss',
          LZString.compressToBase64(
            JSON.stringify({ time: Date.now(), id: PROXYID }),
          ),
        );

        res.redirect('/');
      } else {
        res.redirect(GetConfigRes.links[0]);
      }
    } else {
      res.sendStatus(404);
    }
  } else {
    res.sendStatus(404);
  }
});

app.all('*', async (req: Request, res: Response) => {
  if ('kiss' in req.cookies) {
    const KissCookie: KissCookieTypes = JSON.parse(
      LZString.decompressFromBase64(req.cookies.kiss),
    );

    console.log('kiss cookie => ', KissCookie);

    const GetConfigRes = await GetConfig(KissCookie.id);

    if (GetConfigRes) {
      proxy.web(req, res, {
        target: GetConfigRes.links[0],
        ...GetConfigRes.options,
      });
    } else {
      res.sendStatus(404);
    }
  } else {
    res.sendStatus(404);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
