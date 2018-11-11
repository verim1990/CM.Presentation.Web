import { Directive, Input, EventEmitter, ElementRef, Renderer, Inject } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Directive({
    selector: '[fc-row-focus]'
})
export class FcRowFocusDirective implements OnInit {

    @Input('fc-row-focus') focusEvent: EventEmitter<boolean>;

    constructor(
        @Inject(ElementRef) private element: ElementRef,
        private readonly renderer: Renderer) {
    }

    ngOnInit() {
        if (this.focusEvent) {
            this.focusEvent.subscribe((event: any) => {
                setTimeout(() => {
                        this.renderer.invokeElementMethod(this.element.nativeElement, 'focus', []);
                    },
                    50);
            });
        }
    }
}
