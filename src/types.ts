export interface KissCookieTypes {
  time: number;
  id: string;
}

export interface ConfigTypes {
  _id: string;
  name: string;
  proxy: boolean;
  active: boolean;
  createdAt: number;
  updatedAt: number;
  links: string[];
  options: {
    xfwd: boolean;
    changeOrigin: boolean;
    proxyTimeout: number;
    timeout: number;
    followRedirects: boolean;
  };
}
