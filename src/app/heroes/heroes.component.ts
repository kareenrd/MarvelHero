import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Hero } from './../models/heroe.model'
import { HeroService } from '../services/hero.service';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {

  superheroes:Hero[] = [];

  superhero:Hero = {
    id: '',
    name: '',
    description: '',
    thumbnail: {
      path: '',
      extension:'',
    }
  };
  search = '';

  pageIndex = 0;
  pageSize = 3;
  totalRecords: number = 1562;


  constructor(
    private heroService: HeroService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.heroService.get(this.pageIndex,this.pageSize).subscribe(
      data => {
        console.log('marvelService data: ',data);
        this.superheroes = data;
      },
    results => {
      console.log('marvelService results: ',results);
    });

  }

  searchSuper(){
    console.log(this.search);
    this.heroService.search(this.search).subscribe(data => {
      console.log('marvelService search: ',data);
      this.superheroes = data;
    });
  }

  handlePageEvent(e: PageEvent) {
    console.log('handlePageEvent ', e);
    this.pageIndex = e.pageIndex ;
    this.pageSize = e.pageSize;

    this.heroService.get(this.pageIndex,this.pageSize).subscribe(data => {
      console.log('marvelService list: ',data);
      this.superheroes = data;
    });
  }

}
