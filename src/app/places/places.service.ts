import { Injectable } from '@angular/core';
import { Place } from './place.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places: Place[] = [
     new Place(
       'p1',
       'Manhattan Mansion',
       'In the heart of New York City',
       'https://cdn.houseplans.com/product/q5qkhirat4bcjrr4rpg9fk3q94/w800x533.jpg?v=8',
        149.99
     ),
     new Place(
      'p2',
      'L\'Amour Toujours',
      'Romentic Place In Paris',
      'https://static.domain.com.au/domainblog/uploads/2017/10/25134613/2_gz3c6h.jpg',
       189.99
    ),
    new Place(
      'p3',
      'The Foggy Place',
      'Not Your Average City',
      'https://media.rightmove.co.uk/dir/crop/10:9-16:9/143k/142385/69463750/142385_16685_4_28_101368_IMG_01_0000_max_476x317.jpg',
       99.99
    ),
  ];

  get places(){
    return [...this._places];
  }

  constructor() { }

  getPlace(id: string){
    return {...this._places.find(p => p.id === id)};
  }
}
