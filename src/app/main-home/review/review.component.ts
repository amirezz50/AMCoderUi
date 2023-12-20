import { Component, OnInit } from '@angular/core';
import { ReviewService } from './review.service';
import { Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  reviewList: any = []

  constructor(private _ReviewService: ReviewService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getAllReview()
  }
  // starWidth: number = 0;
  // starRating1 = 0;
  // starRating2 = 0;
  // starRating3 = 0;

  // rateProduct(rateValue: number) {
  //   this.starWidth = rateValue * 75 / 5;
  // }

  save() {
    let arrSave: any[] = [];
    let arrUpdate: any[] = [];
    this.reviewList.forEach((element: any) => {
      if (element.dataStatus == 1) {
        arrSave.push(element)
      } else if (element.dataStatus == 2) {
        arrUpdate.push(element);
      }
    });
    if (arrSave.length > 0) {
      this._ReviewService.addReview(arrSave)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((res: any) => {
          if ((res && res.data) || (Object.keys(res).length == 0)) {
            if (res && res.data && res.data[0].error) {
              this.toastr.error(res.data[0].error);
            } else {
              this.toastr.success("Done")
              this.getAllReview()
            }
          } else if (Object.keys(res).length != 0) {
            this.toastr.error(res);
          }
        })
    }
    if (arrUpdate.length > 0) {
      this._ReviewService.updateReview(arrUpdate)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((res: any) => {
          if ((res && res.data) || (Object.keys(res).length == 0)) {
            this.toastr.success("Updated Done")
            this.getAllReview()
          } else if (Object.keys(res).length != 0) {
            this.toastr.error(res);
          }
        })
    }
  }
  getAllReview() {
    this._ReviewService.getAllReview(0)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: any) => {
        if (res && res.data) {
          this.reviewList = res.data
        } else {
          this.toastr.error(res);
        }
      })
  }
  addNewQuestion() {
    this.reviewList.unshift({
      serial: (this.reviewList.length + 1) * -1,
      dataStatus: 1
    })
  }
  updateQuestion(row: any) {
    row.dataStatus = 2;
  }
  deleteQuestion(row: any) {
    row.dataStatus = 3;
    let index = this.reviewList.indexOf(row);
    if (index !== -1) {
      this.reviewList.splice(index, 1);
    }
    this._ReviewService.deleteReview(row)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: any) => {
        if ((res) || (Object.keys(res).length == 0)) {
          this.getAllReview()
        } else {
          this.toastr.error(res);
        }
      })
  }
}
