import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './user/login/login.component';
import { MainComponent } from './main/main.component';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './user/signup/signup.component';
import { MenuComponent } from './menu/menu.component';
import { MypageComponent } from './user/mypage/mypage.component';
import { FooterComponent } from './footer/footer.component';
import { MapComponent } from './search/map/map.component';
import { ManageComponent } from './manage/manage/manage.component';
import { ResultComponent } from './search/result/result.component';
import { BoardComponent } from './user/board/board.component';
import { TotalComponent } from './search/total/total.component';

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
    BoardComponent,
    TotalComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
