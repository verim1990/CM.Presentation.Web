import { Component, Input } from '@angular/core';

@Component({
    selector: 'fc-page',
    templateUrl: './fc-page.component.html',
    styleUrls: ['./fc-page.component.scss']
})
export class FcPageComponent {
    @Input() title: string;
}
