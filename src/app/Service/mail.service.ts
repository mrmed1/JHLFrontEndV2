import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  urlpath: string;
  constructor(private http: HttpClient) {
    this.urlpath = 'http://localhost:8080/Mail';
  }


  accepterDemande(id: number)
  {

    return this.http.get<any>(this.urlpath + '/sendConfirmMessage/' + id);
  }


  refuserDemande(id: number)
  {
    return this.http.get(this.urlpath + '/sendDenyMessage/' + id);
  }

}

