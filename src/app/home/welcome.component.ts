import { Component } from '@angular/core';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html'
})

export class WelcomeComponent
{
    public title: string = 'Welcome to the home page';
}