import { Component, OnInit } from '@angular/core';

import { Cliente } from './cliente';
import { ClientesService } from '../services/clientes.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [];

  constructor (
    private _clientesService: ClientesService
  ) { }

  ngOnInit() {
    this._clientesService.getClientes().subscribe(clientes => this.clientes = clientes);
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
