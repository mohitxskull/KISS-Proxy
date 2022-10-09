import { Cache } from './lib/Cache.js';
import { ConfigDB } from './lib/Client/MongoDB.js';
import { ConfigTypes } from './lib/Types.js';

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
      if (ConfigFromCache.active) {
        Cache.ttl(PROXYID);
        return ConfigFromCache;
      } else {
        return null;
      }
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
