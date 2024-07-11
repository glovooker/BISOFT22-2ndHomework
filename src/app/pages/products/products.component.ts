import { Component, inject } from '@angular/core';
import { ProductListComponent } from '../../components/product/product-list/product-list.component';
import { ProductFormComponent } from '../../components/product/product-form/product-form.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-products',
    standalone: true,
    imports: [
        ProductListComponent,
        ProductFormComponent,
        LoaderComponent,
        ModalComponent
    ],
    templateUrl: './products.component.html',
    styleUrl: './products.component.scss'
})
export class ProductsComponent {
    protected authService = inject(AuthService);
}
