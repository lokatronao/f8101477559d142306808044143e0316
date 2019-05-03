import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post.component';
import { PostsComponent } from './posts/posts.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import { AvatarSelectorComponent } from './avatar-selector/avatar-selector.component';
import { MapaComponent } from './mapa/mapa.component';
import { SelectorPaisComponent } from './selector-pais/selector-pais.component';

@NgModule({
  declarations: [
    PostComponent,
    PostsComponent,
    AvatarSelectorComponent,
    MapaComponent,
    SelectorPaisComponent
  ],
  exports:[
    PostsComponent,
    SelectorPaisComponent,
    AvatarSelectorComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule
  ]
})
export class ComponentsModule { }
