import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateConfirmComponent } from './create-update-confirm.component';

describe('CreateUpdateConfirmComponent', () => {
  let component: CreateUpdateConfirmComponent;
  let fixture: ComponentFixture<CreateUpdateConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateConfirmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdateConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
