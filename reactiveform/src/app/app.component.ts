import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';

import { FormBuilder, Validators,FormArray } from '@angular/forms';
import { forbiddenNameValidator } from './shared/user-name.validator';
import { PasswordValidator } from './shared/password.validator';
import { RegistrationService } from './registration.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  registrationform2:FormGroup;



  constructor(private fb:FormBuilder,private registrationService:RegistrationService){}



  ngOnInit(){
    
      /////////////////////method 2:build form/////////////////////////
      this.registrationform2=this.fb.group({
        userName:['',[Validators.required,Validators.minLength(3),forbiddenNameValidator(/password/)]],
        email:[''],
        subscribe:[false],
        password:[''],
        confirmPassword:[''],
        address: this.fb.group({
          city:['NYC'],
          state:['somewhere in US'],
          postalCode:['1111111']
        }),
        alternateEmails:this.fb.array([])
        
      },{validators:PasswordValidator});

      this.registrationform2.get('subscribe').valueChanges
        .subscribe(checkedValue =>{
          const email = this.registrationform2.get('email');
          if(checkedValue){
            email.setValidators(Validators.required);
          }else{
            email.clearValidators();
          }
          email.updateValueAndValidity();
        })
  }


  get userName(){
    return this.registrationform2.get('userName');
  }

  get email(){
    return this.registrationform2.get('email');
  }

  
  get alternateEmails(){
    return this.registrationform2.get('alternateEmails') as FormArray;
  }
  addAlternateEmails(){
    this.alternateEmails.push(this.fb.control(''));
  }


  /////////////////////////method 1:build form/////////////////////////////
  registrationform=new FormGroup({
      userName:new FormControl('zhang san'),
      email:new FormControl(''),
      subscribe:new FormControl(false),
      password:new FormControl(''),
      confirmPassword:new FormControl(''),
      address:new FormGroup({
          city:new FormControl(''),
          state:new FormControl(''),
          postalCode:new FormControl('')
      }),
  });

  /////////////////////change data////////////////////////////////
  loadAPIData(){
    //use setValue for set all data
    this.registrationform.setValue({
      userName:'li si',
      email:'123@456.com',
      subscribe:true,
      password:'12345',
      confirmPassword:'12345',
      address:{
          city:'earth',
          state:'somewhere on earth',
          postalCode:'555555'
      }
    });

    //some delay...
    setTimeout(() => {
        //use patchValue for set partial data
        this.registrationform2.patchValue({
          userName:'wang wu',
          email:'aaa@bbb.com',
          address:{
            city:'Mars',
            state:'somewhere on Mars',
            postalCode:'9999'
          }
        });
    }, 3000);
  }


  onSubmit(){
    console.log(this.registrationform2);
    this.registrationService.register(this.registrationform2.value)
      .subscribe(
        response => console.log('Success!',response),
        error => console.log('Error!',error)
      );
  }

}
