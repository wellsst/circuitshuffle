import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MyDashboardComponent} from './my-dashboard/my-dashboard.component';
import {
  MatFormFieldModule,
  MatDatepickerModule, MatNativeDateModule,
  MatInputModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatGridListModule,
  MatCardModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatAutocompleteModule,
  MatSliderModule,
  MatChipsModule,
  MatSnackBarModule,
  MatCheckboxModule,
  MatProgressBarModule,
  MatDialogModule, MatBadgeModule, MatExpansionModule,
  MatSelectModule,
  MatTabsModule

} from '@angular/material';
import {MyNavComponent} from './my-nav/my-nav.component';
import {LayoutModule} from '@angular/cdk/layout';
import {MyTableComponent} from './my-table/my-table.component';
import {RouterModule, Routes} from '@angular/router';
import {ExerciseListComponent} from './exercise-list/exercise-list.component';
import {AddExerciseComponent} from './add-exercise/add-exercise.component';
import {StartCircuitComponent} from './start-circuit/start-circuit.component';
import {AddRepsComponent} from './add-reps/add-reps.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {ViewHistoryComponent} from './view-history/view-history.component';
import {TimerComponent} from './timer/timer.component';

import 'moment-duration-format';
import {SecsAsTimePipe} from './secs-as-time.pipe';
import {QuitPromptComponent} from './quit-prompt/quit-prompt.component';
import {AuthService} from './auth.service';
import {AuthGuard} from './guards/auth.guard';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {LogoutComponent} from './logout/logout.component';
import {UserInfoComponent} from './user-info/user-info.component';
import {ForgottenPasswordComponent} from './forgotten-password/forgotten-password.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {AddExerciseSetComponent} from './add-exercise-set/add-exercise-set.component';
import {ArraySortPipe} from './array-sort.pipe';

import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { NgProgressModule } from '@ngx-progressbar/core';
import {ErrorInterceptor} from './ErrorInterceptor';

const appRoutes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'view-history', component: ViewHistoryComponent, canActivate: [AuthGuard]},
  {path: 'exercise-list', component: ExerciseListComponent, canActivate: [AuthGuard]},
  {path: 'start-circuit', component: StartCircuitComponent, canActivate: [AuthGuard]},
  {path: 'add-exercise', component: AddExerciseComponent, canActivate: [AuthGuard]},
  {path: 'add-exercise-set', component: AddExerciseSetComponent, canActivate: [AuthGuard]},
  {path: 'add-reps', component: AddRepsComponent, canActivate: [AuthGuard]}
];

@NgModule({
  entryComponents: [QuitPromptComponent],
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    MyDashboardComponent,
    MyNavComponent,
    MyTableComponent,
    ExerciseListComponent,
    AddExerciseComponent,
    StartCircuitComponent,
    AddRepsComponent,
    WelcomeComponent,
    ViewHistoryComponent,
    TimerComponent,
    SecsAsTimePipe,
    QuitPromptComponent,
    LogoutComponent,
    UserInfoComponent,
    ForgottenPasswordComponent,
    ChangePasswordComponent,
    AddExerciseSetComponent,
    ArraySortPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule, ReactiveFormsModule,
    MatAutocompleteModule,
    FlexLayoutModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    LayoutModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule, MatNativeDateModule,
    MatSliderModule,
    MatSnackBarModule,
    MatChipsModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatDialogModule,
    MatIconModule,
    MatBadgeModule,
    MatExpansionModule,
    MatSelectModule,
    MatTabsModule,
    RouterModule.forRoot(appRoutes),
    NgProgressModule.forRoot({color: '#FF6699'}),
    NgProgressHttpModule
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    AuthGuard,
    AuthService,
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]

})
export class AppModule {
}


