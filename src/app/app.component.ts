import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {

    displaySideBar;

    items: MenuItem[];
    constructor(private router: Router) { }

    ngOnInit() {
        this.items = [
            {
                label: 'File',
                items: [{
                        label: 'New', 
                        icon: 'pi pi-fw pi-plus',
                        items: [
                            {label: 'Project',
                            },
                            {label: 'Other'},
                        ]
                    },
                    {label: 'HomeScreen',
                    routerLink: '/home'},  
                    {label: 'Quit', 
                    command: () => {
                        this.router.navigate([`/`]);}}
                ]
            },
            {
                label: 'Edit',
                icon: 'pi pi-fw pi-pencil',
                items: [
                    {label: 'Delete', icon: 'pi pi-fw pi-trash'},
                    {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
                ]
            }
        ];
    }
}

