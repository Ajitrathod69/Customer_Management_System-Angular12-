import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {
public url:string="https://localhost:7000/api/CustomerManagementWebAPi"
  constructor(private httpClient:HttpClient) { 

  }
  CustomersList()
  {
       return this.httpClient.get(this.url)
  }
  deleteCustomer(Customer_ID:any)
  {
    return this.httpClient.delete(this.url+"/"+Customer_ID);
  }
  AddCustomer(v:any){
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Authorization': '',
  };
    return this.httpClient.post(this.url+"/register",v,{headers}) 
  }
  updateCustomerFetch(v:any){
    
    return this.httpClient.get(this.url+"/fetch?Customer_ID="+v); 
  }
  updateCustomer(v:any){
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Authorization': '',
  };
    return this.httpClient.put(this.url+"/",v,{headers}) 
  }
  viewcustomerServicebyId(id:number)
   {
    return this.httpClient.get(this.url+"/fetch?Customer_ID="+id);
   }
}
