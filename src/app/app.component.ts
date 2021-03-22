import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public formGroup: FormGroup;
   oredenCompra = []; 
   oredenVenta = []; 
   contador = 0;
   ordenes = []; 
   ganancia = 0
    disponible = 0; 
    tasa = 0; 

  constructor( private formBuilder: FormBuilder ) { }

  public ngOnInit() {
    this.buildForm();
    
  }

  private buildForm(){
    this.formGroup = this.formBuilder.group({
      cantidad: ['', Validators.required],
      precio: ['', Validators.required],
      tipo: ['', Validators.required]
    });
  }

  guardar(){
    console.log(this.formGroup.value.tipo); 

    let cantidad = parseFloat(this.formGroup.value.cantidad) ; 
    let precio = parseFloat(this.formGroup.value.precio); 
    let tipo = parseInt(this.formGroup.value.tipo); 

    this.ordenes.push({cantidad, precio, tipo, id:this.ordenes.length+1 }); 

    if (tipo == 1) {
      this.oredenCompra.push({cantidad, precio, estado:1}); 
      this.disponible = this.disponible + cantidad; 
      this.tasa = precio; 
    }

    if (tipo == 2) {
      this.oredenVenta.push({cantidad, precio, estado:1}); 
      this.disponible = this.disponible - cantidad; 

    }
    this.formGroup.reset(); 

    console.log(this.oredenCompra);
    console.log(this.oredenVenta);
  }

  calcular() {
    debugger
    this.ganancia = 0 
    this.tasa = 0; 
  
    
    let auxCompra = this.oredenCompra; 
    let auxVenta = this.oredenVenta; 
    let spreed = 0; 
   
        auxCompra.forEach(orden => {

          for (let i = 0; i < auxVenta.length; i++)
          {
              console.log("aqui", orden.cantidad >= auxVenta[i].cantidad)
              if (orden.cantidad >= auxVenta[i].cantidad){
                  
                  spreed = auxVenta[i].precio - orden.precio; 
                  this.ganancia = this.ganancia + (auxVenta[i].cantidad * spreed); 
                  orden.cantidad = orden.cantidad - auxVenta[i].cantidad; 
                  auxVenta[i].estado = 0;
                  console.log("GANANCIA: ",this.ganancia);
              }

              if (orden.cantidad < auxVenta[i].cantidad){
                  // if (oredenVenta[i].estado == 1){
                      let restante = auxVenta[i].cantidad - orden.cantidad;
                      spreed = auxVenta[i].precio - orden.precio; 
                      this.ganancia = this.ganancia + (orden.cantidad * spreed); 
                      auxVenta[i].cantidad = restante; 
                      orden.estado = 0;
                      console.log("GANANCIA", this.ganancia);
                      console.log("se rompe el ciclo");
                      break; 
                  // }
                  
              }
          }
            console.log(orden); 
        });

        // this.oredenCompra = auxCompra;
        // this.oredenVenta = auxVenta; 

        Swal.fire({
          icon: 'success',
          title: 'Calculo de Ganancias',
          text: 'Ganancia: '+ this.ganancia
        })
    }

}
 