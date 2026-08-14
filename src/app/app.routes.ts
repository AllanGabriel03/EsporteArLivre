import { Routes } from '@angular/router';
import { Component } from '../../node_modules/@angular/compiler/types/compiler';
import { Menu } from './component/menu/menu';
import { Home } from './component/home/home';
import { Atleta } from './component/atleta/atleta';
import { Corrida } from './component/corrida/corrida';

export const routes: Routes = [
    {
        path:"",
        component:Home,
    },
    {
        path:"home",
        component:Home,
    },
    {
        path:"cadastroatleta",
        component:Atleta,
    },
    {
        path:"cadastroCorrida",
        component:Corrida
    }
];
