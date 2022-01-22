import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/_models/cliente';
import { ClienteService } from 'src/app/_service/cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  titulo: string = 'Formulario para Clientes';


   errores:string[];

  public cliente: Cliente = new Cliente();

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCliente();
  }

  //Metodo update con la forma de respuesta como parametro observable any  y create con parametro Cliente (checar service metodo propio)
  
  updateCliente() {
    this.clienteService.updateCliente(this.cliente).subscribe(respuesta => {
      this.router.navigate(['/clientes']);
      Swal.fire(
        'Cliente Actualizado',
        `Cliente ${respuesta.cliente.nombre} actualizado con éxito`,
        'success'
      );
    },
    //Codigo para las validaciones de errores desde el back
    err=>{
      this.errores = err.error.errors as string[];
      console.error(err.error.errors)
      console.error('Codigo del error desde el backend: '+err.status);
    });
  }

  //Metodo en component para traer cliente por Id
  getCliente() {
    this.activateRoute.params.subscribe((params) => {
      let id = params['id'];
      if (id) {
        this.clienteService
          .getCliente(id)
          .subscribe((cliente) => (this.cliente = cliente));
      }
    });
  }


  //Metodo create con la forma de respuesta como parametro observable Cliente  y update con parametro any (checar service metodo propio)
  //MEtodo en component para crear Cliente
  create(): void {
    console.log('Cliente Guardado');
    console.log(this.cliente);

    this.clienteService.create(this.cliente).subscribe(cliente => {
      this.router.navigate(['/clientes']);
      Swal.fire(
        'Nuevo cliente',
        `Cliente ${cliente.nombre} creado con éxito`,
        'success'
      );
    },
    //Codigo para las validaciones de errores desde el back
    err=>{
      this.errores = err.error.errors as string[];
      console.error(err.error.errors)
      console.error('Codigo del error desde el backend: '+err.status);
    }
    );
  }
}
