import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Cliente } from '../_models/cliente';
import { ClienteService } from '../_service/cliente.service';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[];

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {

    this.clienteService
      .getClientes().pipe(
        tap(clientes =>{
          console.log('ClienteService: tap 3')
          clientes.forEach(cliente=>{
            console.log(cliente.nombre);
          });
          
        })
      )
      .subscribe(clientes => this.clientes = clientes);
  }

  //Metodo en component par eliminar cliente por ID
  deleteCliente(cliente: Cliente) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: '¿Estas Seguro?',
        text: `¿Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido} ?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.clienteService.deleteCliente(cliente.id).subscribe((reponse) => {
            //***********************
            //quitrar del listado de clientes para que se actualice automaticamente
            this.clientes = this.clientes.filter((clie) => clie !== cliente);
            ///*********************** */

            swalWithBootstrapButtons.fire(
              'Cliente Eliminado!',
              `Cliente ${cliente.nombre} ${cliente.apellido} eliminado con éxito`,
              'success'
            );
          });
        }
      });
  }
}
