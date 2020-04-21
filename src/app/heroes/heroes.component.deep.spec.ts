import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { NO_ERRORS_SCHEMA, Directive, Input } from "@angular/core";
import { HeroService } from "../hero.service";
import { HeroComponent } from "../hero/hero.component";
import { of } from "rxjs/internal/observable/of";
import { By } from "@angular/platform-browser";

@Directive({
  selector: '[routerLink]',
  host: { '(click)': 'onClick()' }
})
class RouterLinkStubDirective {
  @Input('routerLink') linkParams: any;
  navigateTo: any = null;

  onClick() {
    this.navigateTo = this.linkParams;
  }
}

describe('HeroesComponent — Deep', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let HEROES;

  beforeEach(() => {
    HEROES = [
      {id: 1, name: 'SpiderMan', strength: 8},
      {id: 2, name: 'Wonderful woman', strength: 24},
      {id: 3, name: 'SuperMan', strength: 55},
    ];

    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

    TestBed.configureTestingModule({
      declarations: [
        HeroesComponent,
        HeroComponent,
        RouterLinkStubDirective
      ],
      providers: [
        { provide: HeroService, useValue: mockHeroService }
      ],
      // schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(HeroesComponent);

  });

  it('should render each hero as a HeroComponent', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    // run ngOnInit
    fixture.detectChanges();

    const heroComponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));

    expect(heroComponentDEs.length).toBe(HEROES.length);

    for (let i = 0; i < heroComponentDEs.length; i++) {
      expect(heroComponentDEs[i].componentInstance.hero).toEqual(HEROES[i]);
    }

  });

  it(`Should call heroService.deleteHero when the Hero Component's delete botton is called`, () => {
    spyOn(fixture.componentInstance, 'delete');
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    fixture.detectChanges();

    const heroComponent = fixture.debugElement.queryAll(By.directive(HeroComponent));

    // ===>>> TRIGGERING EVENTS ON ELEMENTS
    // heroComponent[1]
    //   .query(By
    //   .css('button'))
    //   .triggerEventHandler('click', {stopPropagation: () => {}});

    // ===>>> EMITTING EVENTS FROM CHILDREN
    // (<HeroComponent>heroComponent[1].componentInstance).delete.emit(undefined);

    //  ===>>> RAISING EVENTS ON CHILD DIRECTIVES
    heroComponent[1].triggerEventHandler('delete', null);

    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[1]);
  });

  it('should add a new hero to the hero list when the add button is clicked', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    const name = 'Mr. ICE';
    mockHeroService.addHero.and.returnValue(of({id: 5, name, strength: 4}));
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    const addButton = fixture.debugElement.queryAll(By.css('button'))[0];

    inputElement.value = name;
    addButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;
    expect(heroText).toContain(name);

  });

  it('should have the correct route for the first hero', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));

    const routerLink = heroComponents[0]
      .query(By.directive(RouterLinkStubDirective))
      .injector.get(RouterLinkStubDirective);

    heroComponents[0].query(By.css('a')).triggerEventHandler('click', null);

    expect(routerLink.navigateTo).toBe('/detail/1');
  });
});
