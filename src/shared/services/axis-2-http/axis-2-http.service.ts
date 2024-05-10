import { Injectable, HttpService } from '@nestjs/common';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

@Injectable()
export class Axis2HttpService {
  constructor(httpService: HttpService) {
    httpService.axiosRef.interceptors.request.use(
      this.requestInterceptorSuccess,
      this.requestInterceptorError,
    );

    httpService.axiosRef.interceptors.response.use(
      this.responseInterceptorSuccess,
      this.responseInterceptorError,
    );
  }

  protected requestInterceptorSuccess(
    config: AxiosRequestConfig,
  ): AxiosRequestConfig {
    let tmpURL = config.url;
    if (
      !tmpURL.includes('?response=application/json') &&
      !tmpURL.includes('&response=application/json')
    ) {
      config.url = tmpURL.concat(
        !tmpURL.includes('?') ? '?' : '&',
        'response=application/json',
      );
    }

    return config;
  }

  protected requestInterceptorError(error: any): Promise<any> {
    return Promise.reject(error);
  }

  protected responseInterceptorSuccess(response: AxiosResponse): any {
    if (!response.data?.return) {
      const keys = Object.keys(response.data);
      return response.data[keys[0]].return;
    }
    return response.data.return;
  }

  protected responseInterceptorError(error: any): Promise<any> {
    return Promise.reject(error);
  }
}
