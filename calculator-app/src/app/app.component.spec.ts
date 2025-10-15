import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {  
  let fixture: any;
  let component: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('5 + 3 = 8', () => {
    component.number('5');
    component.operator('+');
    component.number('3');
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('8');
  });
  it('5 - 3 = 2', () => {
    component.number('5');
    component.operator('-');
    component.number('3');
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('2');
  });
  it('5 * 3 = 15', () => {
    component.number('5');
    component.operator('*');
    component.number('3');
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('15');
  });
  it('5 / 3 = 1.66666666', () => {
    component.number('5');
    component.operator('/');
    component.number('3');
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('1.66666666');
  });
  it('5+3*2= 16',() =>{
    component.number('5');
    component.operator('+');
    component.number('3');
    component.operator('*');
    component.number('2');
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('16');
  })


  //errorが出るテストケース
  it('0/0= error',() =>{
    component.number('0');
    component.operator('/');
    component.number('0');
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('error');
  })
  it('999999*= e9999980000',() =>{
    component.number('9');
    component.number('9'); 
    component.number('9');
    component.number('9');
    component.number('9');
    component.number('9');
    component.operator('*');
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('e9999980000');
  })
  it('9999999999/= 0',() =>{
    component.number('9'); 
    component.number('9');
    component.number('9');
    component.number('9');
    component.number('9'); 
    component.number('9');
    component.number('9');
    component.number('9');
    component.number('9');
    component.number('9');
    component.operator('/');
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('0');
  })
  it('5-=r error',() =>{
    component.number('5');
    component.operator('-');
    component.equal();
    component.sqrt();
    fixture.detectChanges();
    expect(component.display).toBe('error');
  })
  it('33554432.3-.1= 33554432.2',() =>{
    component.number('3');
    component.number('3');
    component.number('5');
    component.number('5');
    component.number('4');
    component.number('4');
    component.number('3');
    component.number('2');
    component.dot();
    component.number('3');
    component.operator('-');
    component.dot();
    component.number('1');
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('33554432.2');
  })
  it('99999*.1= 9999.9',() =>{
    component.number('9');
    component.number('9');  
    component.number('9');
    component.number('9');
    component.number('9');
    component.operator('*');
    component.dot();
    component.number('1');
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('9999.9');
  })
  it('81000019+.1= 81000019.1',() =>{
    component.number('8');
    component.number('1');
    component.number('0');
    component.number('0');  
    component.number('0');
    component.number('0');
    component.number('1');
    component.number('9');
    component.operator('+');
    component.dot();
    component.number('1');
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('81000019.1');
  })





  //%の特殊入力
  it('200+5%%% 210', () => {
    component.number('2');
    component.number('0');
    component.number('0');
    component.operator('+');
    component.number('5');
    component.percent();
    component.percent();
    component.percent();
    fixture.detectChanges();
    expect(component.display).toBe('210');
  });
  it('200-5%%% 190', () => {
    component.number('2');
    component.number('0');
    component.number('0');
    component.operator('-');
    component.number('5');
    component.percent();
    component.percent();
    component.percent();
    fixture.detectChanges();
    expect(component.display).toBe('190');
  });
  it('200*5%%% 40', () => {
    component.number('2');
    component.number('0');
    component.number('0');
    component.operator('*');
    component.number('5');
    component.percent();
    component.percent();
    component.percent();
    fixture.detectChanges();
    expect(component.display).toBe('40');
  });
  it('200/5%%% 1600000', () => {
    component.number('2');
    component.number('0');
    component.number('0');
    component.operator('/');
    component.number('5');
    component.percent();
    component.percent();
    component.percent();
    fixture.detectChanges();
    expect(component.display).toBe('1600000');
  });
  it('200+5%== 610', () => {
    component.number('2');
    component.number('0');
    component.number('0');
    component.operator('+');
    component.number('5');
    component.percent();
    component.equal();
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('610');
  });
  it('200-5%== -210', () => {
    component.number('2');
    component.number('0');
    component.number('0');
    component.operator('-');
    component.number('5');
    component.percent();
    component.equal();
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('-210');
  });
  it('200*5%== 400000', () => {
    component.number('2');
    component.number('0');
    component.number('0');
    component.operator('*');
    component.number('5');
    component.percent();
    component.equal();
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('400000');
  });
  it('200/5%== 160', () => {
    component.number('2');
    component.number('0');
    component.number('0');
    component.operator('/');
    component.number('5');
    component.percent();
    component.equal();
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('160');
  });
  it('5+=== 15', () => {
    component.number('5');
    component.operator('+');
    component.equal();
    component.equal();
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('15');
  });
  it('5-=== -15', () => {
    component.number('5');
    component.operator('-');
    component.equal();
    component.equal();
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('-15');
  });
  it('5*=== 625', () => {
    component.number('5');
    component.operator('*');
    component.equal();
    component.equal();
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('625');
  });
  it('5/=== 0.008', () => {
    component.number('5');
    component.operator('/');
    component.equal();
    component.equal();
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('0.008');
  });
  it('5+3+=== 24', () => {
    component.number('5');
    component.operator('+');
    component.number('3');
    component.operator('+');
    component.equal();
    component.equal();
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('24');
  });
  it('5+3-=== -24', () => {
    component.number('5');
    component.operator('+');
    component.number('3');
    component.operator('-');
    component.equal();
    component.equal();
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('-24');
  });
  it('5+3*=== 4096', () => {
    component.number('5');
    component.operator('+');
    component.number('3');
    component.operator('*');
    component.equal();
    component.equal();
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('4096');
  });
  it('5+3/=== 0.00195312', () => {
    component.number('5');
    component.operator('+');
    component.number('3');
    component.operator('/');
    component.equal();
    component.equal();
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('0.00195312');
  });
  it('5+3=+== 19', () => {
    component.number('5');
    component.operator('+');
    component.number('3');
    component.equal();
    component.operator('+');
    component.equal();
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('19');
  });
  it('5+3=-== -13', () => {
    component.number('5');
    component.operator('+');
    component.number('3');
    component.equal();
    component.operator('-');
    component.equal();
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('-13');
  });
  it('5+3=*== 512', () => {
    component.number('5');
    component.operator('+');
    component.number('3');
    component.equal();
    component.operator('*');
    component.equal();
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('512');
  });
  it('5+3=/== 0.015625', () => {
    component.number('5');
    component.operator('+');
    component.number('3');
    component.equal();
    component.operator('/');
    component.equal();
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('0.015625');
  });
   
  //+-の特殊入力
  it('5PM+3= -2',() =>{
    component.number('5');
    component.plusMinus();
    component.operator('+');
    component.number('3');
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('-2');
  })
  it('5*PM3= -15',() =>{
    component.number('5');
    component.operator('*');
    component.plusMinus();
    component.number('3');
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('-15');
  })
  it('5*3=PM= -75',() =>{
    component.number('5');
    component.operator('*');
    component.number('3');
    component.equal();
    component.plusMinus();
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('-75');
  })
  it('5*3=PM/= -0.06666666',() =>{
    component.number('5');
    component.operator('*');
    component.number('3');
    component.equal();
    component.plusMinus();
    component.operator('/');
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('-0.06666666');
  })
  it('5*3=PM%== -18.75',() =>{
    component.number('5');
    component.operator('*');
    component.number('3');
    component.equal();
    component.plusMinus();
    component.percent();
    component.equal();
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('-18.75');
  })


  //sqrtの特殊入力
  it('9r+5= 8',() =>{
    component.number('9');
    component.sqrt();
    component.operator('+');
    component.number('5');
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('8');
  })
  it('5+4r= 7',() =>{
    component.number('5');
    component.operator('+');
    component.number('4');
    component.sqrt();
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('7');
  })
  it('1+3=r+3= 5',() =>{
    component.number('1');
    component.operator('+');
    component.number('3');
    component.equal();
    component.sqrt();
    component.operator('+');
    component.number('3');
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('5');
  })
  it('2+9rCE5= 7',() =>{
    component.number('2');
    component.operator('+');
    component.number('9');
    component.sqrt();
    component.clearEntry();
    component.number('5');
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('7');
  })
  it('2+9r.5= 2.5',() =>{
    component.number('2');
    component.operator('+');
    component.number('9');
    component.sqrt();
    component.dot();
    component.number('5');
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('2.5');
  })
  it('1+3=r.5= 3.5',() =>{
    component.number('1');
    component.operator('+');
    component.number('3');
    component.equal();
    component.sqrt();
    component.dot();
    component.number('5');
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('3.5');
  })
  it('10-1=rCE= -1',() =>{
    component.number('1');
    component.number('0');
    component.operator('-');
    component.number('1');
    component.equal();
    component.sqrt();
    component.clearEntry();
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('-1');
  })
  it('4+r= 6',() =>{
    component.number('4');
    component.operator('+');
    component.sqrt();
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('6');
  })
  it('4-r= 2',() =>{
    component.number('4');
    component.operator('-');
    component.sqrt();
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('2');
  })
  it('4/r=== 0.5',() =>{
    component.number('4');
    component.operator('/');
    component.sqrt();
    component.equal();
    component.equal();
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('0.5');
  })
  it('4*r=== 128',() =>{
    component.number('4');
    component.operator('*');
    component.sqrt();
    component.equal();
    component.equal();
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('128');
  })

  //複雑な計算
  it('5+3=PM*2=5= -40',() =>{
    component.number('5');
    component.operator('+');
    component.number('3');
    component.equal();
    component.plusMinus();
    component.operator('*');
    component.number('2');
    component.equal();
    component.number('5');
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('-40');
  })
  it('5*200%%==/5==*= 0.25',() =>{
    component.number('5');
    component.operator('*');
    component.number('200');
    component.percent();
    component.percent();
    component.equal();
    component.equal();
    component.operator('/');
    component.number('5');
    component.equal();
    component.equal();
    component.operator('*');
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('0.25');
  })
  
  it('10*=rCE= 0',() =>{
    component.number('1');
    component.number('0');
    component.operator('*');
    component.equal();
    component.sqrt();
    component.clearEntry();
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('0');
  })

  it('5*1.5==r5=+10%== 77.5',() =>{
    component.number('5');
    component.operator('*');
    component.number('1');
    component.dot();
    component.number('5');
    component.equal();
    component.equal();
    component.sqrt();
    component.number('5');
    component.equal();
    component.operator('+');
    component.number('1');
    component.number('0');
    component.percent();
    component.equal();
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('77.5');
  })
  it('7*8%=/2+5= 6.96',() =>{
    component.number('7');
    component.operator('*');
    component.number('8');
    component.percent();
    component.equal();
    component.operator('/');
    component.number('2');
    component.operator('+');
    component.number('5');
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('6.96');
  })


  //追加ケース
  it('5+3=*2√= 11.3137084',() =>{
    component.number('5');
    component.operator('+');
    component.number('3');
    component.equal();
    component.operator('*');
    component.number('2');
    component.sqrt();
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('11.3137084');
  })
  it('.1+0.2=√±= -0.34772255',() =>{
    component.dot();
    component.number('1');
    component.operator('+');
    component.number('0');
    component.dot();
    component.number('2');
    component.equal();
    component.sqrt();
    component.plusMinus();
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('-0.34772255');
  })
  it('7 * 8 / 4 + 2 % = 28.28',() =>{
    component.number('7');
    component.operator('*');
    component.number('8');
    component.operator('/');
    component.number('4');
    component.operator('+');
    component.number('2');
    component.percent();
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('28.28');
  })
  it('9 ± - 5 √ + 1 = -10.2360679',() =>{
    component.number('9');
    component.plusMinus();
    component.operator('-');
    component.number('5');
    component.sqrt();
    component.operator('+');
    component.number('1');
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('-10.2360679');
  })
  it('3 . 1 4 * 2 . 0 0 = CE 5 + = 8.14',() =>{
    component.number('3');
    component.dot();
    component.number('1');
    component.number('4');
    component.operator('*');
    component.number('2');
    component.dot();
    component.number('0');
    component.number('0');
    component.equal();
    component.clearEntry();
    component.number('5');
    component.operator('+');
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('8.14');
  })
  it('6 6 ± / 3 √ = -38.1051179',() =>{
    component.number('6');
    component.number('6');
    component.plusMinus();
    component.operator('/');
    component.number('3');
    component.sqrt();
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('-38.1051179');
  })
  it('1 0 0 % + 5 √ - 2 = 0.23606797',() =>{
    component.number('1');
    component.number('0');
    component.number('0');
    component.percent();
    component.operator('+');
    component.number('5');
    component.sqrt();
    component.operator('-');
    component.number('2');
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('0.23606797');
  })
  it('. 5 + . 2 * 4 = ± C 7 = 7',() =>{
    component.dot();
    component.number('5');
    component.operator('+');
    component.dot();
    component.number('2');
    component.operator('*');
    component.number('4');
    component.equal();
    component.plusMinus();
    component.clear();
    component.number('7');
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('7');
  })
  it('8 0 / 2 - 3 √ + 6 ± = 32.2679492',() =>{
    component.number('8');
    component.number('0');
    component.operator('/');
    component.number('2');
    component.operator('-');
    component.number('3');
    component.sqrt();
    component.operator('+');
    component.number('6');
    component.plusMinus();
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('32.2679492');
  })
  it('9 9 9 * 0 . 1 0 + 2 CE 4 = 103.9',() =>{
    component.number('9');
    component.number('9');
    component.number('9');
    component.operator('*');
    component.number('0');
    component.dot();
    component.number('1');
    component.number('0');
    component.operator('+');
    component.number('2');
    component.clearEntry();
    component.number('4');
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('103.9');
  })
  it('2 + 2 = * 3 = / 6 = 2',() =>{
    component.number('2');
    component.operator('+');
    component.number('2');
    component.equal();
    component.operator('*');
    component.number('3');
    component.equal();
    component.operator('/');
    component.number('6');
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('2');
  })
  it('4 * 5 = + 1 0 = 30',() =>{
    component.number('4');
    component.operator('*');
    component.number('5');
    component.equal();
    component.operator('+');
    component.number('1');
    component.number('0');
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('30');
  })
  it('5 + = * . 3 √ CE 0 = 1 8 * 2 = 36',() =>{
    component.number('5');
    component.operator('+');
    component.equal();
    component.operator('*');
    component.dot();
    component.number('3');
    component.sqrt();
    component.clearEntry();
    component.number('0');
    component.equal();
    component.number('1');
    component.number('8');
    component.operator('*');
    component.number('2');
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('36');
  })
  it('7 * * / 9 . 9 + ± 3 = = 5.2929293',() =>{
    component.number('7');
    component.operator('*');
    component.operator('*');
    component.operator('/');
    component.number('9');
    component.dot();
    component.number('9');
    component.operator('+');
    component.plusMinus();
    component.number('3');
    component.equal();
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('5.2929293');
  })
  it('1 0 . 5 + 6 . * = ± 7 CE / = error',() =>{
    component.number('1');
    component.number('0');
    component.dot();
    component.number('5');
    component.operator('+');
    component.number('6');
    component.dot();
    component.operator('*');
    component.equal();
    component.plusMinus();
    component.number('7');
    component.clearEntry();
    component.operator('/');
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('error');
  })
  it('3 + + 2 * * 5 = √ 9 = 45',() =>{
    component.number('3');
    component.operator('+');
    component.operator('+');
    component.number('2');
    component.operator('*');
    component.operator('*');
    component.number('5');
    component.equal();
    component.sqrt();
    component.number('9');
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('45');
  })
  it('9 ± 9 / 3 * 1 0 = -330',() =>{
    component.number('9');
    component.plusMinus();
    component.number('9');
    component.operator('/');
    component.number('3');
    component.operator('*');
    component.number('1');
    component.number('0');
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('-330');
  })
  it('0 . 0 1 + 8 8 - = / √ = error',() =>{
    component.number('0');
    component.dot();
    component.number('0');
    component.number('1');
    component.operator('+');
    component.number('8');
    component.number('8');
    component.operator('-');
    component.equal();
    component.operator('/');
    component.sqrt();
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('error');
  })
  it('6 9 * 0 0 = % 5 * = 25',() =>{
    component.number('6');
    component.number('9');
    component.operator('*');
    component.number('0');
    component.number('0');
    component.equal();
    component.percent();
    component.number('5');
    component.operator('*');
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('25');
  })
  it('2 ± * 9 . 3 + = = -37.2',() =>{
    component.number('2');
    component.plusMinus();
    component.operator('*');
    component.number('9');
    component.dot();
    component.number('3');
    component.operator('+');
    component.equal();
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('-37.2');
  })
  it('4 / = = 2 . 2 * = 4.84',() =>{
    component.number('4');
    component.operator('/');
    component.equal();
    component.equal();
    component.number('2');
    component.dot();
    component.number('2');
    component.operator('*');
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('4.84');
  })
  it('1 . . 1 + 9 9 9 = CE 1000.1',() =>{
    component.number('1');
    component.dot();
    component.dot();
    component.number('1');
    component.operator('+');
    component.number('9');
    component.number('9');
    component.number('9');
    component.equal();
    component.clearEntry();
    fixture.detectChanges();
    expect(component.display).toBe('1000.1');
  })
  it('3 3 % + 9 . * = 81',() =>{
    component.number('3');
    component.number('3');
    component.percent();
    component.operator('+');
    component.number('9');
    component.dot();
    component.operator('*');
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('81');
  })
  it('6 / = / 6 * 2 = 0.05555554',() =>{
    component.number('6');
    component.operator('/');
    component.equal();
    component.operator('/');
    component.number('6');
    component.operator('*');
    component.number('2');
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('0.05555554');
  })
  it('4r+3== 8',() =>{
    component.number('4');
    component.sqrt();
    component.operator('+');
    component.number('3');
    component.equal();
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('8');
  })
  it('5+r9== 23',() =>{
    component.number('5');
    component.operator('+');
    component.sqrt();
    component.number('9');
    component.equal();
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('23');
  })
  it('9-r5== -1',() =>{
    component.number('9');
    component.operator('-');
    component.sqrt();
    component.number('5');
    component.equal();
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('-1');
  })
  it('2*r4== 16',() =>{
    component.number('2');
    component.operator('*');
    component.sqrt();
    component.number('4');
    component.equal();
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('16');
  })
  it('10/r2== 2.5',() =>{
    component.number('1');
    component.number('0');
    component.operator('/');
    component.sqrt();
    component.number('2');
    component.equal();
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('2.5');
  })
  it('9 * CE 5 = = 405',() =>{
    component.number('9');
    component.operator('*');
    component.clearEntry();
    component.number('5');
    component.equal();
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('405');
  })
  it('. 5 + 1 = = 2.5',() =>{
    component.dot();
    component.number('5');
    component.operator('+');
    component.number('1');
    component.equal();
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('2.5');
  })
  it('9 √ = = = 3',() =>{
    component.number('9');
    component.sqrt();
    component.equal();
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('3');
  })
  it('5 + 4 = √ = = 11',() =>{
    component.number('5');
    component.operator('+');
    component.number('4');
    component.equal();
    component.sqrt();
    component.equal();
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('11');
  })
  it('9rPM+5%= -6.15',() =>{
    component.number('9');
    component.sqrt();
    component.plusMinus();
    component.operator('+');
    component.number('5');
    component.percent();
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('-6.15');
  })
  it('8+4%PM= -0.32',() =>{
    component.number('8');
    component.operator('+');
    component.number('4');
    component.percent();
    component.plusMinus();
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('-0.32');
  })
  it('16r-4PMCE2= 2',() =>{
    component.number('1');
    component.number('6');
    component.sqrt();
    component.operator('-');
    component.number('4');
    component.plusMinus();
    component.clearEntry();
    component.number('2');
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('2');
  })
  it('25rPM+5%PM= 0.25',() =>{
    component.number('2');
    component.number('5');
    component.sqrt();
    component.plusMinus();
    component.operator('+');
    component.number('5');
    component.percent();
    component.plusMinus();
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('0.25');
  })
  it('9r+16%PM= -0.48',() =>{
    component.number('9');
    component.sqrt();
    component.operator('+');
    component.number('1');
    component.number('6');
    component.percent();
    component.plusMinus();
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('-0.48');
  })
  it('9rPM*2%== -0.54',() =>{
    component.number('9');
    component.sqrt();
    component.plusMinus();
    component.operator('*');
    component.number('2');
    component.percent();
    component.equal();
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('-0.54');
  })
  it('4PM√+8%= error',() =>{
    component.number('4');
    component.plusMinus();
    component.sqrt();
    component.number('8');
    component.percent();
    component.equal();  
    fixture.detectChanges();
    expect(component.display).toBe('error');
  })
  it('49rCE+7PM= -7',() =>{
    component.number('4');
    component.number('9');
    component.sqrt();
    component.clearEntry();
    component.number('7');
    component.plusMinus();
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('-7');
  })
  it('36rPM+64%PM= 3.84',() =>{
    component.number('3');
    component.number('6');
    component.sqrt();
    component.plusMinus();
    component.operator('+');
    component.number('6');
    component.number('4');
    component.percent();
    component.plusMinus();
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('3.84');
  })
  it('9r+9%CE= 6.27',() =>{
    component.number('9');
    component.sqrt();
    component.operator('+');
    component.number('9');
    component.percent();
    component.clearEntry();
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('6.27');
  })
  it('5PM+5%PM√= -2.70871216',() =>{
    component.number('5');
    component.plusMinus();
    component.operator('+');
    component.number('5');
    component.percent();
    component.plusMinus();
    component.sqrt();
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('-2.70871216');
  })
  it('16rPMCE+4PM= -4',() =>{
    component.number('1');
    component.number('6');
    component.sqrt();
    component.plusMinus();
    component.clearEntry();
    component.operator('+');
    component.number('4');
    component.plusMinus();
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('-4');
  })
  it('9rPM*9%PM= -0.81',() =>{
    component.number('9');
    component.sqrt();
    component.plusMinus();
    component.operator('*');
    component.number('9');
    component.percent();
    component.plusMinus();
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('-0.81');
  })
  it('64rPM+36%PM= 2.88',() =>{
    component.number('6');
    component.number('4');
    component.sqrt();
    component.plusMinus();
    component.operator('+');
    component.number('3');
    component.number('6');
    component.percent();
    component.plusMinus();
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('2.88');
  })
  it('9rPMCE+100%PM= 0',() =>{
    component.number('9');
    component.sqrt();
    component.plusMinus();
    component.clearEntry();
    component.operator('+');
    component.number('1');
    component.number('0');
    component.number('0');
    component.percent();
    component.plusMinus();
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('0');
  })

  //sqrtと%を組み合わせた計算
  it('5%r= 0',() =>{
    component.number('5');
    component.percent();
    component.sqrt();
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('0');
  })
  it('5r%= 0',() =>{
    component.number('5');
    component.sqrt();
    component.percent();
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('0');
  })
  it('5+%r 2.23606797',() =>{
    component.number('5');
    component.operator('+');
    component.percent();
    component.sqrt();
    fixture.detectChanges();
    expect(component.display).toBe('2.23606797');
  })
  it('5+r% 5.11180339',() =>{
    component.number('5');
    component.operator('+');
    component.sqrt();
    component.percent();
    fixture.detectChanges();
    expect(component.display).toBe('5.11180339');
  })
  it('5-r% 4.8881966',() =>{
    component.number('5');
    component.operator('-');
    component.sqrt();
    component.percent();
    fixture.detectChanges();
    expect(component.display).toBe('4.8881966');
  })
  it('5*r% 0.11180339',() =>{
    component.number('5');
    component.operator('*');
    component.sqrt();
    component.percent();
    fixture.detectChanges();
    expect(component.display).toBe('0.11180339');
  })
  it('5/r% 223.606798',() =>{
    component.number('5');
    component.operator('/');
    component.sqrt();
    component.percent();
    fixture.detectChanges();
    expect(component.display).toBe('223.606798');
  })
  it('5+%r= 7.23606797',() =>{
    component.number('5');
    component.operator('+');
    component.percent();
    component.sqrt();
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('7.23606797');
  })
  it('5-%r= 2.76393203',() =>{
    component.number('5');
    component.operator('-');
    component.percent();
    component.sqrt();
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('2.76393203');
  })
  it('5*%r= 2.5',() =>{
    component.number('5');
    component.operator('*');
    component.percent();
    component.sqrt();
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('2.5');
  })
  it('5/r%= 100',() =>{
    component.number('5');
    component.operator('/');
    component.sqrt();
    component.percent();
    component.equal();
    fixture.detectChanges();
    expect(component.display).toBe('100');
  })
  



})
