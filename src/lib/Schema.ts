import Joi from 'joi';
import { ConfigTypes } from './Types.js';

export const ProxyIDSchema = Joi.string().min(0).max(10);

export const ConfigSchema = Joi.object<ConfigTypes>({
  _id: ProxyIDSchema.required(),
  name: Joi.string().min(3).max(20).required(),
  userid: Joi.string().min(10).max(50).optional(),
  links: Joi.array().items(Joi.string().min(0).max(100).required()),
  proxy: Joi.boolean().required(),
  active: Joi.boolean().required(),
  createdAt: Joi.number().min(999).max(999999999999999).required(),
  updatedAt: Joi.number().min(999).max(999999999999999).required(),
  options: Joi.object({
    xfwd: Joi.boolean().required(),
    changeOrigin: Joi.boolean().required(),
    followRedirects: Joi.boolean().required(),
    proxyTimeout: Joi.number().min(10000).max(60000).required(),
    timeout: Joi.number().min(10000).max(60000).required(),
  }).required(),
});
