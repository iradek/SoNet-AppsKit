import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SonetAppskitComponent } from './sonet-appskit.component';

describe('SonetAppskitComponent', () => {
  let component: SonetAppskitComponent;
  let fixture: ComponentFixture<SonetAppskitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SonetAppskitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SonetAppskitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
