import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchGameComponent } from './match-game.component';

describe('MatchGameComponent', () => {
  let component: MatchGameComponent;
  let fixture: ComponentFixture<MatchGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
