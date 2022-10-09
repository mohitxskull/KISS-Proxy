import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { ConfigTypes } from '../Types.js';

dotenv.config();

const uri = process.env.URI;

if (!uri || uri === undefined) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (uri.length < 10) {
  throw new Error('Invalid Mongo URI');
}

const client = new MongoClient(uri);
export const MongoDB = client.db('kiss');
export const ConfigDB = MongoDB.collection<ConfigTypes>('configs');
