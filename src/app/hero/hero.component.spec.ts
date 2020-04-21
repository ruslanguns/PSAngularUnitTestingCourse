import { TestBed, ComponentFixture } from "@angular/core/testing";
import { HeroComponent } from "./hero.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";

describe('HeroComponent — ShallowTest', () => {
  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroComponent],
      schemas: [NO_ERRORS_SCHEMA] // ignora los errores pero no es una solucion...Usarla solo cuando sea necesaria
    });

    fixture = TestBed.createComponent(HeroComponent);
  });

  it('should have the correct hero', () => {
    fixture.componentInstance.hero = { id: 1, name: 'SuperMan', strength: 3};

    expect(fixture.componentInstance.hero.name).toEqual('SuperMan');
  });

  it('should render the hero name in anchor tag', () => {
    fixture.componentInstance.hero = { id: 1, name: 'SuperMan', strength: 3};
    fixture.detectChanges();

    const deA = fixture.debugElement.query(By.css('a'));
    expect(deA.nativeElement.textContent).toContain('SuperMan');

    // expect(fixture.nativeElement.querySelector('a').textContent).toContain('SuperMan');
  });

});
