import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.page.html',
  styleUrls: ['./modificar.page.scss'],
})
export class ModificarPage implements OnInit {
  titulo: string = "";
  texto: string = "";
  id: number = 0;

  constructor(private router: Router, private activedrouter: ActivatedRoute, private bd: ServicebdService) {
    this.activedrouter.queryParams.subscribe(res=>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.id = this.router.getCurrentNavigation()?.extras?.state?.['idEnviado'];
        this.titulo = this.router.getCurrentNavigation()?.extras?.state?.['tituloEnviado'];
        this.texto = this.router.getCurrentNavigation()?.extras?.state?.['textoEnviado'];
      }
    })
   }

  ngOnInit() {
  }

  modificar(){
    this.bd.modificarNoticia(this.id, this.titulo, this.texto);
  }

}
