import { Injectable, NgZone, OnInit } from '@angular/core';
import * as fs from 'fs';
import * as path from 'path';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})

export class MusicService implements OnInit {

    duration: number;
    progressbarValue: Subject<number> = new Subject<number>();
    durationshow: Subject<string> = new Subject<string>();
    audio: HTMLAudioElement;
    PlayListQueue: Array<Song>;
    currentSong: Subject<string> = new Subject<string>();


    SongList: Array<Song> = [
        { Url: "C:\\Playerlist\\sample.mp3", Id: 1, Name: "sample" },
        { Url: "C:\\Playerlist\\music2.mp3", Id: 2, Name: "music2" },
        { Url: "C:\\Playerlist\\amerika yerli.wav", Id: 3, Name: "amerika yerli" }
    ];
    constructor() {
        this.PlayListQueue = new Array<Song>();
        this.audio = new Audio();
        this.audio.onended = () => { this.onSongFinishHandler(this.PlayListQueue) };
        this.audio.ondurationchange = this.onDurationChange;
        this.audio.ontimeupdate = () => { this.songTimeUpdate(this.audio) }

    }

    ngOnInit(): void {

    }
    Play() {

        if (this.PlayListQueue.length == 0) {
            console.log("liste bos");
            return false;
        }
        if (this.PlayerBusy()) {
            return false;
        }

        if (!this.audio.paused) {
            this.audio.load();
            this.audio.src = this.getUrlPathSong(this.PlayListQueue[0].Id);
        }
        this.audio.play().then(() => {
            var songName = this.SongList.find(x => (x.Id == this.PlayListQueue[0].Id)).Name

            this.currentSong.next(songName);

        });
    }

    PlayerBusy(): boolean {
        return (this.audio.duration > 0 && !this.audio.paused)
    }
    Pause() {
        console.log("pause");

        this.audio.pause();

    }
    Stop(): any {
        this.audio.src = "";
    }

    getPlayList(callback) {
        let songListPath = path.resolve(path.join('../../../Playerlist'));


        fs.readdir(path.join(songListPath), (err, data) => {
            console.log(data);

            callback(this.SongList);
        });
        // return this.SongList;

    }

    getUrlPathSong(Id): string {
        console.log("Get Url For" + Id);

        console.log(this.SongList.find(x => x.Id === Id).Url);

        return this.SongList.find(x => x.Id === Id).Url;

    }
    songTimeUpdate(audio: HTMLAudioElement) {


        this.duration = parseInt(audio.currentTime.toFixed(0).padStart(4, '0'))
        console.log(this.duration);

        this.durationshow.next(this.durationCalculator(this.duration));
        this.progressbarValue.next(this.duration * 100 / audio.duration); //audio duration ve duraiton karisabilir degistir
    }
    onDurationChange() {
        console.log("dration change");


    }
    onSongFinishHandler(PlayListQueue) {
        console.log("bittttttiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");

        if (PlayListQueue.length > 0)
            PlayListQueue.splice(0, 1);

        this.Play();
    }


    durationCalculator(duration) {
        let s;
        let m;
        s = duration % 60;
        m = Math.floor(duration / 60) % 60;
        s = s < 10 ? "0" + s : s;
        m = m < 10 ? "0" + m : m;
        return m + ":" + s;
    }



}
export interface Song {
    Id: number;
    Url: string;
    Name: string;
}


