import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { CadastroPage } from '../cadastro/cadastro';
import { MainPage } from '../main/main';

import * as firebase from 'Firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  usuario = { email:"", senha:"", id:"" };
  usuarios = [];
  ref = firebase.database().ref('usuario/');

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.ref.on('value', resp => {
      this.usuarios = [];
      this.usuarios = snapshotToArray(resp);
    });
  }

  newAccount(){
    this.navCtrl.push(CadastroPage);
  }

  Login(){

    let o = false;

    for (let i = 0;  i< this.usuarios.length; i++) {
      if(this.usuarios[i]['usuarioEmail'] == this.usuario.email){
        if(this.usuarios[i]['usuarioSenha'] == this.usuario.senha){
          this.navCtrl.setRoot(MainPage, {
            email: this.usuarios[i]['usuarioEmail'],
            nome: this.usuarios[i]['usuarioNome'],
            id: this.usuarios[i]['key'],
            senha: this.usuarios[i]['usuarioSenha'],
            status: this.usuarios[i]['usuarioStatus'],
            foto: this.usuarios[i]['usuarioFoto'],
          });
          o = true;
        }
      }  
    }
    if(!o){
      const alert = this.alertCtrl.create({
        title: 'ERROR!',
        subTitle: 'Email e/ou Senha Incorretos',
        buttons: ['OK']
      });
      alert.present();
    }

  }

}

export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
  });

  return returnArr;
};