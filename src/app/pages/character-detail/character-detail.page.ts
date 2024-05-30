import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { RickmortyService } from 'src/app/services/rickmorty.service';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.page.html',
  styleUrls: ['./character-detail.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    SharedModule,
  ],
})
export class CharacterDetailPage implements OnInit {
  characterId: string = '';
  character = null as any;
  episodes: any[] = [];

  constructor(
    private actRoute: ActivatedRoute,
    private rickMortyService: RickmortyService
  ) {
    this.characterId = this.actRoute.snapshot.paramMap.get('id') as string;
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.getCharacter();
  }

  getCharacter(event?: any) {
    this.rickMortyService.getCharactersById(this.characterId).subscribe({
      next: (res: any) => {
        this.character = res;
        this.getEpisodes()
      },
      error: (error: any) => {},
    });
  }

  getEpisodes() {
    for(let url of this.character.episode){
      this.rickMortyService.getByUrl(url).subscribe({
        next: (res: any) => {
          this.episodes.push(res)
        },
        error: (error: any) => {},
      });

    }

  }
}
