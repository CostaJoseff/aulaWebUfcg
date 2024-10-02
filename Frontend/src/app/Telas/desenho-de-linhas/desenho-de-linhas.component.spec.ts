import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesenhoDeLinhasComponent } from './desenho-de-linhas.component';

describe('DesenhoDeLinhasComponent', () => {
  let component: DesenhoDeLinhasComponent;
  let fixture: ComponentFixture<DesenhoDeLinhasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesenhoDeLinhasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesenhoDeLinhasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
