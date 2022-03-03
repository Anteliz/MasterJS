import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from 'src/app/models/article';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  providers: [ArticleService]
})
export class ArticleComponent implements OnInit {

  constructor(
    public _articleService: ArticleService,
    private _route: ActivatedRoute,
    // private article: Article,
    // private _router: Router
  ){
  }

  ngOnInit(): void {
    this._route.params.subscribe((params: Params) =>{
      let id = params['id']
      this._articleService.getArticle(id).subscribe({
        next: response => {console.log(response)},
        error: error => console.log("error", error),
      });
    });
  }

}
