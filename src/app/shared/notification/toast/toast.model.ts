import { TemplateRef } from "@angular/core";

export class Toast {
    className!: string;
    autoHide!: boolean;
    delay!: number;
    textOrTpl!: string | TemplateRef<any>;
}