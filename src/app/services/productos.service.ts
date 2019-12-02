import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoInterface } from '../interfaces/producto.interface';
import { resolve } from 'url';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando =true;
  productos: ProductoInterface[]=[];
  productoFiltrado: ProductoInterface[]=[];

  constructor(private http:HttpClient) {
    this.cargarProductos();
   }

  private cargarProductos(){

    return new Promise((resolve, reject)=>{

      this.http.get('https://angular-html-1a957.firebaseio.com/productos_idx.json')
      .subscribe((resp:ProductoInterface[])=>{
  
        this.productos=resp;
  
        setTimeout(() => {
          this.cargando=false;
        }, 2000);
        resolve();
      });
    });

  }

  getProducto( id:string){
    return this.http.get(`https://angular-html-1a957.firebaseio.com/productos/${ id }.json`);
    
  }

  buscarProducto(termino:string){

    if(this.productos,length===0){

      this.cargarProductos().then(() =>{
      this.filtrarProductos(termino);

      });
    }else{
      this.filtrarProductos(termino);
    }

  }

  private filtrarProductos(termino:string){

    this.productoFiltrado=[];

    termino= termino.toLowerCase();

    this.productos.forEach( prod =>{

        const tituloLower =prod.titulo.toLowerCase();

        if(prod.categoria.indexOf(termino)>=0 || tituloLower.indexOf(termino)>=0){

          this.productoFiltrado.push(prod);

        }
    });
  }
}
