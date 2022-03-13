import { Injectable } from '@angular/core';
import { formatDate, DatePipe, registerLocaleData } from '@angular/common';
import { CLIENTES } from '../clientes/cliente.json';
import { Cliente } from '../_models/cliente';
import localeMX from '@angular/common/locales/es-MX';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private UrlEndPoint: string = 'http://localhost:8080/app/clientes';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) {}

  
  getClientes(): Observable<Cliente[]> {
    //return of(CLIENTES);

    return this.http.get(this.UrlEndPoint).pipe(
      tap((response) => {
        let clientes = response as Cliente[];
        console.log('ClienteService: tap 1')
        clientes.forEach((cliente) => {
          console.log(cliente.nombre);
        });
      }),
      map((response) => {
        let clientes = response as Cliente[];

        return clientes.map((cliente) => {
          cliente.nombre = cliente.nombre.toUpperCase();
          cliente.apellido = cliente.apellido.toUpperCase();

          let datePipe = new DatePipe('es');
          // cliente.fecha = datePipe.transform(cliente.fecha,'fullDate');

          //cliente.fecha = datePipe.transform(cliente.fecha,'fullDate');
          //cliente.fecha = datePipe.transform(cliente.fecha,'EEEE dd, MMMM yyyy');
          return cliente;
        });
      }),
      tap(response =>{
        console.log('ClienteService: tap 2')
        response.forEach(cliente=>{
          console.log(cliente.nombre);
        })
        }),
    );
  }

  //Metodo en Service para crear Cliente
  create(cliente: Cliente): Observable<Cliente> {
    return this.http
      .post(this.UrlEndPoint, cliente, {
        headers: this.httpHeaders,
      })
      .pipe(
        map((respuesta: any) => respuesta.cliente as Cliente),
        catchError((e) => {
          //////////////////
          // if <- de Validación desde back con badREquest
          if (e.status == 400) {
            return throwError(e);
          }
          //////////////////////////////////

          console.error(e.error.mensaje);
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }

  //Metodo en Service para traer  Cliente  por id
  getCliente(id): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.UrlEndPoint}/${id}`).pipe(
      catchError((e) => {
        this.router.navigate(['/clientes']);
        console.log(e.error.mensaje);
        Swal.fire('Error al traer el cliente', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  //Metodo en service para actualizar cliente por id
  updateCliente(cliente: Cliente): Observable<any> {
    return this.http
      .put<any>(`${this.UrlEndPoint}/${cliente.id}`, cliente, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((e) => {
          //////////////////
          // if <- de Validación desde back con badREquest
          if (e.status == 400) {
            return throwError(e);
          }
          //////////////////////////////////
          console.error(e.error.mensaje);
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }

  deleteCliente(id: number): Observable<Cliente> {
    return this.http
      .delete<Cliente>(`${this.UrlEndPoint}/${id}`, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((e) => {
          console.error(e.error.mensaje);
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }
}
