import { TestBed } from '@angular/core/testing';

import { FavouriteMoviesService } from './favourite-movies.service';

describe('FavouriteMoviesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FavouriteMoviesService = TestBed.get(FavouriteMoviesService);
    expect(service).toBeTruthy();
  });
});
