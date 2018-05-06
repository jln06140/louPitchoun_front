import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Utilisateur } from '../../../model/Utilisateur';

import { Profil } from '../../../model/profil';
import { ProfilService } from '../../../services/profil.service';
import { UtilisateurService } from '../../../services/utilisateur.service';
import { InformationService } from '../../../services/information.service';
import { InformationParent } from '../../../model/informationParent';
import { InformationEmploye } from '../../../model/InformationEmploye';


@Component({
  selector: 'app-ajout-utilisateur',
  templateUrl: './ajout-utilisateur.component.html',
  styleUrls: ['./ajout-utilisateur.component.css']
})
export class AjoutUtilisateurComponent implements OnInit {
  UtilisateurForm: FormGroup;
  parent: boolean;
  isLinear = true;
  
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  profiSelected;
  informationSelected;
  utilisateurCreated: Utilisateur;
  email: string;
  matricule: string;

  constructor(private formBuilder: FormBuilder,
              private profilService: ProfilService,
              private utilisateurService: UtilisateurService,
              private informationService: InformationService) {}

  ngOnInit() {
    this.inifForm1();
    this.inifForm2();
    this.initForm3();
    // this.initForm();
  }

  inifForm1() {
    this.firstFormGroup = this.formBuilder.group({
      profil: ['', Validators.required]
    });
  }

  inifForm2() {
    this.secondFormGroup = this.formBuilder.group({
      matricule: '',
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      adresse: ['', Validators.required],
      ville: ['', Validators.required],
      email: ['', Validators.email],
      telMobile: ['', Validators.required],
      telFixe: '',
      telPro: '',
      fonction: '',

    });
  }

  initForm3() {
    this.thirdFormGroup = this.formBuilder.group({
      motDePasse: ['', Validators.required],
      confMdp: ['', Validators.required]
    });
  }

  chargeFormulaire(profil: string) {
    if (profil === 'PARENT') {
      this.parent = true;
    } else {
      this.parent = false;
    }
  }


  onSubmitForm1() {
     this.profiSelected = this.firstFormGroup.value['profil'];
  }

  onSubmitForm2() {
    const form2value = this.secondFormGroup.value;
    console.log(form2value);
    this.email = form2value['email'];
    this.matricule = form2value['matricule'];
      this.informationSelected = new InformationParent(
        form2value['matricule'],
        form2value['nom'],
        form2value['prenom'],
        form2value['email'],
        form2value['adresse'],
        form2value['ville'],
        form2value['telMobile'],
        form2value['telFixe'],
        form2value['telPro'],
        form2value['fonction']
      );

    console.log(this.informationSelected);
  }

  onSubmitForm3() {
    const form3value = this.thirdFormGroup.value;
    const login = (parent) ? this.email : this.matricule;
    this.utilisateurCreated = new Utilisateur(
      login,
      form3value['motDePasse'],
      this.informationSelected,
      this.profiSelected

  //   formValue["motDePasse"],
  //   formValue["profil"]
  );
  }

  onSubmitForm() {
   this.utilisateurService.addUtilisateur(this.utilisateurCreated).subscribe(
     ()=>console.log('utilisateur ajouté')
   );
    // console.log(JSON.stringify(newUtilisateur));
  }
}
