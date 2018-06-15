import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public toastCtrl: ToastController) {
  }
  addUsuario(usuario) {
    if(this.usuario.usuarioNome === '' ||this.usuario.usuarioStatus === ''||this.usuario.usuarioEmail === ''||this.usuario.usuarioSenha === ''){
      const alert = this.alertCtrl.create({
        title: 'ERROR!',
        subTitle: 'Preencha todos os campos',
        buttons: ['OK']
      });
      alert.present();
    }else{
      if(this.usuario.usuarioFoto === ''){
        this.usuario.usuarioFoto = 'data:image/jpeg;base64,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';
      }
      const toast = this.toastCtrl.create({
        message: 'Cadastro Realizado com sucesso',
        duration: 2000,
        showCloseButton: true,
        closeButtonText: 'Ok'
      });
      toast.present();
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
  }


}
