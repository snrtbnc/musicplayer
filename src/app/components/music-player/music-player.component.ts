import { Component, OnInit, NgZone } from '@angular/core';
import { MusicService, Song } from '../../music.service';

@Component({
  selector: 'app-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss']
})
export class PlayerComponent implements OnInit {
  ShowPlayList: Song;
  QueueueList: Array<Song>;
  durationshow: string = "00:00";
  currentSongName: string
  progressbarValue = 0;

  constructor(private zone: NgZone, private musicService: MusicService) {

    this.QueueueList = this.musicService.PlayListQueue;
    

  }


  ngOnInit() {

    this.getplayerlist();
    this.musicService.currentSong.subscribe(value => {
      console.log("current song" + value);

      this.zone.run(()=>{this.currentSongName = value;}); 
    });
    this.musicService.durationshow.subscribe(songduration => {
      console.log("song duration" + songduration);
      this.zone.run(()=>{this.durationshow = songduration;}); 

      this.musicService.progressbarValue.subscribe(value=>{
        this.zone.run(()=>{this.progressbarValue=value}); 
      })
      
    });
  }

  getplayerlist() {
    console.log("get play list");

    this.musicService.getPlayList((data) => {
      console.log(data);
      this.zone.run(() => { this.ShowPlayList = data });
    });
  }

  Play() {
   
    this.musicService.Play();

  }

  Pause() {
    this.musicService.Pause();

  }
  addPlayList(song)
  {
    this.QueueueList.push(song)
  }

  Stop()
  {
    this.musicService.Stop();
  }

}
