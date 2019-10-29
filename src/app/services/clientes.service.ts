import { Injectable } from '@angular/core';
import { formatDate, DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { Cliente } from '../clientes/cliente.js';

import { throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  url = 'http://localhost:8080/api/clientes';

  headers = new HttpHeaders({ 'Content.Type': 'application/json' });

  constructor (
    private httpClient: HttpClient,
    private router: Router
  ) { }

  getClientes() {
    return this.httpClient.get<Cliente[]>(this.url).pipe(
      tap(response => {
        // const clientes = response as Cliente[];
        // clientes.forEach(cliente => console.log(cliente.nombre));
      }),
      map(response => {
        // const datePipe = new DatePipe('es-MX');
        const clientes = response as Cliente[];

        return clientes.map(cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();
          // cliente.apellido = cliente.apellido.toUpperCase();
          // cliente.createAt = formatDate(cliente.createAt, 'dd-MM-yyyy', 'en-US');
          // cliente.createAt = datePipe.transform(cliente.createAt, 'EEE dd, MMM yyyy');

          return cliente;
        });
      })
    );
  }// end of getClientes

  getClientesPage(page: number) {
    return this.httpClient.get(this.url + '/page/' + page).pipe(
      map((response: any) => {
        (response.content as Cliente[]).map(cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();
          return cliente;
        });

        return response;
      })
    );
  }// end of getClientesPage

  create(cliente: Cliente) {
    return this.httpClient.post<any>(this.url, cliente, { headers: this.headers }).pipe(
      catchError(e => {

        if ( e.status === 400 ) {
          return throwError(e);
        }

        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }// end of create

  getCliente(id: number) {
    return this.httpClient.get<Cliente>(`${ this.url }/${ id }`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  update(cliente: Cliente) {
    return this.httpClient.put<Cliente>(`${ this.url }/${ cliente.id }`, cliente, { headers: this.headers }).pipe(
      catchError(e => {

        if ( e.status === 400 ) {
          return throwError(e);
        }

        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }// end of update

  delete(id: number) {
    return this.httpClient.delete<Cliente>(`${ this.url }/${ id }`, { headers: this.headers }).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

}
