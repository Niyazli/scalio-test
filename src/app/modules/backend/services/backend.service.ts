import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, noop, Observable, throwError} from 'rxjs';
import {RequestModel} from '../models/request.model';
import {RequestFacadeModel} from '../models/request-facade.model';
import {catchError, map} from 'rxjs/operators';
import {RequestType} from '../enum/request-type.enum';
import {HttpResponseModel} from '../models/http-response.model';
import {Router} from '@angular/router';
import {ConfigService} from '../../../../core/configuration';

/**
 * Our awesome backend service, to provide the same syntax around all requests, with pre-setted error-hadling and success notifications
 *
 * @export
 * @class BackendService
 */
@Injectable({
  providedIn: 'root',
})
export class BackendService {
  public $token: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  private $headers: BehaviorSubject<{[key: string]: string} | null> = new BehaviorSubject<{[key: string]: string} | null>(null);
  private readonly apiUrl: string;
  constructor(private http: HttpClient, private readonly router: Router, private configService: ConfigService) {
    this.apiUrl = this.configService.config.api;
  }

  /**
   * Add Header to BehaviourSubject, or create the new one
   *
   * @memberof BackendService
   * @param header
   */
  setHeader(header: {[key: string]: string}): void {
    const currentHeaders = this.$headers.getValue();
    if (currentHeaders) {
      this.$headers.next({...currentHeaders, ...header});
    } else {
      this.$headers.next(header);
    }
  }
  /**
   * Facade around all send api request(according to requestType enum)
   *
   * @template T
   * @template R
   * @param {RequestFacadeModel<R>} facade
   * @return {Observable<T>}
   * @memberof BackendService
   */
  send<T, R = null>(facade: RequestFacadeModel<R>): Observable<T> {
    facade.request = this.setHeaders<R>(facade.request);
    switch (facade.requestType) {
      case RequestType.GET:
        return this.get<T>((facade.request as unknown) as RequestModel);
      case RequestType.POST:
        return this.post<T, R>(facade.request);
      case RequestType.PATCH:
        return this.patch<T, R>(facade.request);
      case RequestType.PUT:
        return this.put<T, R>(facade.request);
      case RequestType.DELETE:
        return this.delete<T>((facade.request as unknown) as RequestModel);
    }
  }
  /**
   * Proceed full request with standardized error-handling and success notifications
   *
   * @private
   * @template T
   * @param {Observable<HttpResponseModel<T>>} request
   * @param {Pick<RequestModel, 'successMessage'>} data
   * @return {Observable<T>}
   * @memberof BackendService
   */
  private proceedFullRequest<T>(
    request: Observable<HttpResponseModel<T>>,
    data: Pick<RequestModel, 'successMessage' | 'shouldIndicateLoader'>
  ): Observable<T> {
    return request.pipe(
      map((response: HttpResponseModel<T>) => {
        if (data.successMessage) {
          console.log(data.successMessage);
        }
        if (response?.data) {
          return response.data;
        }
        return (response as unknown) as T;
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Error-handler
   *
   * @private
   * @memberof BackendService
   */
  private handleError = (error: HttpErrorResponse) => {
    const errors: any[] = typeof error?.error === 'string' || typeof error?.error === 'number' ? [error?.error] : error?.error?.errors;
    try {
    } catch (e) {
      noop();
    }
    if (error.status === 403) {
      this.router.navigate(['custom-pages/error']);
    }
    if (error.status === 401) {
      this.router.navigate(['custom-pages/logout']);
    }
    return throwError(error);
  };

  /**
   * Helper for getting success message
   *
   * @private
   * @param {RequestModel<any>} request
   * @return {Pick<RequestModel, 'successMessage'>}
   * @memberof BackendService
   */
  private getSuccessMessage(request: RequestModel<any>): Pick<RequestModel, 'successMessage' | 'shouldIndicateLoader'> {
    return {successMessage: request.successMessage, shouldIndicateLoader: request.shouldIndicateLoader};
  }

  /**
   * Combines url sent from services with apiHost
   *
   * @private
   * @template R
   * @param {RequestModel<R>} request
   * @return {string}
   * @memberof BackendService
   */
  private getFullUrl<R>(request: RequestModel<R>): string {
    return request.customUrl ? request.customUrl + request.url : this.apiUrl + request.url;
  }

  /**
   * GET method (called from send() method)
   *
   * @private
   * @template T
   * @param {RequestModel} request
   * @return {Observable<T>}
   * @memberof BackendService
   */
  private get<T>(request: RequestModel): Observable<T> {
    return this.proceedFullRequest<T>(
      this.http.get<HttpResponseModel<T>>(this.getFullUrl<null>(request), request.options),
      this.getSuccessMessage(request)
    );
  }

  /**
   * POST method (called from send() method)
   *
   * @private
   * @template T
   * @template R
   * @param {RequestModel<R>} request
   * @return {Observable<T>}
   * @memberof BackendService
   */
  private post<T, R>(request: RequestModel<R>): Observable<T> {
    return this.proceedFullRequest<T>(
      this.http.post<HttpResponseModel<T>>(this.getFullUrl<R>(request), request.requestBody, request.options),
      this.getSuccessMessage(request)
    );
  }

  /**
   * PUT method (called from send() method)
   *
   * @private
   * @template T
   * @template R
   * @param {RequestModel<R>} request
   * @return {Observable<T>}
   * @memberof BackendService
   */
  private put<T, R>(request: RequestModel<R>): Observable<T> {
    return this.proceedFullRequest<T>(
      this.http.put<HttpResponseModel<T>>(this.getFullUrl<R>(request), request.requestBody, request.options),
      this.getSuccessMessage(request)
    );
  }

  /**
   * PATCH method (called from send() method)
   *
   * @private
   * @template T
   * @template R
   * @param {RequestModel<R>} request
   * @return {Observable<T>}
   * @memberof BackendService
   */
  private patch<T, R>(request: RequestModel<R>): Observable<T> {
    return this.proceedFullRequest<T>(
      this.http.patch<HttpResponseModel<T>>(this.getFullUrl<R>(request), request.requestBody, request.options),
      this.getSuccessMessage(request)
    );
  }

  /**
   * DELETE method (called from send() method)
   *
   * @private
   * @template T
   * @param {RequestModel} request
   * @return {Observable<T>}
   * @memberof BackendService
   */
  private delete<T>(request: RequestModel): Observable<T> {
    return this.proceedFullRequest<T>(
      this.http.delete<HttpResponseModel<T>>(this.getFullUrl<null>(request), request.options),
      this.getSuccessMessage(request)
    );
  }

  /**
   * Function that modifies existing request to append with headers that come from BehaviourSubject
   *
   * @private
   * @template R
   * @param {RequestModel<R>} request
   * @return
   * @memberof BackendService
   */
  private setHeaders<R>(request: RequestModel<R>): RequestModel<R> {
    const headers = this.$headers.getValue();
    if (headers) {
      Object.keys(headers).forEach(h => {
        if (headers[h]) {
          request.addHeader(h, headers[h]);
        }
      });
    }
    return request;
  }
}
