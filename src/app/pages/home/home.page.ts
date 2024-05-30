import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { RickmortyService } from 'src/app/services/rickmorty.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, SharedModule]
})
export class HomePage implements OnInit {

  characters: any[]=[];
  params = {} as any

  constructor(
    private rickMorty:RickmortyService
  ) { }

  ngOnInit() {
    this.params.page = 0;
    this.getCharacters()
  }

  getCharacters(event?: any){
    this.params.page += 1
    this.rickMorty.getCharacters(this.params).subscribe({
      next:(res: any)=>{
        this.characters.push(...res.results)
        console.log(this.characters)

        if(event) event.target.complete();;

      },
      error: (error:any)=>{
        if(event) event.target.complete();

      }
    })

  }

  searchCharacters(event?: any){
    this.params.page += 1
    this.rickMorty.getCharacters(this.params).subscribe({
      next:(res: any)=>{
        this.characters = res.results

      },
      error: (error:any)=>{

      }
    })

  }


}
