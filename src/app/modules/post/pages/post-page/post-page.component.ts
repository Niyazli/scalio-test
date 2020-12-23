import { Component, OnDestroy, OnInit } from '@angular/core';
import { FacadeService } from '../../../../services/facade.service';
import { IPost } from '../../models/post.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
})
export class PostPageComponent implements OnInit, OnDestroy {
  public post: IPost;

  private destroy$ = new Subject();

  constructor(
    private facadeService: FacadeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initData();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  private initData(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.facadeService.postService
        .getById(params.postId)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (res) => {
            this.post = res;
          },
          () => this.router.navigate(['/'])
        );
    });
  }
}
