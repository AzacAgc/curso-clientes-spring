import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Cliente } from './cliente';
import { ClientesService } from '../services/clientes.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [];

  page = 0;
  paginador: any;

  constructor (
    private _clientesService: ClientesService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.page = +params.get('page');

      if (this.page === undefined) {
        this.page = 0;
      }

      this._clientesService.getClientesPage(this.page).subscribe(response => {
        this.clientes = response.content;
        this.paginador = response;
      });
    });
  }

  delete(cliente: Cliente) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: '¿Estás seguro?',
      text: `¿Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡Si, eliminar!',
      cancelButtonText: '¡No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this._clientesService.delete(cliente.id).subscribe(resp => {
          this.clientes = this.clientes.filter(customer => customer.id !== cliente.id);

          swalWithBootstrapButtons.fire(
            '¡Cliente eliminado!',
            `Cliente ${cliente.nombre} eliminado con éxito.`,
            'success'
          );
        });
      }
    });
  }

}
