import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';

import * as firebase from 'Firebase';

/**
 * Generated class for the ConversaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-conversa',
  templateUrl: 'conversa.html',
})
export class ConversaPage {
  @ViewChild(Content) content: Content;

  usuario = {
    id:this.navParams.get("id"),
    nome:this.navParams.get("nome"),
    email:this.navParams.get("email"),
    senha:this.navParams.get("senha"),
    status:this.navParams.get("status"),
    foto:this.navParams.get("foto")
  }

  data = { message:'' };
  cha = [];
  chats = [];
  userKey:string;
  nomecarinha:string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.userKey = this.navParams.get("key") as string;
    this.nomecarinha = this.navParams.get("nomecarinha") as string;

    // let joinData = firebase.database().ref('chatrooms/'+this.roomkey+'/chats').push();
    // joinData.set({
    //   type:'join',
    //   user:this.nickname,
    //   message:this.nickname+' has joined this room.',
    //   sendDate:Date()
    // });
    // this.data.message = '';

    setTimeout(() => {
      this.content.scrollToBottom(300);
    }, 300);

    firebase.database().ref('chats/').on('value', resp => {
      this.cha = [];
      this.cha = snapshotToArray(resp);
      let u = 0;
      for (let i = 0; i < this.cha.length; i++) {
        if((this.cha[i]['userId'] == this.usuario.id && this.cha[i]['toId'] == this.userKey) || (this.cha[i]['userId'] == this.userKey && this.cha[i]['toId'] == this.usuario.id)){
          this.chats[u] = this.cha[i];
          u++;
        }
      }
    });

  }

  sendMessage() {
    if(this.data.message == ''){ }else{
      let newData = firebase.database().ref('chats/').push();
      newData.set({
        message:this.data.message,
        user:this.usuario.nome,
        userId:this.usuario.id,
        toId:this.userKey,
        sendDate:Date()
      });
      this.data.message = '';
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