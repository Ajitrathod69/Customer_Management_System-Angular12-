import { Component, OnInit } from '@angular/core';
import { PostService } from '../Service/post.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  result:any;
  msg:any;
  closeResult:any
  closeResult1:any
  result12:any;

  Customer_ID: any;
  AddCustomer:any;
  postdata:any;
  message:any;
  data:any;
  newresponse: any;
  
updateCustomer: any;
result2: any;
result3: any;
newresponse2: any;
data1:any;
ID: any;


constructor(private myservice:PostService,private router:Router,private modalService: NgbModal) { 
  this.updateCustomer=new FormGroup(
    {
        FirstName:new FormControl('',[Validators.required,Validators.maxLength(30)]),
        LastName:new FormControl('',[Validators.required,Validators.maxLength(30)]),
        Country:new FormControl('',[Validators.required,Validators.maxLength(30)]),
    });
}
  
ngOnInit(): void {
  this.myservice.CustomersList().subscribe(response=>{this.result=response})
  this.AddCustomer=new FormGroup(
  {
      FirstName:new FormControl('',[Validators.required,Validators.maxLength(30)]),
      LastName:new FormControl('',[Validators.required,Validators.maxLength(30)]),
      Country:new FormControl('',[Validators.required,Validators.maxLength(30)]), 
  } );
}
    
  
delete(Customer_ID:number)
{
  if(window.confirm("are you sure you want delete this Customer"))
  {
    this.myservice.deleteCustomer(Customer_ID)
      .subscribe((r:any)=>
      {
        this.result=r;
        if(this.result)
        {
            window.location.reload();
        }
        else
        {
            this.msg = 'Error delete data';
        }
      });
  }
  this.router.navigate(['/dashboard']);
}
      
View(Customer_ID:any)
{
    this.router.navigate(['/view',Customer_ID]);
}
      

open(content: any,Customer_ID:any) 
{
    this.myservice.viewcustomerServicebyId(Customer_ID).subscribe(r=>{this.result12=r;});
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => 
    {
        this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
}
      
private getDismissReason(reason: any): string 
{
    if (reason === ModalDismissReasons.ESC) 
    {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
        } else {
          return `with: ${reason}`;
        }
}
     
backtoView()
{
    this.router.navigate(['/dashboard']);
 }


addCustomer(content1: any) 
{
    this.modalService.open(content1, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason1(reason)}`;
    });
}
private getDismissReason1(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
}
  

onSubmit()
{
    this.data=this.AddCustomer.value;
    this.myservice.AddCustomer(this.data).subscribe(res=>{if(res)
    {
        this.message="data inserted one";
    }
    else
    {
        this.message="error in data";
    }
    this.router.navigate(['/dashboard']);
  });
}

get FirstName()
{
  return this.AddCustomer.get('FirstName');
}

get LastName()
{
  return this.AddCustomer.get('LastName');
}

get Country()
{
  return this.AddCustomer.get('Country');
}


gotoupdate(content2: any,Customer_ID:any) 
{
  this.ID=Customer_ID;
  this.myservice.updateCustomerFetch(Customer_ID).subscribe((r:any)=>{this.result2=r;this.result3=this.result2;  
    this.updateCustomer.controls['FirstName'].setValue(this.result3?.firstName);
    this.updateCustomer.controls['LastName'].setValue(this.result3?.lastName);
    this.updateCustomer.controls['Country'].setValue(this.result3?.country);
  })
  this.modalService.open(content2, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason2(reason)}`;
  });
}
private getDismissReason2(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
}
 
onSubmit1()
{
  this.data1=this.updateCustomer.value;
  this.data1.Customer_ID=this.ID;
  this.myservice.updateCustomer(this.data1).subscribe((r:any)=>{this.newresponse2;});
  window.location.reload();
}
}



