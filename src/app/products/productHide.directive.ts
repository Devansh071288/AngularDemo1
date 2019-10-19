import { Directive, OnInit, Input, ElementRef, Renderer, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
    selector: '[myHidden]'
})
export class ProductHideDirective implements OnInit, OnChanges
{
    @Input() myHidden: boolean;

    constructor(private el: ElementRef, private renderer : Renderer)
    {

    }

    ngOnInit()
    {
        if(!this.myHidden)
        {
            this.renderer.setElementStyle(this.el.nativeElement, 'display', 'none');
        }
        else
        {
            this.renderer.setElementStyle(this.el.nativeElement, 'display', 'block');
        }
    }

    ngOnChanges(changes: SimpleChanges) : void
    {
        console.log(changes['myHidden'].currentValue);
        if(!this.myHidden)
        {
            this.renderer.setElementStyle(this.el.nativeElement, 'display', 'none');
        }
        else
        {
            this.renderer.setElementStyle(this.el.nativeElement, 'display', 'block');
        }
    }

    

}