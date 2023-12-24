import { Component, EventEmitter } from "@angular/core";


@Component({
    selector: 'custom-pagination',
    inputs: ['itemCount', 'pageSize', 'pageIndex'],
    outputs: ['pageIndexChange'],
    template: `<div class="btn-group" role="group">
    <button class="btn btn-secondary" [disabled]="!canMoveToPreviousPage" (click)="moveToFirstPage()"><i
        class="fa fa-angle-double-left"></i></button>
    <button class="btn btn-secondary" [disabled]="!canMoveToPreviousPage" (click)="moveToPreviousPage()"><i
        class="fa fa-angle-left"></i></button>
    <button class="btn btn-secondary" disabled style="width:100px">{{pageIndex + 1}} / {{_pageCount}}</button>
    <button class="btn btn-secondary" [disabled]="!canMoveToNextPage" (click)="moveToNextPage()"><i
        class="fa fa-angle-right"></i></button>
    <button class="btn btn-secondary" [disabled]="!canMoveToNextPage" (click)="moveToLastPage()"><i
        class="fa fa-angle-double-right"></i></button>
  </div> `,
    styles: [`
    .btn-secondary{
        font-size: 17px;
        width: 40px;
        background-color:#426770;
  }`]
})
export class PaginationComponent {
    constructor() {
        this.pageSize = 1;
    }

    _itemCount: number = 0;
    get itemCount() {
        return this._itemCount;
    }
    set itemCount(value) {
        this._itemCount = value;
        this.updatePageCount();
    }

    _pageSize: number = 0;
    get pageSize() {
        return this._pageSize;
    }
    set pageSize(value) {
        this._pageSize = value;
        this.updatePageCount();
    }

    _pageCount: number = 0;
    updatePageCount() {
        this._pageCount = Math.ceil(this.itemCount / this.pageSize);
    }

    _pageIndex: number = 0;
    pageIndexChange = new EventEmitter();
    get pageIndex() {
        return this._pageIndex;
    }
    set pageIndex(value) {
        this._pageIndex = value;
        this.pageIndexChange.emit(this.pageIndex);
    }

    get canMoveToNextPage(): boolean {
        return this.pageIndex < this._pageCount - 1 ? true : false;
    }

    get canMoveToPreviousPage(): boolean {
        return this.pageIndex >= 1 ? true : false;
    }

    moveToNextPage() {
        if (this.canMoveToNextPage) {
            this.pageIndex++;
        }
    }

    moveToPreviousPage() {
        if (this.canMoveToPreviousPage) {
            this.pageIndex--;
        }
    }

    moveToLastPage() {
        this.pageIndex = this._pageCount - 1;
    }

    moveToFirstPage() {
        this.pageIndex = 0;
    }
}


