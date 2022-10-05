import NodeCache from 'node-cache';
import { ConfigDB } from './mongodb.js';
import { ConfigTypes } from './types.js';

const Cache = new NodeCache({ stdTTL: 60, checkperiod: 70 });

export const CheckProxyId = (PROXYID: string): boolean => {
  return /^[a-zA-Z0-9]*$/.test(PROXYID);
};

export const GetConfig = async (
  PROXYID: string,
): Promise<ConfigTypes | null> => {
  if (CheckProxyId(PROXYID)) {
    const ConfigFromCache: ConfigTypes = Cache.get(PROXYID);

    console.log('from cache res =>', ConfigFromCache);

    if (ConfigFromCache) {
      return ConfigFromCache;
    } else {
      const ConfigFromDB = await ConfigDB.findOne({
        _id: PROXYID,
        active: true,
      });

      if (ConfigFromDB) {
        const SetConfigInCache = Cache.set(PROXYID, ConfigFromDB);

        console.log('cache set res => ', SetConfigInCache);
        return ConfigFromDB;
      } else {
        console.info(`\n${PROXYID} => Not in DB`);
        return null;
      }
    }
  } else {
    console.info(`\n${PROXYID} => Invalid`);
    return null;
  }
};
