import {Component, OnInit, ViewChild} from '@angular/core';
import {AddFournisseurComponent} from '../add-fournisseur/add-fournisseur.component';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {DetailFournisseurComponent} from '../detail-fournisseur/detail-fournisseur.component';
import {EditFournisseurComponent} from '../edit-fournisseur/edit-fournisseur.component';
import {MatTableDataSource} from '@angular/material/table';
import {NotificationService} from '../../../Service/notification.service';
import {FournisseurService} from '../../../Service/fournisseur.service';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {Fournisseur} from '../../../Model/fournisseur';
import {EditAdministrateurComponent} from "../../Administrateur/edit-administrateur/edit-administrateur.component";
import {AddAdministrateurComponent} from "../../Administrateur/add-administrateur/add-administrateur.component";
import {DetailAdminComponent} from "../../Administrateur/detail-admin/detail-admin.component";
import {EditLivreurComponent} from "../../Livreur/edit-livreur/edit-livreur.component";
import {AddLivreurComponent} from "../../Livreur/add-livreur/add-livreur.component";
import {DetailsLivreurComponent} from "../../Livreur/details-livreur/details-livreur.component";

@Component({
  selector: 'app-list-fournisseur',
  templateUrl: './list-fournisseur.component.html',
  styleUrls: ['./list-fournisseur.component.css']
})
export class ListFournisseurComponent implements OnInit {

  displayedColumns: string[] = ['Nom Commercial', 'login', 'nom', 'prenom', 'tel', 'adresse.ville.gouvernorat.nom', 'adresse.ville.nom', 'actions'];
  dataSource: MatTableDataSource<any>;
  listfournisseur: Fournisseur[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  searchKey: any;

  constructor(private fournisseurService: FournisseurService,
              private notificationService: NotificationService,
              private dialog: MatDialog) {

  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLocaleLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.fournisseurService.getAllFournisseur().subscribe(
      res => {

        this.listfournisseur = res;
        this.dataSource = new MatTableDataSource(this.listfournisseur);
        this.dataSource.filterPredicate = (data, filter: string)  => {
          const accumulator = (currentTerm, key) => {
            return this.nestedFilterCheck(currentTerm, data, key);
          };
          const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
          // Transform the filter by converting it to lowercase and removing whitespace.
          const transformedFilter = filter.trim().toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };
        this.dataSource.sortingDataAccessor = (item, property) => {
          switch (property) {
            case 'adresse.ville.gouvernorat.nom': return item.adresse.ville.gouvernorat.nom;
            case 'adresse.ville.nom' : return item.adresse.ville.nom;
            default: return item[property];
          }
        };
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.listfournisseur);
      }

    );

  }

  nestedFilterCheck(search, data, key) {
    if (typeof data[key] === 'object') {
      for (const k in data[key]) {
        if (data[key][k] !== null) {
          search = this.nestedFilterCheck(search, data[key], k);
        }
      }
    } else {
      search += data[key];
    }
    return search;
  }
  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  reloadData() {
    this.fournisseurService.getAllFournisseur().subscribe(
      data => {
        this.listfournisseur = data;
        this.dataSource = new MatTableDataSource(this.listfournisseur);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  onDelete(id: any) {
    if (confirm('Confirmez-vous la suppression ?' )) {
      this.fournisseurService.deleteFournisseur(id).subscribe(
        () =>
        {
          this.reloadData();
        }
      );
      this.notificationService.warn(' supprimé avec succées !');
    }
  }



  onEdit(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.maxWidth = '100%';
    dialogConfig.minWidth = '40%';
    dialogConfig.panelClass = "marg";
    dialogConfig.data = row;
    this.dialog.open(EditFournisseurComponent, dialogConfig);
  }
  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.maxWidth = '100%';
    dialogConfig.minWidth = '40%';
    dialogConfig.panelClass = 'marg';
    this.dialog.open(AddFournisseurComponent, dialogConfig);
  }


  getDetails(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = row;
    dialogConfig.maxWidth = '100%';
    dialogConfig.minWidth = '40%';
    dialogConfig.panelClass = "marg";

    this.dialog.open(DetailFournisseurComponent, dialogConfig);
  }

}
