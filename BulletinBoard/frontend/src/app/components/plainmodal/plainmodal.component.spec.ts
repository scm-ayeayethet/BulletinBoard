import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlainmodalComponent } from './plainmodal.component';

describe('PlainmodalComponent', () => {
  let component: PlainmodalComponent;
  let fixture: ComponentFixture<PlainmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlainmodalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlainmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
