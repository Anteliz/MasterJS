// Importar los modulos del router de angular
import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Importar componentes a lo cuales le quiero hacer una página exclusiva
import { HomeComponent } from "./components/home/home.component";
import { BlogComponent } from "./components/blog/blog.component";
import { FormularioComponent } from "./components/formulario/formulario.component";
import { PaginaComponent } from "./components/pagina/pagina.component";
import { PeliculasComponent } from "./components/peliculas/peliculas.component";
import { ErrorComponent } from "./components/error/error.component";
import { Article } from "./models/article";
import { ArticleComponent } from "./components/article/article.component";
import { SearchComponent } from "./components/search/search.component";
import { ArticleNewComponent } from "./components/article-new/article-new.component";
import { ArticleEditComponent } from "./components/article-edit/article-edit.component";

// Array de rutas
const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'blog', component: BlogComponent},
    {path: 'blog/articulo/:id', component: ArticleComponent},
    {path: 'blog/crear', component: ArticleNewComponent},
    {path: 'blog/editar/:id', component: ArticleEditComponent},
    {path: 'buscar/:search', component: SearchComponent},
    {path: 'formulario', component: FormularioComponent},
    {path: 'pagina/:nombre/:apellidos', component: PaginaComponent},
    {path: 'pagina', component: PaginaComponent},
    {path: 'peliculas', component: PeliculasComponent},
    {path: '**', component: ErrorComponent},
];

// Exportar el modulo de rutas
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);