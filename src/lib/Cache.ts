import NodeCache from 'node-cache';

export const Cache = new NodeCache({ stdTTL: 300, checkperiod: 300 });
