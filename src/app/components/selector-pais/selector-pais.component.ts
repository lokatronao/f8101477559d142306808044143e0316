import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pais } from '../../interfaces/interfaces';
import { testUserAgent } from '@ionic/core';

@Component({
  selector: 'app-selector-pais',
  templateUrl: './selector-pais.component.html',
  styleUrls: ['./selector-pais.component.scss'],
})
export class SelectorPaisComponent implements OnInit {

  @Output() seleccionado = new EventEmitter();

  constructor(private http: HttpClient) { }

  paises: Pais[] = [];

  ngOnInit() {
    this.init();
  }

  async init(){
    await this.http.get('assets/paises/data/es/countries.json')
    .subscribe((data: Pais[]) => {
      this.paises = data;
    });

    console.log(this.paises);

    this.paises.forEach(pais => {
      console.log(pais.name);
    });
  }

  testa(evento){
    // this.seleccionado = evento.detail.value;
    this.seleccionado.emit(this.buscarIdioma(evento.detail.value));
    // console.log(this.buscarIdioma(evento.detail.value));
  }

  buscarIdioma(idioma){
    return this.paises.find( pais => pais.name === idioma);
  }

}
