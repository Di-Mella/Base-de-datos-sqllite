import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { Noticias } from './noticias';
import { AlertController, Platform } from '@ionic/angular';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ServicebdService {
  //variable de conexion a la BD
  public database!: SQLiteObject;

  //variables de las tablas
  tablaNoticias: string = "CREATE TABLE IF NOT EXISTS noticia(idnoticia INTEGER PRIMARY KEY autoincrement, titulo VARCHAR(100) NOT NULL, texto TEXT NOT NULL);";

  //variable para realizar insert por defectos
  registroNoticia: string ="INSERT or IGNORE INTO noticias(idnoticia, titulo, texto) VALUES(1,'Soy un titulo de una noticia','Soy el contenido de una noticia creada del programa');";

  //variable de observables para las consultas de base de datos
  listaNoticias = new BehaviorSubject([]);

  //variable observable para el estado de la base de datos -- ES UNICA
  private isDBready: BehaviorSubject <boolean> = new BehaviorSubject(false);



  constructor(private sqlite: SQLite, private platform: Platform, private alertController: AlertController) { this.crearBD()}

  crearBD(){
    //Verificar si la plataforma está lista
    this.platform.ready().then(()=>{
      //Crear la base de datos
      this.sqlite.create({
        name:'BDNoticia.db',
        location: 'default'
      }).then((bd: SQLiteObject)=>{
        //guardar la conexion
        this.database = bd;
        //llamar a la funcion de crear tablas
        this.crearTablas();
        //modificar el estatus de las base de datos
        this.isDBready.next(true);
      }).catch(e=>{
        this.presentAlert('Crear BD','Error' + JSON.stringify(e));
      })
    })
  }
  crearTablas(){
    try{
      this.database.executeSql(this.tablaNoticias,[]);
      this.database.executeSql(this.registroNoticia, []);

    }catch(e){
      this.presentAlert('Crear tablas', 'Error' + JSON.stringify(e));
    }
  }

  fetchNoticias(): Observable<Noticias[]>{
    return this.listaNoticias.asObservable();
  }

  dbState(){
    return this.isDBready.asObservable();
  }
  async presentAlert(titulo:string, msj:string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }

}
