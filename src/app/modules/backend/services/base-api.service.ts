import {Observable} from 'rxjs';
import {BackendService} from '../../services/backend/services/backend.service';
import {RequestFacadeModel} from '../../services/backend/models/request-facade.model';
import {RequestModel} from '../../services/backend/models/request.model';
import {RequestType} from '../../services/backend/enum/request-type.enum';
import {ID} from '@datorama/akita';
import {BaseFilteringDto} from '../dtos';
import {PossibleFilteringDto} from '../../widget/filtering/types';

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
  getAll<TYPE>(dto?: PossibleFilteringDto): Observable<TYPE[]> {
    const request: RequestModel<null> = new RequestModel<null>({
      url: this.getFullUrl(),
    });
    if (dto) {
      request.withQuery<PossibleFilteringDto>(dto);
    }
    const requestFacade: RequestFacadeModel<null> = new RequestFacadeModel<null>({
      requestType: RequestType.GET,
      request,
    });
    return this.send<TYPE[], null>(requestFacade);
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
