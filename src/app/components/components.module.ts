import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NoticeService } from "../services/Notice/notice.service";
import { ComponentRoutingModule } from "./Components.Router.module";
import { NoticeComponent } from './notice/notice.component';

@NgModule({
    declarations:[ NoticeComponent],
    imports:[CommonModule,
        ComponentRoutingModule, 
    ReactiveFormsModule, FormsModule],
    exports:[],
    providers:[NoticeService]
})

export class ComponentsModule { }