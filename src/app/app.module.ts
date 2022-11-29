import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

//COMPONENTS. Huske at tilføje nye sider/components her. Det gøres ikke automatisk
import { AppComponent } from './app.component';
import { HomePage } from './home/home.page';
import { MyMapComponent } from './my-map/my-map.component';
import { BurgermenuComponent } from './burgermenu/burgermenu.component';
import { MessageBoardComponent } from './message-board/message-board.component'
import { ProfileComponent } from './profile/profile.component'
import { SettingsComponent } from './settings/settings.component'

// MODULES TIL 'MAP'
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

// MODULES TIL JSON LOAD I 'MAP' (TESTET I HOME)
// (INGEN)

// ROUTES
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePage },
  { path: 'map', component: MyMapComponent },
  { path: 'messages', component: MessageBoardComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'setting', component: SettingsComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    MyMapComponent,
    BurgermenuComponent,
    MessageBoardComponent,
    ProfileComponent,
    SettingsComponent,
    // NOTE: Husk at tilføje nye sider her
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    IonicModule,
    LeafletModule,
    // RouterModule.forChild([
    //   {
    //     path: '',
    //     component: HomePage
    //   }
    // ]),
    // AppRoutingModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    
    IonicModule.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule {}