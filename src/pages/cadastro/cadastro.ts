import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'Firebase';

/**
 * Generated class for the CadastroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {
  usuario = { 
    usuarioNome: '',
    usuarioStatus: '',
    usuarioEmail: '',
    usuarioFoto: '',
    usuarioSenha: '' 
  };
  ref = firebase.database().ref('usuario/');

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  addUsuario(usuario) {
    let newData = this.ref.push();
    newData.set({
      usuarioNome: this.usuario.usuarioNome,
      usuarioStatus: this.usuario.usuarioStatus,
      usuarioEmail: this.usuario.usuarioEmail,
      usuarioFoto: this.usuario.usuarioFoto,
      usuarioSenha: this.usuario.usuarioSenha
    });
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }

}
