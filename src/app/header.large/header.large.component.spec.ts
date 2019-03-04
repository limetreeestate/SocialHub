import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Header.LargeComponent } from './header.large.component';

describe('Header.LargeComponent', () => {
  let component: Header.LargeComponent;
  let fixture: ComponentFixture<Header.LargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Header.LargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Header.LargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
