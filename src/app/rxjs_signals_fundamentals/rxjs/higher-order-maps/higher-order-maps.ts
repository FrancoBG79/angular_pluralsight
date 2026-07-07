import { Component, OnInit } from '@angular/core';
import { range, concatMap, of, delay, mergeMap, switchMap } from 'rxjs';

@Component({
  selector: 'app-higher-order-maps',
  imports: [],
  templateUrl: './higher-order-maps.html',
  styleUrl: './higher-order-maps.css',
})
export class HigherOrderMaps implements OnInit {

   ngOnInit(): void {
      range(1, 5)
        .pipe(
          concatMap(i => of(i)
            .pipe(
              delay(this.randomDelay())
            )
        )).subscribe((value) => console.log('ConcatMap:', value));

      range(6, 5)
        .pipe(
          mergeMap(i => of(i)
            .pipe(
              delay(this.randomDelay())
            )
        )).subscribe((value) => console.log('MergeMap:', value));

      range(11, 5)
        .pipe(
          switchMap(i => of(i)
            .pipe(
              delay(this.randomDelay())
            )
        )).subscribe((value) => console.log('SwitchMap:', value));
    }
  
    randomDelay(): number {
      return Math.floor(Math.random() * 1000) + 500;
    }
}
