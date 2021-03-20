import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'binance';
  miFormulario=new FormGroup({
    cantidad:new FormControl('' , Validators.required),
    precio:new FormControl('', Validators.required)
  })

  cantidad: any= "precio";
  precio:any= "cantidad";
}
 