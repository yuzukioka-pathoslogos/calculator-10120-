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
  it('5 - 3 = 2', () => {
    btn5.click();
    btnMinus.click();
    btn3.click();
    btnEqual.click();
    fixture.detectChanges();
    expect(display.textContent).toBe('2');
  });
  it('5 * 3 = 15', () => {
    btn5.click();
    btnAsterisk.click();
    btn3.click();
    btnEqual.click();
    fixture.detectChanges();
    expect(display.textContent).toBe('15');
  });
  it('5 / 3 = 1.66666666', () => {
    btn5.click();
    btnSlash.click();
    btn3.click();
    btnEqual.click();
    fixture.detectChanges();
    expect(display.textContent).toBe('1.66666666');
  });
  it('5+3*2= 16',() =>{
    btn5.click();
    btnPlus.click();
    btn3.click();
    btnAsterisk.click();
    btn2.click();
    btnEqual.click();
    fixture.detectChanges();
    expect(display.textContent).toBe('16');
  })


  //errorが出るテストケース
  it('0/0= error',() =>{
    btn0.click();
    btnSlash.click();
    btn0.click();
    btnEqual.click();
    fixture.detectChanges();
    expect(display.textContent).toBe('error');
  })
  it('999999*= e9999980000',() =>{
    btn9.click();
    btn9.click(); 
    btn9.click();
    btn9.click();
    btn9.click();
    btn9.click();
    btnAsterisk.click();
    btnEqual.click();
    fixture.detectChanges();
    expect(display.textContent).toBe('e9999980000');
  })
  it('9999999999/= 0',() =>{
    btn9.click();
    btn9.click();
    btn9.click();
    btn9.click();
    btn9.click();
    btn9.click(); 
    btn9.click();
    btn9.click();
    btn9.click();
    btn9.click();
    btnSlash.click();
    btnEqual.click();
    fixture.detectChanges();
    expect(display.textContent).toBe('0');
  })
  it('5-=r error',() =>{
    btn5.click();
    btnMinus.click();
    btnEqual.click();
    btnSqrt.click();
    fixture.detectChanges();
    expect(display.textContent).toBe('error');
  })
  it('33554432.3-.1= 33554432.2',() =>{
    btn3.click();
    btn3.click();
    btn5.click();
    btn5.click();
    btn4.click();
    btn4.click();
    btn3.click();
    btn2.click();
    btnDot.click();
    btn3.click();
    btnMinus.click();
    btnDot.click();
    btn1.click();
    btnEqual.click();
    fixture.detectChanges();
    expect(display.textContent).toBe('33554432.2');
  })
 





  //%の特殊入力
  it('200+5%%% 210', () => {
    btn2.click();
    btn0.click();
    btn0.click();
    btnPlus.click();
    btn5.click();
    btnPercent.click();
    btnPercent.click();
    btnPercent.click();
    fixture.detectChanges();
    expect(display.textContent).toBe('210');
  });
  it('200-5%%% 190', () => {
    btn2.click();
    btn0.click();
    btn0.click();
    btnMinus.click();
    btn5.click();
    btnPercent.click();
    btnPercent.click();
    btnPercent.click();
    fixture.detectChanges();
    expect(display.textContent).toBe('190');
  });
  it('200*5%%% 40', () => {
    btn2.click();
    btn0.click();
    btn0.click();
    btnAsterisk.click();
    btn5.click();
    btnPercent.click();
    btnPercent.click();
    btnPercent.click();
    fixture.detectChanges();
    expect(display.textContent).toBe('40');
  });
  it('200/5%%% 1600000', () => {
    btn2.click();
    btn0.click();
    btn0.click();
    btnSlash.click();
    btn5.click();
    btnPercent.click();
    btnPercent.click();
    btnPercent.click();
    fixture.detectChanges();
    expect(display.textContent).toBe('1600000');
  });
  it('200+5%== 610', () => {
    btn2.click();
    btn0.click();
    btn0.click();
    btnPlus.click();
    btn5.click();
    btnPercent.click();
    btnEqual.click();
    btnEqual.click();
    fixture.detectChanges();
    expect(display.textContent).toBe('610');
  });
  it('200-5%== -210', () => {
    btn2.click();
    btn0.click();
    btn0.click();
    btnMinus.click();
    btn5.click();
    btnPercent.click();
    btnEqual.click();
    btnEqual.click();
    fixture.detectChanges();
    expect(display.textContent).toBe('-210');
  });
  it('200*5%== 400000', () => {
    btn2.click();
    btn0.click();
    btn0.click();
    btnAsterisk.click();
    btn5.click();
    btnPercent.click();
    btnEqual.click();
    btnEqual.click();
    fixture.detectChanges();
    expect(display.textContent).toBe('400000');
  });
  it('200/5%== 160', () => {
    btn2.click();
    btn0.click();
    btn0.click();
    btnSlash.click();
    btn5.click();
    btnPercent.click();
    btnEqual.click();
    btnEqual.click();
    fixture.detectChanges();
    expect(display.textContent).toBe('160');
  });
  it('5+=== 15', () => {
    btn5.click();
    btnPlus.click();
    btnEqual.click();
    btnEqual.click();
    btnEqual.click();
    fixture.detectChanges();
    expect(display.textContent).toBe('15');
  });
  it('5-=== -15', () => {
    btn5.click();
    btnMinus.click();
    btnEqual.click();
    btnEqual.click();
    btnEqual.click();
    fixture.detectChanges();
    expect(display.textContent).toBe('-15');
  });
  it('5*=== 625', () => {
    btn5.click();
    btnAsterisk.click();
    btnEqual.click();
    btnEqual.click();
    btnEqual.click();
    fixture.detectChanges();
    expect(display.textContent).toBe('625');
  });
  it('5/=== 0.008', () => {
    btn5.click();
    btnSlash.click();
    btnEqual.click();
    btnEqual.click();
    btnEqual.click();
    fixture.detectChanges();
    expect(display.textContent).toBe('0.008');
  });
  it('5+3+=== 24', () => {
    btn5.click();
    btnPlus.click();
    btn3.click();
    btnPlus.click();
    btnEqual.click();
    btnEqual.click();
    btnEqual.click();
    fixture.detectChanges();
    expect(display.textContent).toBe('24');
  });
  it('5+3-=== -24', () => {
    btn5.click();
    btnPlus.click();
    btn3.click();
    btnMinus.click();
    btnEqual.click();
    btnEqual.click();
    btnEqual.click();
    fixture.detectChanges();
    expect(display.textContent).toBe('-24');
  });
  it('5+3*=== 4096', () => {
    btn5.click();
    btnPlus.click();
    btn3.click();
    btnAsterisk.click();
    btnEqual.click();
    btnEqual.click();
    btnEqual.click();
    fixture.detectChanges();
    expect(display.textContent).toBe('4096');
  });
  it('5+3/=== 0.00195312', () => {
    btn5.click();
    btnPlus.click();
    btn3.click();
    btnSlash.click();
    btnEqual.click();
    btnEqual.click();
    btnEqual.click();
    fixture.detectChanges();
    expect(display.textContent).toBe('0.00195312');
  });
  it('5+3=+== 19', () => {
    btn5.click();
    btnPlus.click();
    btn3.click();
    btnEqual.click();
    btnPlus.click();
    btnEqual.click();
    btnEqual.click();
    fixture.detectChanges();
    expect(display.textContent).toBe('19');
  });
  it('5+3=-== -13', () => {
    btn5.click();
    btnPlus.click();
    btn3.click();
    btnEqual.click();
    btnMinus.click();
    btnEqual.click();
    btnEqual.click();
    fixture.detectChanges();
    expect(display.textContent).toBe('-13');
  });
  it('5+3=*== 512', () => {
    btn5.click();
    btnPlus.click();
    btn3.click();
    btnEqual.click();
    btnAsterisk.click();
    btnEqual.click();
    btnEqual.click();
    fixture.detectChanges();
    expect(display.textContent).toBe('512');
  });
  it('5+3=/== 0.015625', () => {
    btn5.click();
    btnPlus.click();
    btn3.click();
    btnEqual.click();
    btnSlash.click();
    btnEqual.click();
    btnEqual.click();
    fixture.detectChanges();
    expect(display.textContent).toBe('0.015625');
  });

  //+-の特殊入力
  it('5PM+3= -2',() =>{
    btn5.click();
    btnPlusMinus.click();
    btnPlus.click();
    btn3.click();
    btnEqual.click();
    fixture.detectChanges();
    expect(display.textContent).toBe('-2');
  })
  it('5*PM3= -15',() =>{
    btn5.click();
    btnAsterisk.click();
    btnPlusMinus.click();
    btn3.click();
    btnEqual.click();
    fixture.detectChanges();
    expect(display.textContent).toBe('-15');
  })
  it('5*3=PM= -75',() =>{
    btn5.click();
    btnAsterisk.click();
    btn3.click();
    btnEqual.click();
    btnPlusMinus.click();
    btnEqual.click();
    fixture.detectChanges();
    expect(display.textContent).toBe('-75');
  })
  it('5*3=PM/= -0.06666666',() =>{
    btn5.click();
    btnAsterisk.click();
    btn3.click();
    btnEqual.click();
    btnPlusMinus.click();
    btnSlash.click();
    btnEqual.click();
    fixture.detectChanges();
    expect(display.textContent).toBe('-0.06666666');
  })
  it('5*3=PM%== -18.75',() =>{
    btn5.click();
    btnAsterisk.click();
    btn3.click();
    btnEqual.click();
    btnPlusMinus.click();
    btnPercent.click();
    btnEqual.click();
    btnEqual.click();
    fixture.detectChanges();
    expect(display.textContent).toBe('-18.75');
  })

  //sqrtの特殊入力
  it('9r+5= 8',() =>{
    btn9.click();
    btnSqrt.click();
    btnPlus.click();
    btn5.click();
    btnEqual.click();
    fixture.detectChanges();
    expect(display.textContent).toBe('8');
  })
  it('1+3=r+3= 5',() =>{
    btn1.click();
    btnPlus.click();
    btn3.click();
    btnEqual.click();
    btnSqrt.click();
    btnPlus.click();
    btn3.click();
    btnEqual.click();
    fixture.detectChanges();
    expect(display.textContent).toBe('5');
  })
  it('2+9rCE5= 7',() =>{
    btn2.click();
    btnPlus.click();
    btn9.click();
    btnSqrt.click();
    btnClearEntry.click();
    btn5.click();
    btnEqual.click();
    fixture.detectChanges();
    expect(display.textContent).toBe('7');
  })
  it('2+9r.5= 2.5',() =>{
    btn2.click();
    btnPlus.click();
    btn9.click();
    btnSqrt.click();
    btnDot.click();
    btn5.click();
    btnEqual.click();
    fixture.detectChanges();
    expect(display.textContent).toBe('2.5');
  })
  it('1+3=r.5= 3.5',() =>{
    btn1.click();
    btnPlus.click();
    btn3.click();
    btnEqual.click();
    btnSqrt.click();
    btnDot.click();
    btn5.click();
    btnEqual.click();
    fixture.detectChanges();
    expect(display.textContent).toBe('3.5');
  })
  it('10-1=rCE= -1',() =>{
    btn1.click();
    btn0.click();
    btnMinus.click();
    btn1.click();
    btnEqual.click();
    btnSqrt.click();
    btnClearEntry.click();
    btnEqual.click();
    fixture.detectChanges();
    expect(display.textContent).toBe('-1');
  })
  it('4+r= 6',() =>{
    btn4.click();
    btnPlus.click();
    btnSqrt.click();
    btnEqual.click();
    fixture.detectChanges();
    expect(display.textContent).toBe('6');
  })

  //複雑な計算
  it('5+3=PM*2=5= -40',() =>{
    btn5.click();
    btnPlus.click();
    btn3.click();
    btnEqual.click();
    btnPlusMinus.click();
    btnAsterisk.click();
    btn2.click();
    btnEqual.click();
    btn5.click();
    btnEqual.click();
    fixture.detectChanges();
    expect(display.textContent).toBe('-40');
  })
  it('5*200%%==/5==*= 0.25',() =>{
    btn5.click();
    btnAsterisk.click();
    btn2.click();
    btn0.click();
    btn0.click();
    btnPercent.click();
    btnPercent.click();
    btnEqual.click();
    btnEqual.click();
    btnSlash.click();
    btn5.click();
    btnEqual.click();
    btnEqual.click();
    btnAsterisk.click();
    btnEqual.click();
    fixture.detectChanges();
    expect(display.textContent).toBe('0.25');
  })
  it('10*=rCE= 0',() =>{
    btn1.click();
    btn0.click();
    btnAsterisk.click();
    btnEqual.click();
    btnSqrt.click();
    btnClearEntry.click();
    btnEqual.click();
    fixture.detectChanges();
    expect(display.textContent).toBe('0');
  })
  it('5*1.5==r5=+10%== 77.5',() =>{
    btn5.click();
    btnAsterisk.click();
    btn1.click();
    btnDot.click();
    btn5.click();
    btnEqual.click();
    btnEqual.click();
    btnSqrt.click();
    btn5.click();
    btnEqual.click();
    btnPlus.click();
    btn1.click();
    btn0.click();
    btnPercent.click();
    btnEqual.click();
    btnEqual.click();
    fixture.detectChanges();
    expect(display.textContent).toBe('77.5');
  })
  it('7*8%=/2+5= 6.96',() =>{
    btn7.click();
    btnAsterisk.click();
    btn8.click();
    btnPercent.click();
    btnEqual.click();
    btnSlash.click();
    btn2.click();
    btnPlus.click();
    btn5.click();
    btnEqual.click();
    fixture.detectChanges();
    expect(display.textContent).toBe('6.96');
  })



});
