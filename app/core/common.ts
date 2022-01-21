import axios, { AxiosRequestConfig, Method } from 'axios';

export const api = <T>(method: Method, url: string, data: any = null): Promise<T> => {
  const rc: AxiosRequestConfig = {
    url: url,
    method,
  };

  if (data) {
    rc.data = data;
  }

  return axios(rc).then(
    r => (r.status === 204 ? null : (r.data as T)),
    f => {
      const errorData = (f && 'response' in f && f.response ? (f.response['data'] as any) : null) || {
        code: null,
        message: null,
      };
      return Promise.reject(errorData) as any;
    },
  );
};
