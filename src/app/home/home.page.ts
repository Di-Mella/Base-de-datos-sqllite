import { Component } from '@angular/core';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  nombre: string = "";
  valor: string = "";

  constructor(private storage: NativeStorage) {}

  crear(){
    this.storage.setItem(this.nombre, this.valor);
  }

}
