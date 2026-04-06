import { Routes } from "@angular/router";
import { AdminDashboardLayout } from "./layouts/admin-dashboard-layout/admin-dashboard-layout";
import { IsAdminGuard } from "@app/auth/guards/is-admin.guard";

const adminDashboardRoutes: Routes = [{
    path: '',
    component: AdminDashboardLayout,
    canMatch: [
        IsAdminGuard
    ],
    children: [
        {
            path: 'products',
            loadComponent: () => import('./pages/products-admin-page/products-admin-page').then(m => m.ProductsAdminPage)
        },
        {
            path: 'product/:id',
            loadComponent: () => import('./pages/product-admin-page/product-admin-page').then(m => m.ProductAdminPage)
        },
        {
            path: '**',
            redirectTo: 'products'
        }
    ]
}]

export default adminDashboardRoutes;