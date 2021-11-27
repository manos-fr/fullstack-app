import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Product } from 'src/app/domain/product';
import { ProductService } from 'src/app/services/productservice';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
  providers: [ConfirmationService, MessageService, ProductService],
})
export class FavoritesComponent implements OnInit {
  displaySideBar;
  productDialog: boolean;
  items: MenuItem[];
  subscription: Subscription;
  products: Product[] = [];
  product: Product;
  selectedProducts: Product[];
  submitted: boolean;
  statuses: any[];
  loading: boolean;
  searchForm: FormGroup;

  constructor(
    private router: Router,
    public productService: ProductService,
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
    this.fetchProducts();
    this.statuses = [
      { label: 'INSTOCK', value: 'instock' },
      { label: 'LOWSTOCK', value: 'lowstock' },
      { label: 'OUTOFSTOCK', value: 'outofstock' },
    ];
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
      .pipe(take(1))
      .subscribe((res: any) => {
        this.products = res.data;
        setTimeout(() => {
          this.loading = false;
        }, 500);
      });
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

  // saveProduct() {
  //   this.submitted = true;

  //   if (this.product.name.trim()) {
  //     if (this.product.id) {
  //       this.products[this.findIndexById(this.product.id)] = this.product;
  //       this.messageService.add({
  //         severity: 'success',
  //         summary: 'Successful',
  //         detail: 'Product Updated',
  //         life: 3000,
  //       });
  //     } else {
  //       this.product.id = this.createId();
  //       this.product.image = 'product-placeholder.svg';
  //       this.products.push(this.product);
  //       this.messageService.add({
  //         severity: 'success',
  //         summary: 'Successful',
  //         detail: 'Product Created',
  //         life: 3000,
  //       });
  //     }

  //     this.products = [...this.products];
  //     this.productDialog = false;
  //     this.product = {};
  //   }
  // }

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
}
