import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { MainComponent } from './main/main.component';
import { SignupComponent } from './user/signup/signup.component';
import { MapComponent } from './search/map/map.component';
import { ManageComponent } from './manage/manage/manage.component';
import { BoardComponent } from './user/board/board.component';
import { ResultComponent } from './search/result/result.component';
import { MypageComponent } from './user/mypage/mypage.component';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'main',
  //   pathMatch: 'full'
  // },
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },  
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'map',
    component : MapComponent
  },
  {
    path: 'result',
    component : ResultComponent
  },
  {
    path: 'manage',
    component : ManageComponent
  },
  {
    path: 'board',
    component : BoardComponent
  },
  {
    path: 'mypage',
    component : MypageComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
