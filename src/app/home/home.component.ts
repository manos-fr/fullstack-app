import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Notifications, Song } from '../domain/interfaces';
import { SongService } from '../services/songService';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  selectedSongs: any;
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
  data: any;

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
    this.songService.fetchMovies().subscribe((res) => {
      this.data = res.rows;
      this.loading = false;
      console.log(res.rows);
    });
  }

  onSelectionChange() {
    console.log(this.selectedSongs);
  }

  toggleDarkTheme() {
    console.log('Dark/Light Theme');
  }

  initSearchForm() {
    this.searchForm = new FormGroup({
      movieTitle: new FormControl(null, Validators.required),
      movieId: new FormControl(null, Validators.required),
    });
  }

  logOut() {
    this.router.navigate([`/`]);
    console.log('log out');
  }

  loveItem(index) {
    this.data[index].isLoved === false
      ? (this.data[index].isLoved = true)
      : (this.data[index].isLoved = false);
    console.log(this.data[index].isLoved);
    return this.data[index];
  }

  onSearchFilters() {
    console.log({
      Title: this.searchForm.controls.movieTitle.value,
      Id: this.searchForm.controls.movieId.value,
    });

    const req = {
      title: this.searchForm.controls.movieTitle.value,
      id: this.searchForm.controls.movieId.value,
    };

    this.loading = true;

    if (req.id) {
      this.songService.fetchMovieId(req).subscribe((res) => {
        this.data = res;
        this.loading = false;
      });
      return;
    }
    this.songService.fetchMovies().subscribe((res) => {
      this.data = res.rows;
      this.loading = false;
    });
  }

  openNew() {
    console.log('Create new');
  }

  printSelectedProduct() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to print the selected tabs?',
      header: 'Confirm',
      icon: 'pi pi-print',
      accept: () => {
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
