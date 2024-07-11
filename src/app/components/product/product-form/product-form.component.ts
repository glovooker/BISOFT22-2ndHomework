import { Component, Input, effect, inject } from '@angular/core';
import { IFeedBackMessage, IProduct, IFeedbackStatus, ICategory } from '../../../interfaces';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { CategoryService } from '../../../services/category.service';

@Component({
    selector: 'app-product-form',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
    ],
    templateUrl: './product-form.component.html',
    styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {
    @Input() title!: string;
    @Input() product: IProduct = {
        name: '',
        description: '',
        price: 0,
        stock: 0,
        category: {
            id: 0,
        }
    };
    @Input() action: string = 'add';
    @Input() categories: ICategory[] = [];
    category = 0;
    service = inject(ProductService);
    categoryService = inject(CategoryService);
    feedbackMessage: IFeedBackMessage = { type: IFeedbackStatus.default, message: '' };

    constructor() {
        this.categoryService.getAllSignal();
        effect(() => {
            this.categories = this.categoryService.categories$();
        });
    }

    handleAction (form: NgForm) {
        if (form.invalid) {
            Object.keys(form.controls).forEach(controlName => {
                form.controls[controlName].markAsTouched();
            });
            return;
        } else {
            this.service[this.action == 'add' ? 'saveProductSignal' : 'updateProductSignal'](this.product).subscribe({
                next: () => {
                    this.feedbackMessage.type = IFeedbackStatus.success;
                    this.feedbackMessage.message = `Product successfully ${ this.action == 'add' ? 'added' : 'updated' }`;
                },
                error: (error: any) => {
                    this.feedbackMessage.type = IFeedbackStatus.error;
                    this.feedbackMessage.message = error.message;
                }
            });
        }
    }
}
