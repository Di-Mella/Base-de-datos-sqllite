import { Component } from '@angular/core';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServicebdService } from '../services/servicebd.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  nombre: string = "";
  valor: string = "";

  constructor(private storage: NativeStorage, private bd:ServicebdService) {}

  crear(){
    this.storage.setItem(this.nombre, this.valor);
  }

}
