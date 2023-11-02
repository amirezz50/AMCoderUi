import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'custom-select-option',
  templateUrl: './custom-select-option.component.html',
  styleUrls: ['./custom-select-option.component.css']
})
export class CustomSelectOptionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }
  @Input() array: any[] = [];
  // ngOnChanges(changes: SimpleChanges): void {
  //   this.array;
  //   console.log(changes);
  // }

}
