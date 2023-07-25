import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
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

    constructor(
        private primengConfig: PrimeNGConfig,
        private translate: TranslateService
    ) {
        translate.addLangs(this.languages);

        // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('en');

        // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use('en');
    }

    ngOnInit() {
        this.primengConfig.ripple = true;
    }

    onLanguageChange(language: string) {
        this.currentLanguage = language;
        this.translate.use(language);
    }
}
