import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
    @Output('onLanguageChange') onLanguageChange = new EventEmitter<string>();
    @Input('languages') languages: string[] = [];
    @Input('currentLanguage') currentLanguage: string = '';

    onLanguageClick(language: string) {
        this.onLanguageChange.emit(language);
    }
}
