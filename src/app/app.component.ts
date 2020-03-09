import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  myForm: FormGroup;

  private url : String = `https://finsolred-server.herokuapp.com/api/sendmail`;
  private body = null;

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      name: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      message: new FormControl('')
    });
  }


  doSomething() {

    const name = this.myForm.get('name').value;
    const email = this.myForm.get('email').value;
    const phone = this.myForm.get('phone').value;
    const message = this.myForm.get('message').value;

    console.log(name, email, phone, message);

    this.body = {
      name,
      email, 
      phone, 
      message
    }
    console.log('Submit', this.body);

    this.http.post(''+this.url, this.body, httpOptions)
      .subscribe(res => {
        console.log(res);
      }, (err) => {
        console.log('ERROR: ', err);
      });
  }
  

}
