import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Notifications } from '../domain/interfaces';
import { MovieService } from '../services/movieService';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ConfirmationService, MessageService, MovieService],
})
export class HomeComponent implements OnInit {
  displaySideBar;
  items: MenuItem[];
  productDialog: boolean;
  subscription: Subscription;
  selectedMovies: any;
  selectedNotifications: Notifications[];
  submitted: boolean;
  statuses: any[];
  loading: boolean;
  searchForm: FormGroup;
  updateForm: FormGroup;
  selectedNotification: Notifications;
  movieUrl = '';

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
    public movieService: MovieService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.initSearchForm();
    this.initUpdateForm();
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
    this.movieService.fetchMovies().subscribe((res) => {
      this.data = res.rows;
      this.loading = false;
      console.log(res.rows);
    });
  }

  onSelectionChange() {
    this.updateForm.controls.tconst.patchValue(
      this.selectedMovies[0] === null ? null : this.selectedMovies[0]?.tconst
    );
  }

  toggleDarkTheme() {
    console.log('Dark/Light Theme');
  }

  initSearchForm() {
    this.searchForm = new FormGroup({
      movieId: new FormControl(null, Validators.required),
    });
  }

  initUpdateForm() {
    this.updateForm = new FormGroup({
      tconst: new FormControl(
        { value: null, disabled: false },
        Validators.required
      ),
      originalTitle: new FormControl(
        { value: null, disabled: false },
        Validators.required
      ),
      startYear: new FormControl(
        { value: null, disabled: false },
        Validators.required
      ),
      genres: new FormControl(
        { value: null, disabled: false },
        Validators.required
      ),
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

  onMovieUrl(e) {
    this.movieUrl = e.tconst;
    return this.movieUrl;
  }

  onSearchFilters() {
    const req = {
      id: this.searchForm.controls.movieId.value,
    };

    this.loading = true;

    if (req.id) {
      this.movieService.fetchMovieId(req).subscribe((res) => {
        this.data = res.rows;
        this.loading = false;
      });
      return;
    }
    this.movieService.fetchMovies().subscribe((res) => {
      this.data = res.rows;
      this.loading = false;
    });
  }

  clearFilters() {
    this.searchForm.reset();
    this.updateForm.reset();
    this.loading = true;
    this.movieService.fetchMovies().subscribe((res) => {
      this.data = res.rows;
      this.loading = false;
    });
  }

  updateSelectedMovie(movie) {
    const body = {
      originalTitle: this.updateForm.controls.originalTitle.value,
      startYear: this.updateForm.controls.startYear.value,
      genres: this.updateForm.controls.genres.value,
    };
    this.confirmationService.confirm({
      message: 'Are you sure you want to update the selected movie?',
      header: 'Confirm',
      icon: 'pi pi-update',
      accept: () => {
        this.selectedMovies = [];
        this.movieService
          .updateMovieById(movie[0].tconst, body)
          .subscribe((res) => {
            if (res) {
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                life: 3000,
              });
              this.loading = true;
              this.movieService.fetchMovies().subscribe((res) => {
                this.data = res.rows;
                this.loading = false;
                console.log(res.rows);
              });
            }
          });
      },
    });
  }

  deleteSelectedMovie(movie) {
    this.confirmationService.confirm({
      message:
        'Are you sure you want to delete ' + movie[0].originaltitle + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.selectedMovies = [];
        this.movieService.deleteMovieById(movie[0].tconst).subscribe((res) => {
          if (res) {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Movie Deleted',
              life: 3000,
            });
            this.loading = true;
            this.movieService.fetchMovies().subscribe((res) => {
              this.data = res.rows;
              this.loading = false;
              console.log(res.rows);
            });
          }
        });
      },
    });
  }
  createMovie() {
    const body = {
      tconst: this.updateForm.controls.tconst.value,
      originalTitle: this.updateForm.controls.originalTitle.value,
      startYear: this.updateForm.controls.startYear.value,
      genres: this.updateForm.controls.genres.value,
    };
    this.confirmationService.confirm({
      message: 'Are you sure you want to create the movie?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (!body.tconst || !body.originalTitle) {
          return;
        }
        this.selectedMovies = [];
        this.movieService.createMovie(body).subscribe((res) => {
          if (res) {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Movie Added',
              life: 3000,
            });
            this.loading = true;
            this.movieService.fetchMovies().subscribe((res) => {
              this.data = res.rows;
              this.loading = false;
              console.log(res.rows);
            });
          }
        });
      },
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
