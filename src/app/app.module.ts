import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MyTodoComponent } from './my-todo/my-todo.component';
import { RouterModule } from '../../node_modules/@angular/router';
import { appRoutes } from './routes';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FileSelectDirective } from 'ng2-file-upload';

@NgModule({
   declarations: [
      AppComponent,
      MyTodoComponent,
      FileSelectDirective
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      RouterModule.forRoot(appRoutes),
      TabsModule.forRoot()
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
