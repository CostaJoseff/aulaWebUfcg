import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadConcluidoComponent } from './upload-concluido.component';

describe('UploadConcluidoComponent', () => {
  let component: UploadConcluidoComponent;
  let fixture: ComponentFixture<UploadConcluidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadConcluidoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadConcluidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
