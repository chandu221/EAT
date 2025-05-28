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
import { TaxInformationComponent } from './dashboard/main-dashboard/components/tax-information/tax-information.component';
import { LegalNoticesComponent } from './dashboard/main-dashboard/components/legal-notices/legal-notices.component';
import { SuggestionsFeedbackComponent } from './dashboard/main-dashboard/components/suggestions-feedback/suggestions-feedback.component';
import { ContactSupportComponent } from './dashboard/main-dashboard/components/contact-support/contact-support.component';
import { GlossaryComponent } from './dashboard/main-dashboard/components/glossary/glossary.component';
import { NotificationComponent } from './dashboard/main-dashboard/components/notification/notification.component';
// import { TrendComponent } from './dashboard/main-dashboard/components/trend/trend.component';
import { AnomalyCheckerComponent } from './dashboard/main-dashboard/components/anomaly-checker/anomaly-checker.component';
import { AssistantComponent } from './assistant/assistant.component';
// import { AnomalyCheckerComponent } from './anomaly-checker/anomaly-checker.component';


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
      { path: 'glossary', component: GlossaryComponent },
      { path: 'tax-information', component: TaxInformationComponent },
      { path: 'legal-notices', component: LegalNoticesComponent },
      { path: 'suggestions-feedback', component: SuggestionsFeedbackComponent },
      { path: 'contact-support', component: ContactSupportComponent },
      { path: 'notification', component: NotificationComponent },
      {
        path: 'glossary',
        loadChildren: () =>
          import('./module/glossary/glossary.module').then(
            (m) => m.GlossaryModule
          ),
      },
      // {path:'trend', component: TrendComponent},
       {path:'AnomalyChecker', component: AnomalyCheckerComponent},
       {path:'assistant',component: AssistantComponent},
      {path: '', redirectTo: 'rsu', pathMatch: 'full' },
    ],
  },
];


