import { Component, OnInit } from '@angular/core';

import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './burgermenu.component.html',
  styleUrls: ['./burgermenu.component.scss'],
})


export class BurgermenuComponent implements OnInit {
  public urlPos = window.location.pathname.slice(1)
  
  private pushIcon(array){
    for (let i = 0; i < array.length; i++) {
      if(array[i].urlRoute === this.urlPos) {
          array[i].iconSlot = "end";
        }
      else {
          array[i].iconSlot = "start";
        }
    }
  }
  // DET VIRKER IKKE HELT GODT ENDNU.
  // Problemet er, at menu'en loader én gang, og ikke reloader for hvert klik.
  // Kan det klares med et @Input som i TOH?
  // Findes der en function til (click), som man kunne smide i samme function som closeMenu() nedenfor?


  MenuItems = [
    {
      title: 'Home, hjem',
      icon: 'home',
      id: 'menuHome',
      urlRoute: 'home',
      // iconSlot: 'start',
    },
    {
      title: 'Kort, map',
      icon: 'map',
      id: 'menuMap',
      urlRoute: 'map',
      // iconSlot: 'start',
    },
    {
      title: 'Rediger profil',
      icon: 'person',
      id: 'menuProfile',
      urlRoute: 'profile',
      // iconSlot: 'start',
    },
    {
      title: 'Beskeder',
      icon: 'chatbubbles',
      id: 'menuMessages',
      urlRoute: 'messages',
      // iconSlot: 'start',
      badge: {
        toggle: true,
        name: 22,
      },
    },
    {
      title: 'Aktiviteter',
      icon: 'paper',
      id: 'menuActivities',
      urlRoute: 'home',
      // iconSlot: 'start',
    },
    {
      title: 'Instillinger',
      icon: 'settings',
      id: 'menuSettings',
      urlRoute: 'settings',
      // iconSlot: 'start',
    },
  ]

  constructor(private menu: MenuController){}

  closeMenu() {
    this.menu.close();
    // location.href='/profile' // Gammel test til at have link i funktion. Virker, men uddateret.
  }

  ngOnInit() {
    this.pushIcon(this.MenuItems)
  }
  
}
