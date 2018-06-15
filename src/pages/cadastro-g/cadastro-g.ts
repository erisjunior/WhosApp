import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import * as firebase from 'Firebase';
/**
 * Generated class for the CadastroGPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro-g',
  templateUrl: 'cadastro-g.html',
})
export class CadastroGPage {

  //membros = [];

  usuarios = [];
  id = this.navParams.get("id");
  refA = firebase.database().ref('usuario/');
  grupo = { 
    grupoNome: '',
    grupoFoto: '',
    grupoPrivacidade: '',
    grupoMembros:''
  };
  ref = firebase.database().ref('grupo/');

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    console.log(this.id);
    this.refA.on('value', resp => {
      this.usuarios = [];
      this.usuarios = snapshotToArray(resp);
    });
  }
  addGrupo(grupo) {
    if(this.grupo.grupoNome === ''){
      const alert = this.alertCtrl.create({
        title: 'ERROR!',
        subTitle: 'Preencha todos os campos',
        buttons: ['OK']
      });
      alert.present();
    }else{
      if(this.grupo.grupoFoto === ''){
        this.grupo.grupoFoto = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeC9yr_UpIJ4lvzeuODhYvUxsGybx2OZPlmJVeqKYDsyifiJtvZQ';
      }
      // this.membros = this.grupo.grupoMembros.split(',');

      this.grupo.grupoMembros = this.grupo.grupoMembros +","+ this.id;

      let newData = this.ref.push();
      newData.set({
        grupoNome: this.grupo.grupoNome,
        grupoFoto: this.grupo.grupoFoto,
        grupoPrivacidade: this.grupo.grupoPrivacidade,
        grupoMembros: this.grupo.grupoMembros
      });
      this.navCtrl.pop();
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