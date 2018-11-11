import { Component, Input } from '@angular/core';

@Component({
    selector: 'fc-loader',
    templateUrl: './fc-loader.component.html',
    styleUrls: ['./fc-loader.component.scss']
})
export class FcLoaderComponent {
    @Input() overlay: boolean | null = false;
    @Input() text: string | undefined = undefined;
}
