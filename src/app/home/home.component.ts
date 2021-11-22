import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnChanges,
  ViewChild,
} from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
import { Product } from '../domain/product';
import { ProductService } from '../services/productservice';
import { filter, map, take, tap } from 'rxjs/operators';
import { Table } from 'primeng/table';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ConfirmationService, MessageService, ProductService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  @ViewChild('dt') table: Table | undefined;

  displaySideBar;
  items: MenuItem[];
  productDialog: boolean;
  subscription: Subscription;
  products: Product[] = [];
  product: Product;
  selectedProducts: Product[];
  submitted: boolean;
  statuses: any[];
  loading: boolean;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public productService: ProductService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        items: [
          {
            label: 'HomeScreen',
            command: () => {
              let currentUrl = this.router.url;
              this.router.routeReuseStrategy.shouldReuseRoute = () => false;
              this.router.onSameUrlNavigation = 'reload';
              this.router.navigate([currentUrl]);
            },
          },
          {
            label: 'Quit',
            command: () => {
              this.router.navigate([`/`]);
            },
          },
        ],
      },
      {
        label: 'Settings',
        icon: 'pi pi-fw pi-cog',
        items: [
          {
            label: 'Account',
            icon: 'pi pi-fw pi-user',
            command: () => {
              console.log('Account settings');
              // this.router.navigate([`/`]);
            },
          },
          {
            label: 'Privacy',
            icon: 'pi pi-fw pi-lock',
            command: () => {
              console.log('Privacy Settings');
              // this.router.navigate([`/`]);
            },
          },
        ],
      },
    ];

    this.loading = true;
    this.fetchProducts();
    this.statuses = [
      { label: 'INSTOCK', value: 'instock' },
      { label: 'LOWSTOCK', value: 'lowstock' },
      { label: 'OUTOFSTOCK', value: 'outofstock' },
    ];
  }

  showNotifications() {
    console.log('notifications');
  }

  navigateToFavorites() {
    console.log('favorites');
  }

  logOut() {
    console.log('log out');
  }

  loveItem(index) {
    this.products[index].isLoved === false
      ? (this.products[index].isLoved = true)
      : (this.products[index].isLoved = false);
    console.log(this.products[index].isLoved);
    return this.products[index];
  }

  fetchProducts() {
    this.subscription = this.productService
      .fetchProducts()
      .pipe(take(2))
      .subscribe((res: any) => {
        this.products = res.data;
      });
    setTimeout(() => {
      this.table.reset();
      this.loading = false;
    }, 500);
  }

  onSearchFilters() {
    console.log('search');
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
        this.selectedProducts = null;
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
        this.selectedProducts = null;
        console.log('download');
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          life: 3000,
        });
      },
    });
  }

  editProduct(product: Product) {
    this.product = { ...product };
    this.productDialog = true;
  }

  deleteProduct(product: Product) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter((val) => val.id !== product.id);
        this.product = {};
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

    if (this.product.name.trim()) {
      if (this.product.id) {
        this.products[this.findIndexById(this.product.id)] = this.product;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Updated',
          life: 3000,
        });
      } else {
        this.product.id = this.createId();
        this.product.image = 'product-placeholder.svg';
        this.products.push(this.product);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Created',
          life: 3000,
        });
      }

      this.products = [...this.products];
      this.productDialog = false;
      this.product = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
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
}

function saveProduct() {
  throw new Error('Function not implemented.');
}
