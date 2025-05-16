import { Routes } from '@angular/router';
import {LogInComponent} from "./auth/pages/log-in/log-in.component";
import { VehiclesComponent } from './vehicles/pages/vehicles/vehicles.component';
import { authenticationGuard } from './auth/services/authentication.guard';
import { VehiclePostComponent } from './vehicles/pages/vehicle-post/vehicle-post.component';
import {VehicleDetailsComponent} from './vehicles/pages/vehicle-details/vehicle-details.component';
import { RegisterAcquirerComponent } from './users/ProfileAcquirers/pages/register-acquirer/register-acquirer.component';
import {ProfilePageComponent} from './users/ProfileAcquirers/pages/profile-page/profile-page.component';
import {EditProfileAcquirerComponent} from './users/ProfileAcquirers/pages/edit-profile-acquirer/edit-profile-acquirer.component';
import {ProfileAcquirerComponent} from './users/ProfileAcquirers/pages/profile-acquirer/profile-acquirer.component';
import {VehicleDetailsAcquirerComponent} from './vehicles/pages/vehicle-details-acquirer/vehicle-details-acquirer.component';
import {FilterAcquirerComponent} from './users/ProfileAcquirers/pages/filter-acquirer/filter-acquirer.component';
import {HomeAcquirerComponent} from './users/ProfileAcquirers/pages/home-acquirer/home-acquirer.component';
import {PlanesPageComponent} from './plans/pages/planes-page/planes-page.component';
import {PaymentPageComponent} from './plans/pages/payment-page/payment-page.component';
import {DashboardPageComponent} from './public/pages/dashboard-page/dashboard-page.component';
import {ProfileUniversityComponent} from './public/pages/profile-university/profile-university.component';
import {
  RegisterUniversityStudentComponent
} from './public/pages/register-university-student/register-university-student.component';
import {ElectionComponent} from './public/pages/election/election.component';
import {InteractiveMapComponent} from './public/pages/interactive-map/interactive-map.component';


export const routes: Routes = [
  {path:'myVehicles', component: VehiclesComponent, canActivate: [authenticationGuard]},
  {path: 'postVehicle', component: VehiclePostComponent, canActivate: [authenticationGuard]},
  {path: 'vehicleDetails', component: VehicleDetailsComponent, canActivate: [authenticationGuard]},
  { path: 'plans', component: PlanesPageComponent, canActivate: [authenticationGuard]},
  {path: 'login', component: LogInComponent},
  {path: 'election', component: ElectionComponent},
  {path: 'registerUniversity', component: RegisterUniversityStudentComponent},
  {path: 'registerAcquirer', component: RegisterAcquirerComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'sellerProfile', component: ProfileUniversityComponent, canActivate: [authenticationGuard]},
  {path: 'sellereditProfile', component: ProfilePageComponent, canActivate: [authenticationGuard]},
  {path: 'dashboard', component: DashboardPageComponent,
    children:[
      {
        path: 'plans', // Rutas hijas
        component: ProfilePageComponent

      },
      {
        path: '',
        redirectTo: 'myVehicles',
        pathMatch: 'full'
      }
    ]
    , canActivate: [authenticationGuard]
  },
  { path: 'payment', component: PaymentPageComponent , canActivate: [authenticationGuard]}, // Ruta para "payment"
  {path: 'home', component: HomeAcquirerComponent, canActivate: [authenticationGuard]},//, canActivate: [authenticationGuard]
  {path: 'interactiveMap', component: InteractiveMapComponent, canActivate: [authenticationGuard]},
  {path: 'filter', component: FilterAcquirerComponent, canActivate: [authenticationGuard]},
  { path: 'vehicleDetailsAcquirer/:id', component: VehicleDetailsAcquirerComponent, canActivate: [authenticationGuard] },
  {path: 'profileAdquiriente', component: ProfileAcquirerComponent, canActivate: [authenticationGuard]},
  {path: 'editProfileAcquirer', component: EditProfileAcquirerComponent, canActivate: [authenticationGuard]},
];
