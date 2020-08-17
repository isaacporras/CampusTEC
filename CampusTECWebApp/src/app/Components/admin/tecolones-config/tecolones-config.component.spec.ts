import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TecolonesConfigComponent } from './tecolones-config.component';

describe('TecolonesConfigComponent', () => {
  let component: TecolonesConfigComponent;
  let fixture: ComponentFixture<TecolonesConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TecolonesConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TecolonesConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
