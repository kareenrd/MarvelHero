import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(
    private http: HttpClient
  ) { }

  private api = 'https://gateway.marvel.com/v1/public/characters?';
  private auth = 'ts=thesoer&apikey=001ac6c73378bbfff488a36141458af2&hash=72e5ed53d1398abb831c3ceec263f18b'

  get(pageIndex: number,pageSize: number){
    //return this.http.get(`${this.api}`);

    const response =  this.http.get(`${this.api}${this.auth}&limit=${pageSize}&offset=${pageIndex}`)
      .pipe(map((data: any) => data.data.results));
      console.log(response);
    return response;

  }

  search(name: string){
    return this.http.get(`${this.api}nameStartsWith=${name}&${this.auth}`)
      .pipe(map((data: any) => data.data.results))
  }
}


