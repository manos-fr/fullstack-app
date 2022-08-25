import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Notifications, Song } from 'src/app/domain/interfaces';
import { MovieService } from 'src/app/services/movieService';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  providers: [ConfirmationService, MessageService, MovieService],
})
export class FavoritesComponent implements OnInit {
  displaySideBar;
  productDialog: boolean;
  items: MenuItem[];
  subscription: Subscription;
  songs: Song[] = [];
  song: Song;
  selectedMovies: Song[];
  submitted: boolean;
  statuses: any[];
  loading: boolean;
  searchForm: FormGroup;

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
    public songService: MovieService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.items = [
      {
        label: '',
        icon: 'pi pi-fw pi-home',
        command: () => {
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate(['/home']);
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
              console.log('Dark/Light mode');
              // this.router.navigate([`/`]);
            },
          },
        ],
      },
    ];

    this.loading = true;
    // this.fetchSongs();
    this.statuses = [
      { label: 'INSTOCK', value: 'instock' },
      { label: 'LOWSTOCK', value: 'lowstock' },
      { label: 'OUTOFSTOCK', value: 'outofstock' },
    ];
  }

  loveItem(index) {
    this.songs[index].isLoved === false
      ? (this.songs[index].isLoved = true)
      : (this.songs[index].isLoved = false);
    console.log(this.songs[index].isLoved);
    return this.songs[index];
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
        this.selectedMovies = null;
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
        this.selectedMovies = null;
        console.log('download');
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          life: 3000,
        });
      },
    });
  }

  editProduct(product: Song) {
    this.song = { ...product };
    this.productDialog = true;
  }

  deleteProduct(product: Song) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.songs = this.songs.filter((val) => val.id !== product.id);
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
}
