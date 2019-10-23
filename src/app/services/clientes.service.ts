import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { Cliente } from '../clientes/cliente.js';

import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
    return this.httpClient.get<Cliente[]>(this.url);
  }

  create(cliente: Cliente) {
    return this.httpClient.post<any>(this.url, cliente, { headers: this.headers }).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

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
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

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
