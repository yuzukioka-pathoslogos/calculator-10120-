import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {  
  let fixture: any;
  let component: any;
  let display: HTMLDivElement;
  let btn1: HTMLButtonElement;
  let btn2: HTMLButtonElement;
  let btn3: HTMLButtonElement;
  let btn4: HTMLButtonElement;
  let btn5: HTMLButtonElement;
  let btn6: HTMLButtonElement;
  let btn7: HTMLButtonElement;
  let btn8: HTMLButtonElement;
  let btn9: HTMLButtonElement;
  let btn0: HTMLButtonElement;
  let btnDot: HTMLButtonElement;
  let btnPlus: HTMLButtonElement;
  let btnMinus: HTMLButtonElement;
  let btnAsterisk: HTMLButtonElement;
  let btnSlash: HTMLButtonElement;
  let btnEqual: HTMLButtonElement;
  let btnClear: HTMLButtonElement;
  let btnClearEntry: HTMLButtonElement;
  let btnPercent: HTMLButtonElement;
  let btnSqrt: HTMLButtonElement;
  let btnPlusMinus: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    display = fixture.debugElement.query(By.css('[data-testid="display"]')).nativeElement;
    btn1 = fixture.debugElement.query(By.css('[data-testid="button-1"]')).nativeElement;
    btn2 = fixture.debugElement.query(By.css('[data-testid="button-2"]')).nativeElement;
    btn3 = fixture.debugElement.query(By.css('[data-testid="button-3"]')).nativeElement;
    btn4 = fixture.debugElement.query(By.css('[data-testid="button-4"]')).nativeElement;
    btn5 = fixture.debugElement.query(By.css('[data-testid="button-5"]')).nativeElement;
    btn6 = fixture.debugElement.query(By.css('[data-testid="button-6"]')).nativeElement;
    btn7 = fixture.debugElement.query(By.css('[data-testid="button-7"]')).nativeElement;
    btn8 = fixture.debugElement.query(By.css('[data-testid="button-8"]')).nativeElement;
    btn9 = fixture.debugElement.query(By.css('[data-testid="button-9"]')).nativeElement;
    btn0 = fixture.debugElement.query(By.css('[data-testid="button-0"]')).nativeElement;
    btnDot = fixture.debugElement.query(By.css('[data-testid="button-dot"]')).nativeElement;
    btnPlus = fixture.debugElement.query(By.css('[data-testid="button-plus"]')).nativeElement;
    btnMinus = fixture.debugElement.query(By.css('[data-testid="button-minus"]')).nativeElement;
    btnAsterisk = fixture.debugElement.query(By.css('[data-testid="button-asterisk"]')).nativeElement;
    btnSlash = fixture.debugElement.query(By.css('[data-testid="button-slash"]')).nativeElement;
    btnEqual = fixture.debugElement.query(By.css('[data-testid="button-equal"]')).nativeElement;
    btnClear = fixture.debugElement.query(By.css('[data-testid="button-clear"]')).nativeElement;
    btnClearEntry = fixture.debugElement.query(By.css('[data-testid="button-clear-entry"]')).nativeElement;
    btnPercent = fixture.debugElement.query(By.css('[data-testid="button-percent"]')).nativeElement;
    btnSqrt = fixture.debugElement.query(By.css('[data-testid="button-sqrt"]')).nativeElement;
    btnPlusMinus = fixture.debugElement.query(By.css('[data-testid="button-plus-minus"]')).nativeElement;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('5 + 3 = 8', () => {
    btn5.click();
    btnPlus.click();
    btn3.click();
    btnEqual.click();
    fixture.detectChanges();
    expect(display.textContent).toBe('8');
  });
  

});
