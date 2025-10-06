//デコレーターやインターフェースをインポート
import { Component, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

//デコレーター＠Componentを使用してコンポーネントを定義
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

//インターフェースAfterViewInitをclass AppCompenentに対して実装
export class AppComponent implements AfterViewInit {
  title = 'calculator-app';

  //コンポーネントのテンプレートが読み込まれた後に実行されるメソッド
  ngAfterViewInit(): void {
    const display = document.querySelector('#display') as HTMLDivElement;
    const buttons = document.querySelectorAll('.button') as NodeListOf<HTMLButtonElement>;
    const operators = document.querySelectorAll('.button-operator') as NodeListOf<HTMLButtonElement>;
    const equal = document.querySelector('.button-equal') as HTMLButtonElement;
    const clear = document.querySelector('.button-clear') as HTMLButtonElement;
    const clearEntry = document.querySelector('.button-clear-entry') as HTMLButtonElement;
    const dot = document.querySelector('.button-dot') as HTMLButtonElement;
    const plusMinus = document.querySelector('.button-plus-minus') as HTMLButtonElement;
    const squareRoot = document.querySelector('.button-sqrt') as HTMLButtonElement;
    const persent = document.querySelector('.button-percent') as HTMLButtonElement;

    //基本的に式の左辺がstack[0]、右辺がstack[1]、連続計算対応のための一時保管場所としてstack[3]を用意
    const stack: string[] = ['', '0', ''];
    let afterCalc: boolean = false;
    display.textContent = stack[1];
    // 最後に押した演算子を格納
    let operator: string = '';
    //計算を行う関数
    const calc = function(){
      switch(operator){
        case '+':
          stack[3] = stack[1];
          //小数点以下13桁まで丸めることで浮動小数点誤差を防ぐ
          const sum = (Number(stack[0]) + Number(stack[1])).toPrecision(13).toString();
          if(sum.includes('-')){
            stack[1] = sum.slice(0, 11);
          }else{
            stack[1] = sum.slice(0, 10);
          }
          //連続計算対応のためにstack[0]にcalc前のstack[1]を代入
          if(afterCalc === false){
            stack[0] = stack[3];
          }
          //小数点以下の末尾の0を削除
          for(let i = 0; i < 10; i++){
            if(stack[1].includes('.') && stack[1].endsWith('0')){
              stack[1] = stack[1].slice(0, -1);
            }
            if(stack[1].endsWith('.')){
              stack[1] = stack[1].slice(0, -1);
              break;
            }
          }
          display.textContent = stack[1];
          if(Number(sum) > 9999999999 || Number(sum) < -9999999999){
            display.textContent = `e${stack[1]}`;
            stack[0] = '';
            stack[1] = '0';
            return;
          }
          afterCalc = true;
          break;
        case '-':
          //連続計算対応
          if(afterCalc === true){
            stack[0] = stack[1];
            stack[1] = stack[3];
          }else{
            stack[3] = stack[1];
          }
          const diff = (Number(stack[0]) - Number(stack[1])).toPrecision(13).toString();
          if(diff.includes('-')){
            stack[1] = diff.slice(0, 11);
          }else{
            stack[1] = diff.slice(0, 10);
          }
          for(let i = 0; i < 10; i++){
            if(stack[1].includes('.') && stack[1].endsWith('0')){
              stack[1] = stack[1].slice(0, -1);
            }
            if(stack[1].endsWith('.')){
              stack[1] = stack[1].slice(0, -1);
              break;
            }
          }
          display.textContent = stack[1];
          if(Number(diff) > 9999999999 || Number(diff) < -9999999999){
            display.textContent = `e${stack[1]}`;
            stack[0] = '';
            stack[1] = '0';
            return;
          }
          afterCalc = true;
          break;
        case '*':
          const prod = (Number(stack[0]) * Number(stack[1])).toPrecision(13).toString();
          if(prod.includes('-')){
            stack[1] = prod.slice(0, 11);
          }else{
            stack[1] = prod.slice(0, 10);
          }
          for(let i = 0; i < 10; i++){
            if(stack[1].includes('.') && stack[1].endsWith('0')){
              stack[1] = stack[1].slice(0, -1);
            }
            if(stack[1].endsWith('.')){
              stack[1] = stack[1].slice(0, -1);
              break;
            }
          }
          display.textContent = stack[1];
          if(Number(prod) > 9999999999 || Number(prod) < -9999999999){
            display.textContent = `e${stack[1]}`;
            stack[0] = '';
            stack[1] = '0';
            return;
          }
          afterCalc = true;
          break;
        case '/':
          //連続計算対応
          if(afterCalc === true){
            stack[0] = stack[1];
            stack[1] = stack[3];
          }else{
            stack[3] = stack[1];
          }
          if(Number(stack[1]) === 0){
            display.textContent = 'error';
            stack[0] = '';
            stack[1] = '0';
            return;
          }
          const quot = (Number(stack[0]) / Number(stack[1])).toPrecision(13).toString();
          if(quot.includes('-')){
            stack[1] = quot.slice(0, 11);
          }else{
            stack[1] = quot.slice(0, 10);
          }
          for(let i = 0; i < 10; i++){
            if(stack[1].includes('.') && stack[1].endsWith('0')){
              stack[1] = stack[1].slice(0, -1);
            }
            if(stack[1].endsWith('.')){
              stack[1] = stack[1].slice(0, -1);
              break;
            }
          }
          display.textContent = stack[1];
          if(Number(quot) > 9999999999 || Number(quot) < -9999999999){
            display.textContent = `e${stack[1]}`;
            stack[0] = '';
            stack[1] = '0';
            return;
          } 
          afterCalc = true;
          break;
        default:
          return;
      }
    }

    //数字をクリックした時に表示される数字を追加
    buttons.forEach((btn: HTMLButtonElement) => {
      btn.addEventListener('click', () => {
        if(operator !== null){          //演算子が入力されている場合
          if(stack[1] === '0'){         //ディスプレイが0の時は消してから数字を入力
            stack[1] = '';
          }
          if(afterCalc === true){
            stack[0] = '';
            stack[1] = '';
            operator = '';
            afterCalc = false;
          }
          if(stack[1] !=null && stack[1].length === 10){
            return;
          }
          stack[1] += btn.value as string;
          display.textContent = stack[1];
        }else{                          //演算子が入力されていない場合
          if(stack[1] === '0'){
            stack[1] = '';
          }
          if(afterCalc === true){
            stack[0] = '';
            stack[1] = '';
            afterCalc = false;
          }
          if(stack[1] !=null && stack[1].length === 10){
            return;
          }
          stack[1] += btn.value as string;
          display.textContent = stack[1];
        }
      });
    });

    //小数点をクリックした時に小数点を入力
    dot.addEventListener('click', () => {
      if(stack[1] === ''){
        stack[1] = '0';
      }
      if(stack[1] !=null && stack[1].length === 10){
        return;
      }
      if(stack[1].includes('.')){       //小数点がすでに入力されている場合は入力しない
        return;
      }else{                            //小数点が入力されていない場合は小数点を入力
      stack[1] += '.';
      display.textContent = stack[1];
      }
    });

    //演算子の処理
    operators.forEach((op: HTMLButtonElement) => {
      op.addEventListener('click', () => {
        if(stack[0] === ''){
          operator = op.value as string;
          stack[0] = stack[1];
          stack[1] = '';
        }else if(stack[0] !== '' && stack[1] === ''){
          operator = op.value as string;
        }else if(stack[0] !== '' && stack[1] !== '' && afterCalc === false){
          calc();
          stack[0] = stack[1];
          stack[1] = '';
          afterCalc = false;
          operator = op.value as string;
        }else if(stack[0] !== '' && stack[1] !== '' && afterCalc === true){
          operator = op.value as string;
          stack[0] = stack[1];
          stack[1] = '';
          afterCalc = false;
        }
      });
    });

    //=をクリックした時に演算子によって計算を行う
    equal.addEventListener('click', () => {
      calc();
    });
  
    //CEをクリックした時にスタックの1番目を初期化
    clearEntry.addEventListener('click', () => {
      stack[1] = '0';
      display.textContent = stack[1];
    });
    
    //Cをクリックした時にスタックを初期化
    clear.addEventListener('click', () => {
      stack[0] = '';
      stack[1] = '0';
      operator = '';
      display.textContent = stack[1];
    });

    //±をクリックした時に符号を反転
    plusMinus.addEventListener('click', () => {
      stack[1] = (Number(stack[1]) * -1).toString();
      display.textContent = stack[1];
    });

    //平方根をクリックした時に平方根を入力
    squareRoot.addEventListener('click', () => {
      if(stack[1].includes('-')){
        display.textContent = 'error';
        stack[0] = '';
        stack[1] = '0';
        return;
      }
      const ans = Math.sqrt(Number(stack[1])).toString();
      stack[1] = ans.slice(0, 10);
      display.textContent = stack[1];
      afterCalc = true;
    });

    //パーセントをクリックした時にパーセントを入力
    persent.addEventListener('click', () => {
      if(operator === '*' || operator === '/'){
        stack[1] = (Number(stack[1]) / 100).toString();
        console.log(`stack[1]: ${stack[1]} stack[0]: ${stack[0]} operator: ${operator}`);
        calc();
      }else if(operator === '+' || operator === '-'){
        stack[1] = (Number(stack[0]) * Number(stack[1]) / 100).toString();
        calc();
      }else{
        return;
      }
    });

  }
}
