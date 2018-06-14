import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { ConversaPage } from '../conversa/conversa';
import * as firebase from 'Firebase';
import { PerfilPage } from '../perfil/perfil';

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {
  wpp: string = "usuarios";

  usuarios = [];
  ref = firebase.database().ref('usuario/');

  id = this.navParams.get("id");

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController,public loadingCtrl: LoadingController) {

    this.ref.on('value', resp => {
      this.usuarios = [];
      this.usuarios = snapshotToArray(resp);
    });

    const toast = this.toastCtrl.create({
      message: 'Bem vindo',
      duration: 2000,
      showCloseButton: true,
      closeButtonText: 'Obrigado'
    });
    toast.present();
  }

  joinChat(key,a) {
    this.navCtrl.push(ConversaPage, {
      key:key,
      nomecarinha:a,
      id:this.navParams.get("id"),
      nome:this.navParams.get("nome"),
      email:this.navParams.get("email"),
      senha:this.navParams.get("senha"),
      status:this.navParams.get("status"),
      foto:this.navParams.get("foto")
    });
  }

  Perfil(){
    this.navCtrl.push(PerfilPage,{
      id:this.navParams.get("id"),
      nome:this.navParams.get("nome"),
      email:this.navParams.get("email"),
      senha:this.navParams.get("senha"),
      status:this.navParams.get("status"),
      foto:this.navParams.get("foto")
    });
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
