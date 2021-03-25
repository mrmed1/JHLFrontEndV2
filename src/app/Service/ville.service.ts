import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Ville} from '../Model/ville';

@Injectable({
  providedIn: 'root'
})
export class VilleService {

  urlpath: string;
  constructor(private http: HttpClient) {
    this.urlpath = 'http://localhost:8080/Ville';
  }

  getVilleByGouvernoratNom(nomGouvernora: string){
    return this.http.get<Ville[]>(this.urlpath + "/GovNom/" + nomGouvernora);

  }
  getVilleByNom(nom: string){
    return this.http.get<Ville>(this.urlpath + "/nom/" + nom);

  }

}
