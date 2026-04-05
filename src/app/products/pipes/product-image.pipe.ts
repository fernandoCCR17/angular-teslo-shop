import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;

@Pipe({
    name: 'productImage'
})
 export class ProductImagePipe implements PipeTransform {
    transform(value: string | string[]): string {
        const urlFile = `${baseUrl}/files/product`;

        if (!value || (!Array.isArray(value) && !value.trim()) || !value.length) return `./assets/images/placeholder/no-image.jpg`;
        
        return Array.isArray(value) ? `${urlFile}/${value[0]}` : `${urlFile}/${value}`;
    }
}