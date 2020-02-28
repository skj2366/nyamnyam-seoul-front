import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './user/login/login.component';
import { MainComponent } from './main/main.component';
import { SignupComponent } from './user/signup/signup.component';
import { MenuComponent } from './menu/menu.component';
import { MypageComponent } from './user/mypage/mypage.component';
import { FooterComponent } from './footer/footer.component';
import { MapComponent } from './search/map/map.component';
import { ManageComponent } from './manage/manage/manage.component';
import { ResultComponent } from './search/result/result.component';
import { AuthInterceptorService } from './common/auth-interceptor.service';
import { TotalComponent } from './search/total/total.component';
import { BoardListComponent } from './board/board-list/board-list.component';
import { BoardWriteComponent } from './board/board-write/board-write.component';
import { BoardResultComponent } from './board/board-result/board-result.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { TotalResultComponent } from './search/total/total-result/total-result.component';
import { CKEditorModule } from 'ckeditor4-angular';
import { ResultDkComponent } from './search/result-dk/result-dk.component';
import { ReceiveComponent } from './test/receive/receive.component';
import { ServeComponent } from './test/serve/serve.component';
// import { CKEditorModule } from 'ng2-ckeditor';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    SignupComponent,
    MenuComponent,
    MypageComponent,
    FooterComponent,
    MapComponent,
    ManageComponent,
    ResultComponent,
    TotalComponent,
    BoardListComponent,
    BoardWriteComponent,
    BoardResultComponent,
    UserDetailComponent,
    TotalResultComponent,
    ResultDkComponent,
    ReceiveComponent,
    ServeComponent
  ],
  imports: [
    FormsModule,
    CKEditorModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([
      ManageComponent
    ]),
    AutocompleteLibModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
