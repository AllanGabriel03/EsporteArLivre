import { Routes } from '@angular/router';
import { Component } from '../../node_modules/@angular/compiler/types/compiler';
import { Menu } from './component/menu/menu';
import { Home } from './component/home/home';
import { Atleta } from './component/atleta/atleta';

export const routes: Routes = [
    {
        path:"",
        component:Menu,
    },
    {
        path:"home",
        component:Home
    },
    {
        path:"cadastroatleta",
        component:Atleta
    }
];
