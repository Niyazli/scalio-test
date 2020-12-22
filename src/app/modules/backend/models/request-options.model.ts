import {HttpHeaders, HttpParams} from '@angular/common/http';

/**
 * Default Angular Model Wrapper
 *
 * @export
 * @class RequestOptionsModel
 */
export class RequestOptionsModel {
  /**
   * Default Angular Model Wrapper
   *
   * @type {HttpHeaders}
   * @memberof RequestOptionsModel
   */
  headers?: HttpHeaders;
  /**
   * Default Angular Model Wrapper
   *
   * @type {'body'}
   * @memberof RequestOptionsModel
   */
  observe?: 'body';
  /**
   * Default Angular Model Wrapper
   *
   * @type {(HttpParams
   *     | {
   *     [param: string]: string | string[];
   *   })}
   * @memberof RequestOptionsModel
   */
  params?:
    | HttpParams
    | {
    [param: string]: string | string[];
  };
  /**
   * Default Angular Model Wrapper
   *
   * @type {boolean}
   * @memberof RequestOptionsModel
   */
  reportProgress?: boolean;
  /**
   * Default Angular Model Wrapper
   *
   * @type {'json'}
   * @memberof RequestOptionsModel
   */
  responseType?: 'json';
  /**
   * Default Angular Model Wrapper
   *
   * @type {boolean}
   * @memberof RequestOptionsModel
   */
  withCredentials?: boolean;

  /**
   * Creates an instance of RequestOptionsModel.
   * @memberof RequestOptionsModel
   */
  constructor() {
    this.headers = new HttpHeaders();
    this.params = new HttpParams();
    this.responseType = 'json';
  }
}
