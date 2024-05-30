import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RickmortyService } from '../services/rickmorty.service';
import { RouterModule } from '@angular/router';



@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [],
  exports:[
    RouterModule
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  
  providers: [RickmortyService]
})
export class SharedModule { }
