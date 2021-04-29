import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {ConstantService} from '../../../../core/constant/constant.service';
import {Subscription} from 'rxjs';
import {StoreService} from '../../../../core/store/store.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  public sidebarColor = 'primary';
  private listTitles: any[];
  location: Location;
  mobileMenuVisible: any = 0;
  private toggleButton: any;
  private sidebarVisible: boolean;
  title: string;
  public isCollapsed = true;
  closeResult: string;
  subscription : Array<Subscription>;

  constructor(
    location: Location,
    private element: ElementRef,
    private router: Router,
    private modalService: NgbModal,
    private constant: ConstantService,
    private store: StoreService
  ) {
    this.location = location;
    this.sidebarVisible = false;
  }
  ngOnInit() {
    this.subscription = [];
    window.addEventListener('resize', this.updateColor);
    this.listTitles = this.constant.appRoutes.filter(listTitle => listTitle);
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    this.router.events.subscribe(event => {
      this.sidebarClose();
      const $layer: any = document.getElementsByClassName('close-layer')[0];
      if ($layer) {
        $layer.remove();
        this.mobileMenuVisible = 0;
      }
    });
    this.getTitle();
    this.changeSidebarColor(this.sidebarColor);
  }
  ngOnDestroy(){
    this.subscription.forEach(x => {x.unsubscribe()});
    window.removeEventListener('resize', this.updateColor);
    localStorage.clear();
  }
  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  updateColor = () => {
    const navbar = document.getElementsByClassName('navbar')[0];
    if (window.innerWidth < 993 && !this.isCollapsed) {
      navbar.classList.add('bg-white');
      navbar.classList.remove('navbar-transparent');
    } else {
      navbar.classList.remove('bg-white');
      navbar.classList.add('navbar-transparent');
    }
  };
  collapse() {
    this.isCollapsed = !this.isCollapsed;
    const navbar = document.getElementsByTagName('nav')[0];
    if (!this.isCollapsed) {
      navbar.classList.remove('navbar-transparent');
      navbar.classList.add('bg-white');
    } else {
      navbar.classList.add('navbar-transparent');
      navbar.classList.remove('bg-white');
    }
  }

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const mainPanel = (
      document.getElementsByClassName('main-panel')[0]
    ) as HTMLElement;
    const html = document.getElementsByTagName('html')[0];
    if (window.innerWidth < 991) {
      mainPanel.style.position = 'fixed';
    }

    setTimeout(() => {
      toggleButton.classList.add('toggled');
    }, 500);

    html.classList.add('nav-open');

    this.sidebarVisible = true;
  }
  sidebarClose() {
    const html = document.getElementsByTagName('html')[0];
    this.toggleButton.classList.remove('toggled');
    const mainPanel = (
      document.getElementsByClassName('main-panel')[0]
    ) as HTMLElement;

    if (window.innerWidth < 991) {
      setTimeout(() => {
        mainPanel.style.position = '';
      }, 500);
    }
    this.sidebarVisible = false;
    html.classList.remove('nav-open');
  }
  sidebarToggle() {
    // const toggleButton = this.toggleButton;
    // const html = document.getElementsByTagName('html')[0];
    const $toggle = document.getElementsByClassName('navbar-toggler')[0];

    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
    const html = document.getElementsByTagName('html')[0];

    if (this.mobileMenuVisible === 1) {
      // $('html').removeClass('nav-open');
      html.classList.remove('nav-open');
      // if ($layer) {
      //   $layer.remove();
      // }
      setTimeout(() => {
        $toggle.classList.remove('toggled');
      }, 400);

      this.mobileMenuVisible = 0;
    } else {
      setTimeout(() => {
        $toggle.classList.add('toggled');
      }, 430);

      const $layer = document.createElement('div');
      $layer.setAttribute('class', 'close-layer');

      if (html.querySelectorAll('.main-panel')) {
        document.getElementsByClassName('main-panel')[0].appendChild($layer);
      } else if (html.classList.contains('off-canvas-sidebar')) {
        document
          .getElementsByClassName('wrapper-full-page')[0]
          .appendChild($layer);
      }

      setTimeout(() => {
        $layer.classList.add('visible');
      }, 100);

      $layer.onclick = function() {
        // asign a function
        html.classList.remove('nav-open');
        this.mobileMenuVisible = 0;
        $layer.classList.remove('visible');
        setTimeout(() => {
          $layer.remove();
          $toggle.classList.remove('toggled');
        }, 400);
      }.bind(this);

      html.classList.add('nav-open');
      this.mobileMenuVisible = 1;
    }
  }

  getTitle() {
    this.getTitleHelper();
    this.subscription.push(
      this.router.events.subscribe((val) => {
        this.getTitleHelper();
      })
    );
  }
  getTitleHelper() {
    const url = this.location.prepareExternalUrl(this.location.path());
    this.listTitles.find((element) => {
      if (element.path === String(url)) {
        this.title = element.title;
      }
    });
  }

  open(content) {
    this.modalService.open(content, {windowClass: 'modal-search'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  changeSidebarColor(color){
    console.log(color);
    const sidebar = document.getElementsByClassName('sidebar')[0];
    const mainPanel = document.getElementsByClassName('main-panel')[0];

    this.sidebarColor = color;

    if(sidebar !== undefined){
      sidebar.setAttribute('data',color);
    }
    if(mainPanel !== undefined){
      mainPanel.setAttribute('data',color);
    }
  }
  changeDashboardColor(color){
    const body = document.getElementsByTagName('body')[0];
    if (body && color === 'white-content') {
      body.classList.add(color);
      this.store.updateTheme(true);
    }
    else if(body.classList.contains('white-content')) {
      body.classList.remove('white-content');
      this.store.updateTheme(false);
    }
  }
  logout(): void{
    this.router.navigateByUrl('/login').then();
  }
}
