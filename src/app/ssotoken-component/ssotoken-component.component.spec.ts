import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SSOTokenComponentComponent } from './ssotoken-component.component';

describe('SSOTokenComponentComponent', () => {
  let component: SSOTokenComponentComponent;
  let fixture: ComponentFixture<SSOTokenComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SSOTokenComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SSOTokenComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
