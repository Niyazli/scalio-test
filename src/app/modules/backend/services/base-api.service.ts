import {Observable} from 'rxjs';
import {BackendService} from './backend.service';
import {RequestModel} from '../models/request.model';
import {RequestFacadeModel} from '../models/request-facade.model';
import {RequestType} from '../enum/request-type.enum';
import {ID} from '../types/id.type';

/**
 * Base Api Service with common used methods, created to DRY
 *
 * @export
 * @class BaseApiService
 */
export class BaseApiService {
  /**
   * Used to decrease amount of repeatable URL typings
   *
   * @private
   * @type {string}
   * @memberof BaseApiService
   */
  private readonly apiExtension: string;
  /**
   * Creates an instance of BaseApiService.
   * @param {BackendService} backendService
   * @param {string} apiExtension - entity extenstion
   * @memberof BaseApiService
   */
  constructor(readonly backendService: BackendService, apiExtension: string) {
    this.apiExtension = apiExtension;
  }
  /**
   * Combines apiExtension(for example: document, lot, envelope) and url request
   *
   * @param {string} url
   * @return {string}
   * @memberof BaseApiService
   */
  getFullUrl(url?: string): string {
    return url ? this.apiExtension + '/' + url : this.apiExtension;
  }
  getById<TYPE>(id: ID): Observable<TYPE> {
    const request: RequestModel<null> = new RequestModel<null>({
      url: this.getFullUrl(),
    }).withID(id);
    const requestFacade: RequestFacadeModel<null> = new RequestFacadeModel<null>({
      requestType: RequestType.GET,
      request,
    });
    return this.send<TYPE, null>(requestFacade);
  }
  /**
   * Send Request with necessary types
   *
   * @template T - Return Type
   * @template R - DTO Type
   * @param {RequestFacadeModel<R>} requestFacade
   * @return {Observable<T>}
   * @memberof BaseApiService
   */
  send<T, R = null>(requestFacade: RequestFacadeModel<R>): Observable<T> {
    return this.backendService.send<T, R>(requestFacade);
  }
  /**
   * since extension is private here's getter for it
   * @return string
   * @memberof BaseApiService
   */
  public extension(): string {
    return this.apiExtension;
  }
}
