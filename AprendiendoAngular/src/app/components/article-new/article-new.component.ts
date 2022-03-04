import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-article-new',
  templateUrl: './article-new.component.html',
  styleUrls: ['./article-new.component.css'],
  providers: [ArticleService]
})
export class ArticleNewComponent implements OnInit {
  
  public article: Article;
  public status: string;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _articleService: ArticleService
  ) { 
    this.article = new Article('', '', '', '', null);
    this.status = '';
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this._articleService.create(this.article).subscribe({
      next: response => {
        if(response.status == 'Success'){
          this.status = 'success';
          this.article = response.article;
          this._router.navigate(['/blog']);
        }
        else{
          this.status = 'error';
        }
      },
      error: error => {
        console.log>(error);
        this.status = 'error';
      },
    });
  }

}
