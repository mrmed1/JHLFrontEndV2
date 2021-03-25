import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddAdministrateurComponent} from './Admin_Panel/Administrateur/add-administrateur/add-administrateur.component';
import {ListAdminComponent} from './Admin_Panel/Administrateur/list-admin/list-admin.component';
import {ListFournisseurComponent} from './Admin_Panel/fournisseur/list-fournisseur/list-fournisseur.component';
import {DashbordComponent} from './Dashbord/dashbord.component';
import {ListGestionnaireDepotComponent} from './Admin_Panel/GestionnaireDepot/list-gestionnaire-depot/list-gestionnaire-depot.component';
import {ListLivreurComponent} from './Admin_Panel/Livreur/list-livreur/list-livreur.component';
import {ListeDemandeInscriptionComponent} from './liste-demande-inscription/liste-demande-inscription.component';
import {DemandeFournisseurComponent} from './demande-fournisseur/demande-fournisseur.component';
import {InscriptionFComponent} from './Inscription-Fournisseur/inscription-f.component';
import {TemplateComponent} from './template/template.component';
import {AccueilComponent} from './accueil/accueil.component';
import {LoginComponent} from './Login/login.component';

const routes: Routes = [
      {path: '', component: AccueilComponent},
      {path: 'inscriptionF', component: InscriptionFComponent},
       {path: 'login', component: LoginComponent},

      {path: 'temp', component: TemplateComponent, children : [
      {path: 'addAdmin', component: AddAdministrateurComponent},
      {path: 'List_admin', component: ListAdminComponent},
      {path: 'List_Fournisseur', component: ListFournisseurComponent},
      {path: 'List_GestDepot', component: ListGestionnaireDepotComponent},
      {path: 'List_Livreur', component: ListLivreurComponent},
      {path: 'DemandeFour/:id', component: DemandeFournisseurComponent},
      {path: 'listDemandeFour', component: ListeDemandeInscriptionComponent},
      {path: '', component: DashbordComponent},
    ]},




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
