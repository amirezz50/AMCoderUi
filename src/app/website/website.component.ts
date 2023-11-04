import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.css']
})
export class WebsiteComponent implements OnInit {

  constructor(    public _router: Router,
    ) { }

  ngOnInit(): void {
  }
  setRoutLink(routePath: string) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    this._router.navigate([routePath, { mode: null }]).then(value => { });
  }
}
