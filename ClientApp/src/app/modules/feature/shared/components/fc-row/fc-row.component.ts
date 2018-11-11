import { Component, Input } from '@angular/core';

@Component({
    selector: 'fc-row',
    templateUrl: './fc-row.component.html',
    styleUrls: ['./fc-row.component.scss']
})
export class FcRowComponent {
    @Input() label: string;
    @Input() size: string;
}
