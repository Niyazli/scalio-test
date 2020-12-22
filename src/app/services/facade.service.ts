import { Injectable, Injector } from '@angular/core';
import { PostService } from '../modules/post/services/post.service';

@Injectable({
  providedIn: 'root',
})
export class FacadeService {
  constructor(private injector: Injector) {}

  private _postService: PostService;
  public get postService(): PostService {
    if (!this._postService) {
      this._postService = this.injector.get(PostService);
    }
    return this._postService;
  }
}
