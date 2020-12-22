import { Injectable } from '@angular/core';
import { BaseApiService } from '../../backend/services/base-api.service';
import { BackendService } from '../../backend/services/backend.service';
import { ID } from '../../backend/types/id.type';
import { Observable } from 'rxjs';
import { IPost } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService extends BaseApiService {
  constructor(backendService: BackendService) {
    super(backendService, 'posts');
  }

  getById<TYPE = IPost>(id: ID): Observable<TYPE> {
    return super.getById(id);
  }
}
