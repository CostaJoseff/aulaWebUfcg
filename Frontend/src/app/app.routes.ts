import { Routes } from '@angular/router';
import { DesenhoDeLinhasComponent } from './Telas/desenho-de-linhas/desenho-de-linhas.component';
import { UploadConcluidoComponent } from './Telas/upload-concluido/upload-concluido.component';

export const routes: Routes = [
    { path: '', component: DesenhoDeLinhasComponent},
    { path: 'uploadConcluido' , component: UploadConcluidoComponent}
];
