import { Component, inject } from '@angular/core';
import { CategoryListComponent } from '../../components/category/category-list/category-list.component';
import { CategoryFormComponent } from '../../components/category/category-form/category-form.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-categories',
    standalone: true,
    imports: [
        CategoryListComponent,
        CategoryFormComponent,
        LoaderComponent,
        ModalComponent
    ],
    templateUrl: './categories.component.html',
    styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
    protected authService = inject(AuthService);
}
