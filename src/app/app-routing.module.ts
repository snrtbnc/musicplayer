import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerComponent } from './components/music-player/music-player.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'app-player',
        component: PlayerComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
