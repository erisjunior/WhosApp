import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ConversaPage } from '../conversa/conversa';
import * as firebase from 'Firebase';
import { PerfilPage } from '../perfil/perfil';
import { CadastroGPage } from '../cadastro-g/cadastro-g';
import { ConversaGPage } from '../conversa-g/conversa-g';

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {
  wpp: string = "usuarios";

  usuarios = [];
  grup = [];
  grupos = [];
  ref = firebase.database().ref('usuario/');
  refG = firebase.database().ref('grupo/');

  id = this.navParams.get("id");

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {  
    this.ref.on('value', resp => {
      this.usuarios = [];
      this.usuarios = snapshotToArray(resp);
    });
    this.refG.on('value', resp => {
      this.grup = [];
      this.grup = snapshotToArray(resp);
      let u = 0;
      for (let i = 0; i < this.grup.length; i++) {
        let b = false;
        let a = (this.grup[i]['grupoMembros']).split(',');
        for (let v = 0; v < a.length; v++) {
          if(a[v] === this.id){
            b = true;
          }
        }
        if(b || this.grup[i]['grupoPrivacidade'] === 'publico'){
          this.grupos[u] = this.grup[i];
          u++;
        }
      }
    });

    const toast = this.toastCtrl.create({
      message: 'Bem vindo',
      duration: 2000,
      showCloseButton: true,
      closeButtonText: 'Obrigado'
    });
    toast.present();
  }

  addG(){
    this.navCtrl.push(CadastroGPage, {id:this.navParams.get("id")});
  }

  joinChat(key,a) {
    this.navCtrl.push(ConversaPage, {
      key:key,
      nomecarinha:a,
      id:this.navParams.get("id"),
      nome:this.navParams.get("nome")
    });
  }
  joinGrupo(key,b){
    this.navCtrl.push(ConversaGPage, {
      key:key,
      id:this.navParams.get("id"),
      nome:this.navParams.get("nome"),
      n:b
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
