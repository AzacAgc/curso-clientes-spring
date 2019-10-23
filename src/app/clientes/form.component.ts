import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Cliente } from './cliente';
import { ClientesService } from '../services/clientes.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  titulo = 'Crear cliente';

  cliente = new Cliente();

  constructor (
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _clientesService: ClientesService
  ) { }

  ngOnInit() {
    this.cargarCliente();
  }

  create() {
    this._clientesService.create(this.cliente).subscribe(json => {
      this.router.navigate(['/clientes']);
      Swal.fire('Nuevo cliente', `Cliente ${ json.cliente.nombre } creado con éxito.`, 'success');
    });
  }// end of create

  cargarCliente() {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this._clientesService.getCliente(id).subscribe(cliente => this.cliente = cliente);
      }
    });
  }// end of cargarCliente

  update() {
    this._clientesService.update(this.cliente).subscribe(cliente => {
      this.router.navigate(['/clientes']);
      Swal.fire('Cliente actualizado', `Cliente ${ cliente.nombre } actualizado con éxito.`, 'success');
    });
  }// end of update

}
