import { Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'custom-select-option',
  templateUrl: './custom-select-option.component.html',
  styleUrls: ['./custom-select-option.component.css']
})
export class CustomSelectOptionComponent implements OnInit, OnChanges {
  pageIndex: number = 0;
  pageSize: number = 10;
  flagOpenClose: boolean = false;
  @Output() code: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }
  myControl = new FormControl();

  @Input() array: any[] = [];
  arrayFilter: any[] = [];
  selectedItem: any;
  ngOnChanges(changes: SimpleChanges): void {
    this.array = this.array[0]
    this.arrayFilter = this.array
  }
  search(ev: any) {
    this.flagOpenClose = true;
    if (ev.target.value == '' || !ev.target.value) {
      this.arrayFilter = this.array;
    } else {
      this.arrayFilter = this.array.filter(item => item.name.toLowerCase().includes(ev.target.value.toLowerCase()));
    }
  }
  @ViewChild('dropdown1') dropdown1!: ElementRef;
  @ViewChild('dropdown2') dropdown2!: ElementRef;
  @ViewChild('dropdown3') dropdown3!: ElementRef;

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (
      (this.dropdown1 && !this.dropdown1.nativeElement.contains(event.target)) &&
      (this.dropdown2 && !this.dropdown2.nativeElement.contains(event.target)) &&
      (this.dropdown3 && !this.dropdown3.nativeElement.contains(event.target))
    ) {
      this.flagOpenClose = false;
      console.log('Flag is now false');
    }
  }
  select(row: any) {
    this.selectedItem = row ? row.name : '';
    this.flagOpenClose = false;
    this.code.emit(row ? row.code : null);
  }
}
