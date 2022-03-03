import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from 'src/app/models/article';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  providers: [ArticleService]
})
export class ArticleComponent implements OnInit {

  public article: Article;
  public url: string;

  constructor(
    private _articleService: ArticleService,
    private _route: ActivatedRoute,
    private _router: Router
  ){
    this.article = {
      _id: '',
      title: '',
      content: '',
      image: '',
      date: ''
    };
    this.url = Global.url;
  }

  ngOnInit(): void {
    this._route.params.subscribe((params: Params) =>{
      let id = params['id']
      this._articleService.getArticle(id).subscribe({
        next: response => {
          if(response.article){
            this.article= response.article;
          }
          else{
            this._router.navigate(['/home']);
          }
        },
        error: error => 
        this._router.navigate(['/home']),
      });
    });
  }

}
