import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MainPage } from '../pages/main/main';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { SearchPipe } from '../pipes/search/search';
import { PerfilPage } from '../pages/perfil/perfil';
import { ConversaPage } from '../pages/conversa/conversa';
import { CadastroGPage } from '../pages/cadastro-g/cadastro-g';
import { ConversaGPage } from '../pages/conversa-g/conversa-g';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MainPage,
    CadastroPage,
    SearchPipe,
    PerfilPage,
    ConversaPage,
    CadastroGPage,
    ConversaGPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MainPage,
    CadastroPage,
    PerfilPage,
    ConversaPage,
    CadastroGPage,
    ConversaGPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
