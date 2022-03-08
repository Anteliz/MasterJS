import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Global } from 'src/app/services/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-article-new',
  templateUrl: './article-new.component.html',
  styleUrls: ['./article-new.component.css'],
  providers: [ArticleService]
})
export class ArticleNewComponent implements OnInit {

  public article: Article = new Article('', '', '', '', null);
  public status: string;
  public is_edit: boolean;
  public page_title: string;
  public url: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _articleService: ArticleService
  ) {
    this.status = '';
    this.is_edit = false;
    this.page_title = 'Nuevo Artículo';
    this.url = Global.url;
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this._articleService.create(this.article).subscribe({
      next: response => {
        if (response.status == 'Success') {
          this.status = 'success';
          this.article = response.article;
          // Alerta de éxito
          Swal.fire('Artículo Creado',  'El artículo se publico con éxito',  'success');
          this._router.navigate(['/blog']);
        }
        else {
          this.status = 'error';
        }
      },
      error: error => {
        console.log > (error);
        this.status = 'error';
      },
    });
  }

  afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png,.gif,.jpeg",
    maxSize: 50,
    uploadAPI: {
      url: Global.url + 'upload-image',
    },
    theme: "attachPin",
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: false,
    fileNameIndex: true,
    autoUpload: false,
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Sube la imagen del artículo',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !',
      sizeLimit: 'Size Limit'
    }
  };

  imageUpload(data: any) {
    this.article.image = data.body.image;
    // alert(data.body.image);
  }
}
