import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    title = 'Personal Travel Plan';
    languages: string[] = ['en', 'fr'];
    currentLanguage: string = 'en';

    constructor(private primengConfig: PrimeNGConfig) {}

    ngOnInit() {
        this.primengConfig.ripple = true;
    }

    onLanguageChange(language: string) {
        this.currentLanguage = language;
    }
}
