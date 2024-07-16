import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSingleArtistComponent } from './show-single-artist.component';

describe('ShowSingleArtistComponent', () => {
  let component: ShowSingleArtistComponent;
  let fixture: ComponentFixture<ShowSingleArtistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowSingleArtistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowSingleArtistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
