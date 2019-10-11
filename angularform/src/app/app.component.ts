import { Component } from '@angular/core';
import { User } from './user';
import { EnrollmentService } from './enrollment.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angularform';
  topics=['Angular','React','Vue'];

  topicHasError=true;
  submitted=false;

  errorMsg='';

  userModel = new User('Rob','',666666,'default','morning',true)

  constructor(private _enrollmentService:EnrollmentService){}


  validateTopic(v){
    if(v=="default"){
      this.topicHasError=true;
    }else{
      this.topicHasError=false;
    }
  }

  onSubmit(userform){
    //console.log(this.userModel);
    console.log(userform);
    this.submitted=true;
    this._enrollmentService.enroll(this.userModel)
      .subscribe(
        data=>console.log('Success!',data),
        //error=>console.log('Error!',error)
        error=>this.errorMsg=error.statusText // when res.status(200).send({"message":"Data received"});
      )

   }
}
