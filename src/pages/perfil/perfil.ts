import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  usuario = {
    id:this.navParams.get("id"),
    nome:this.navParams.get("nome"),
    email:this.navParams.get("email"),
    senha:this.navParams.get("senha"),
    status:this.navParams.get("status"),
    foto:this.navParams.get("foto")
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

}
