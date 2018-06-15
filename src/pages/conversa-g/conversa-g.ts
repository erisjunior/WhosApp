import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';

import * as firebase from 'Firebase';
/**
 * Generated class for the ConversaGPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-conversa-g',
  templateUrl: 'conversa-g.html',
})
export class ConversaGPage {
  @ViewChild(Content) content: Content;

  usuario = {
    id:this.navParams.get("id"),
    nome:this.navParams.get("nome")
  }

  data = { type:'', message:'' };
  chats = [];
  roomkey:string;
  nome:string;
  n:string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.roomkey = this.navParams.get("key") as string;
    this.nome = this.navParams.get("nome") as string;
    this.n = this.navParams.get("n") as string;
    this.data.type = 'message';

    // let joinData = firebase.database().ref('grupo/'+this.roomkey+'/chats').push();
    // joinData.set({
    //   type:'join',
    //   user:this.nome,
    //   message:this.nome+' has joined this room.',
    //   sendDate:Date()
    // });
    // this.data.message = '';

    firebase.database().ref('grupo/'+this.roomkey+'/chats').on('value', resp => {
      this.chats = [];
      this.chats = snapshotToArray(resp);
      setTimeout(() => {
        this.content.scrollToBottom(300);
      }, 300);
    });
  }
  sendMessage() {
    if(this.data.message == ''){ }else{
      let newData = firebase.database().ref('grupo/'+this.roomkey+'/chats').push();
      newData.set({
        type:this.data.type,
        user:this.nome,
        userId:this.usuario.id,
        message:this.data.message,
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