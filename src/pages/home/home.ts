import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CadastroPage } from '../cadastro/cadastro';
import { MainPage } from '../main/main';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  newAccount(){
    this.navCtrl.push(CadastroPage);
  }

  Login(usuario){
    
    this.navCtrl.setRoot(MainPage);

  }

}
