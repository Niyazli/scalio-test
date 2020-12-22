import {RequestModel} from './request.model';
import {RequestType} from '../enum/request-type.enum';

export class RequestFacadeModel<T = null> {
  requestType: RequestType;
  request: RequestModel<T>;
  constructor({requestType, request}: Required<Partial<RequestFacadeModel<T>>>) {
    this.requestType = requestType;
    this.request = request;
  }
}
