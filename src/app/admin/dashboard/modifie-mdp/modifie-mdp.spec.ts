import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModifieMDP } from './modifie-mdp';

describe('ModifieMDP', () => {
  let component: ModifieMDP;
  let fixture: ComponentFixture<ModifieMDP>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifieMDP],
    }).compileComponents();

    fixture = TestBed.createComponent(ModifieMDP);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
