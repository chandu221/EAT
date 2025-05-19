import { Routes } from '@angular/router';
import { HomeComponent } from './login/home/home.component';
import { authGuard } from './login/guard/auth.guard';
import { MainDashboardComponent } from './dashboard/main-dashboard/main-dashboard.component';
import { EsopComponent } from './dashboard/main-dashboard/components/esop/esop.component';
import { VestComponent } from './dashboard/main-dashboard/components/vest/vest.component';
import { RsuComponent } from './dashboard/main-dashboard/components/rsu/rsu.component';
import { AboutComponent } from './dashboard/main-dashboard/components/about/about.component';
import { KeyFeaturesComponent } from './dashboard/main-dashboard/components/key-features/key-features.component';
import { NewsComponent } from './dashboard/main-dashboard/components/news/news.component';
import { FaqComponent } from './dashboard/main-dashboard/components/faq/faq.component';
import { TransitionComponent } from './shared/transition/transition.component';

export const routes: Routes = [{ path: '', component: HomeComponent },
  {
    path: '',
    component: MainDashboardComponent,
    canActivate: [authGuard],
    children: [
      { path: 'rsu', component: RsuComponent },
      { path: 'esop', component: EsopComponent },
      { path: 'vest', component: VestComponent },
      { path: 'about', component: AboutComponent },
      { path: 'features', component: KeyFeaturesComponent },
      { path: 'news', component: NewsComponent },
      { path: 'faq', component: FaqComponent },
      {path:'transition',component:TransitionComponent},
    ],
  },
];


