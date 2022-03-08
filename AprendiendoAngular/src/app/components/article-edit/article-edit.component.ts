import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Global } from 'src/app/services/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-article-edit',
  templateUrl: '../article-new/article-new.component.html',
  styleUrls: ['./article-edit.component.css'],
  providers: [ArticleService]
})
export class ArticleEditComponent implements OnInit {

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
    this.is_edit = true;
    this.page_title = 'Editar Artículo';
    this.url = Global.url;
  }

  ngOnInit(): void {
    this.getArticle();
  }

  onSubmit() {
    Swal.fire({
      title: '¿Seguro de hacer la modificación al artículo?',
      text: "Este cambio no se podrá revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Cambialo'
    }).then((result) => {
      if (result.isConfirmed) {
        this._articleService.update(this.article._id, this.article).subscribe({
          next: response => {
            if (response.status == 'success') {
              let id: string = this.article._id;
              this.status = 'success';
              this.article = response.article;
              Swal.fire('Artículo Modificado',  'El artículo se modifico con éxito',  'success');
              this._router.navigate(['/blog/articulo/'+ id]);
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
    })
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
  }

  getArticle(){
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
