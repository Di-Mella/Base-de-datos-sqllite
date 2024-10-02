import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.page.html',
  styleUrls: ['./listar.page.scss'],
})
export class ListarPage implements OnInit {

  arregloNoticias: any = [{
    id: '',
    titulo: '',
    texto: ''
  }]

  constructor(private bd: ServicebdService, private router: Router) { }

  modificar(x: any){
    // debo modificar el formulario de 
    let navigationExtras: NavigationExtras = {
      state: {
        idEnviado: x.id,
        tituloEnviado: x.titulo,
        textoEnviado: x.texto
      }
    }
    this.router.navigate(['/modificar'], navigationExtras)
  }
  eliminar(id:number){
    this.bd.eliminarNoticia(id);
  }


  ngOnInit() {
    this.bd.dbState().subscribe(res=>{
      if(res){
        this.bd.fetchNoticias().subscribe((item)=>{
          this.arregloNoticias = item;
        })
      }
    })
  }

}
