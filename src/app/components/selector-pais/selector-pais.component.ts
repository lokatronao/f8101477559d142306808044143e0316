import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pais } from '../../interfaces/interfaces';
import { testUserAgent } from '@ionic/core';

@Component({
  selector: 'app-selector-pais',
  templateUrl: './selector-pais.component.html',
  styleUrls: ['./selector-pais.component.scss'],
})
export class SelectorPaisComponent implements OnInit {

  constructor(private http: HttpClient) { }

  paises: Pais[] = [];

  ngOnInit() {

    //const fs = require('fs');

    //const contents = fs.readFileSync('./assets/paises/data/es/countries.json');
    //const jsonContent = JSON.parse(contents);
    //console.log(jsonContent);
    this.test();
  }

  async test(){
    let num = true;
    await this.http.get('assets/paises/data/es/countries.json')
    .subscribe((data: Pais[]) =>{
      this.paises = data;
    });

    console.log(this.paises);

    this.paises.forEach(pais => {
      console.log(pais.name);
    });
  }

}
