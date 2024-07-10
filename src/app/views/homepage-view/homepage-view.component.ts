import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShareService } from 'src/app/services/share.service';

@Component({
  selector: 'app-homepage-view',
  templateUrl: './homepage-view.component.html',
  styleUrls: ['./homepage-view.component.css']
})
export class HomepageViewComponent implements OnInit, OnDestroy {

  constructor(
    private shareService: ShareService
  ) { }

  ngOnInit(): void {
    this.shareService.scrollRequested$.subscribe((target) => {
      this.scrollToRegister(target)
    })

  }
  scrollToRegister(target: any) {
    const divContainer = document.getElementById('registerComponent')
    if (divContainer) {
      switch (target) {
        case 'samePage':
          divContainer.scrollIntoView({behavior: "smooth", block: "start"})
          return
        case 'anotherPage':
          divContainer.scrollIntoView(true)
          return
        default:
          return
      }
    }
  }

  ngOnDestroy(){
this.shareService.requestScroll(null)
  }
}
