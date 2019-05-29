import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { FilterProfile } from '../_models/FilterProfile';
import { AppModule } from '../app.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        AppModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create YouTUbe results', () => {
    component.keyword = "Sri Lanka"
    let filter = new FilterProfile()
    filter.youtube.show = true
    component.search(filter)
    setTimeout(() => expect(component.results.YouTube).toBeTruthy(), 5000)
  });
});
