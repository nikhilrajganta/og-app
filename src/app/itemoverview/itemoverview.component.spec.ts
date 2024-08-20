import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemoverviewComponent } from './itemoverview.component';

describe('ItemoverviewComponent', () => {
  let component: ItemoverviewComponent;
  let fixture: ComponentFixture<ItemoverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemoverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemoverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
