import {RouterModule, Routes} from '@angular/router';

import { AdminComponent } from './components/admin/admin.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { UserComponent } from './components/user/user.component';

const APP_ROUTES: Routes=[
    {path:'', component:HomepageComponent},
    {path:'home', component:HomepageComponent},
    {path:'admin', component:AdminComponent},
    {path:'user', component:UserComponent},
    {path:'**', pathMatch:'full', redirectTo:''}
];
export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);