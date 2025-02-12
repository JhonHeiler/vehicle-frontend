import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculoDetailComponent } from './vehiculo-detail.component';

describe('VehiculoDetailComponent', () => {
  let component: VehiculoDetailComponent;
  let fixture: ComponentFixture<VehiculoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehiculoDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiculoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
