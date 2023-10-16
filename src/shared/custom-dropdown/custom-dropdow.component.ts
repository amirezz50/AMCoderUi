import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Subject } from "rxjs";


@Component({
  selector: 'custom-dropdown',
  templateUrl: './custom-dropdown.component.html',
  styleUrls: ['./custom-dropdown.component.css']
})
export class CustomDropdown implements OnInit {
  items: any = []
  public ngUnsubscribe: Subject<void> = new Subject<void>();
  toogle: boolean = false;
  @Input() ArrayNames: any = [];
  @Output() onSelect: any = new EventEmitter();
  constructor(
    // public selectDropdownService: SelectDropdownService,
  ) { }
  ngOnInit() {
    // this.getSelectingDropdown()
    this.items = this.ArrayNames;
  }
  isButtonsShow?: boolean;
  // async getSelectingDropdown() {
  //   if (localStorage.getItem("CashedAppCodes") !== null) {
  //     this.items = JSON.parse(localStorage.CashedAppCodes).filter(obj => this.appCodes.includes(obj.serial));
  //   }
  // }
  openMenu(event:any) {
    event.preventDefault();
    this.toogle = !this.toogle
  }
  takeSerial(row: any) {
    this.onSelect.emit(row);
    this.toogle = !this.toogle
  }
}
