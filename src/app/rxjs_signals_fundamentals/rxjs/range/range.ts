import { Component, OnInit } from '@angular/core';
import { concatMap, delay, of, range } from 'rxjs';

@Component({
  selector: 'app-range',
  imports: [],
  templateUrl: './range.html',
  styleUrl: './range.css',
})
export class Range implements OnInit {

  ngOnInit(): void {
    range(1, 5)
      .pipe(
        concatMap(i => of(i)
          .pipe(
            delay(this.randomDelay())
          )
      )).subscribe((value) => console.log(value));
  }

  randomDelay(): number {
    return Math.floor(Math.random() * 1000) + 500;
  }
   
}
