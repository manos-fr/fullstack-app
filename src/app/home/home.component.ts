import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
import { Notifications, Song } from '../domain/interfaces';
import { SongService } from '../services/songService';
import { filter, map, take, tap } from 'rxjs/operators';
import { Table } from 'primeng/table';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ConfirmationService, MessageService, SongService],
})
export class HomeComponent implements OnInit {
  displaySideBar;
  items: MenuItem[];
  productDialog: boolean;
  subscription: Subscription;
  songs: Song[] = [];
  song: Song;
  selectedSongs: Song[];
  selectedNotifications: Notifications[];
  submitted: boolean;
  statuses: any[];
  loading: boolean;
  searchForm: FormGroup;
  selectedNotification: Notifications;

  notifications: Notifications[] = [
    {
      id: '1',
      description: 'Like',
      name: 'George',
      artist: 'Nirvanna',
    },
    {
      id: '2',
      description: 'Sad',
      name: 'Manos',
      artist: 'Foo Fighters',
    },
    {
      id: '3',
      description: 'Laugh',
      name: 'Mary',
      artist: 'Led Zeppelin',
    },
  ];

  constructor(
    private router: Router,
    public songService: SongService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.initSearchForm();
    this.items = [
      {
        label: '',
        icon: 'pi pi-fw pi-home',
        command: () => {
          let currentUrl = this.router.url;
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate([currentUrl]);
        },
      },
      {
        label: '',
        icon: 'pi pi-fw pi-cog',
        items: [
          {
            label: 'Change Password',
            icon: 'pi pi-fw pi-unlock',
            command: () => {
              console.log('Change Password');
              this.router.navigate([`/auth/change`]);
            },
          },
          {
            label: 'Toggle Theme',
            icon: 'pi pi-fw pi-sun',
            command: () => {
              this.toggleDarkTheme();
              // this.router.navigate([`/`]);
            },
          },
        ],
      },
    ];

    this.loading = true;
    this.fetchSongs();
    this.statuses = [
      { label: 'INSTOCK', value: 'instock' },
      { label: 'LOWSTOCK', value: 'lowstock' },
      { label: 'OUTOFSTOCK', value: 'outofstock' },
    ];
  }

  toggleDarkTheme() {
    console.log('Dark/Light Theme');
    // document.body.classList.toggle('light-theme');
    // document.getElementById('.card-2').classList.toggle('light-theme');
    // document.querySelector('card-2').classList.toggle('light-theme');
  }

  initSearchForm() {
    this.searchForm = new FormGroup({
      songName: new FormControl(''),
      artistName: new FormControl(''),
    });
  }

  logOut() {
    this.router.navigate([`/`]);
    console.log('log out');
  }

  loveItem(index) {
    this.songs[index].isLoved === false
      ? (this.songs[index].isLoved = true)
      : (this.songs[index].isLoved = false);
    console.log(this.songs[index].isLoved);
    return this.songs[index];
  }

  fetchSongs() {
    this.subscription = this.songService
      .fetchSongs()
      .pipe(take(1))
      .subscribe((res: any) => {
        this.songs = res.data;
        setTimeout(() => {
          this.loading = false;
        }, 500);
      });
  }

  onSearchFilters() {
    console.log({
      Song: this.searchForm.controls.songName.value,
      Artist: this.searchForm.controls.artistName.value,
    });
  }

  openNew() {
    console.log('Create new');
    // this.product = {};
    // this.submitted = false;
    // this.productDialog = true;
  }

  printSelectedProduct() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to print the selected tabs?',
      header: 'Confirm',
      icon: 'pi pi-print',
      accept: () => {
        // this.products = this.products.filter(
        //   (val) => !this.selectedProducts.includes(val)
        // );
        this.selectedSongs = null;
        console.log('print');
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          life: 3000,
        });
      },
    });
  }

  downloadSelectedSong() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to download the selected tabs?',
      header: 'Confirm',
      icon: 'pi pi-download',
      accept: () => {
        this.selectedSongs = null;
        console.log('download');
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          life: 3000,
        });
      },
    });
  }

  editProduct(song: Song) {
    this.song = { ...song };
    this.productDialog = true;
  }

  deleteProduct(song: Song) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + song.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.songs = this.songs.filter((val) => val.id !== song.id);
        this.song = {};
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Deleted',
          life: 3000,
        });
      },
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    if (this.song.name.trim()) {
      if (this.song.id) {
        this.songs[this.findIndexById(this.song.id)] = this.song;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Updated',
          life: 3000,
        });
      } else {
        this.song.id = this.createId();
        this.song.image = 'product-placeholder.svg';
        this.songs.push(this.song);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Created',
          life: 3000,
        });
      }

      this.songs = [...this.songs];
      this.productDialog = false;
      this.song = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.songs.length; i++) {
      if (this.songs[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    var chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
  selectNotification(notification: Notifications) {
    this.messageService.add({
      severity: 'info',
      summary: 'Notification Selected',
      detail: notification.name,
    });
  }

  onRowSelect(event) {
    console.log(event.data);
    this.messageService.add({
      severity: 'info',
      summary: 'Notification Selected',
      detail: event.name,
    });
  }
}

function saveProduct() {
  throw new Error('Function not implemented.');
}
