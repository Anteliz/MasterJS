import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/models/article';
import { Global } from 'src/app/services/global';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
  providers: [ArticleService]
})
export class ArticlesComponent implements OnInit {

  public url: string;

  @Input() articles: Article[]

  constructor() { 
    this.articles = [];
    this.url = Global.url;
  }

  ngOnInit(): void {
  }

}
