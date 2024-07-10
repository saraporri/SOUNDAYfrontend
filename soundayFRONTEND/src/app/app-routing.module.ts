import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestGuard } from './auth/guest.guard';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { ArtistComponent } from './pages/artist/artistProfile/artist.component';
import { UserComponent } from './pages/user/user.component';
import { EventsComponent } from './pages/events/events.component';
import { ShowArtistsComponent } from './pages/artist/show-artists/show-artists.component';

const routes: Routes = [  {path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
{ path: 'register', component: RegisterComponent, canActivate: [GuestGuard] },
{path:"artist",component:ArtistComponent},
{path:"user",component:UserComponent},
{path:"events",component:EventsComponent},
{path:"show-artists",component:ShowArtistsComponent},
  { path: 'artist', loadChildren: () => import('./pages/artist/artist.module').then(m => m.ArtistModule) },
  { path: 'events', loadChildren: () => import('./pages/events/events.module').then(m => m.EventsModule) },
  { path: 'user', loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
