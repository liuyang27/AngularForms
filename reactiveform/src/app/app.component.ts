import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  registrationform=new FormGroup({
      userName:new FormControl('zhang san'),
      password:new FormControl(''),
      confirmPassword:new FormControl(''),
      address:new FormGroup({
          city:new FormControl(''),
          state:new FormControl(''),
          postalCode:new FormControl('')
      })

  });

  loadAPIData(){
    
  }
}
