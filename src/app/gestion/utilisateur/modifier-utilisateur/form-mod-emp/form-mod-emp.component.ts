import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { CustomValidators } from '../../../../tools/custom-validators';
import { Utilisateur } from '../../../../model/Utilisateur';
import { Employe } from '../../../../model/employe';
import { UtilisateurService } from '../../../../services/utilisateur.service';
import { EmployeService } from '../../../../services/employe.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { ProfilEnum } from '../../../../enum/profil-enum.enum';
import { MatSnackBar } from '@angular/material';
import { tap } from 'rxjs/operators';
import { ProfilService } from '../../../../services/profil.service';

@Component({
  selector: 'app-form-mod-emp',
  templateUrl: './form-mod-emp.component.html',
  styleUrls: ['./form-mod-emp.component.css']
})
export class FormModEmpComponent implements OnInit {
  @Input() employe: Utilisateur;

  employeToUpdate: Employe;
  motDePasse: any;
  confirmation: string;
  ListeProfil: string[];
  sectionList: string[];

  employetModForm: NgForm;

  constructor(
    private formBuilder: FormBuilder,
    private employeService: EmployeService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private profilService: ProfilService
  ) { }

  ngOnInit() {
    // this.ListeProfil = this.profilService.listeProfils;
    // console.log(this.profilService.listeProfils);
    this.sectionList = ['Petit', 'Moyen', 'Grand'];
    this.UtilisateurToParent();
  }

  getInfo() {
    return this.employeToUpdate.infoEmploye;
  }

  UtilisateurToParent() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = +params.get('id');
      this.employeService
        .getEmploye(id)
        .subscribe(data => (this.employeToUpdate = data));
    });
  }

  onSubmitForm(form: NgForm) {
    if (form.valid) {
      if (this.motDePasse != null) {
        this.employeToUpdate.motDePasse = this.motDePasse;
      }
      console.log(JSON.stringify(form.value));
      this.employeService
        .updateEmploye(this.employeToUpdate.id, this.employeToUpdate)
        .subscribe(
          () => { this.router.navigate(['gestion/listeUtilisateur']); this.openSnackBar('Employe modifié avec succes', 'Succes'); },
          (err) => this.openSnackBar( "Erreur",err.error.message)
        );
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
