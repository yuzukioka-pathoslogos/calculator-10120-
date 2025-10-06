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

    //基本的に式の左辺がstack[0]、右辺がstack[1]、連続計算対応のための一時保管場所としてstack[2]を用意
    const stack: string[] = ['', '0', ''];
    let afterCalc: boolean = false;
    display.textContent = stack[1];
    // 最後に押した演算子を格納
    let operator: string = '';
    //計算を行う関数
    const calc = function(){
      //演算子の後に＝を押した場合の処理
      if(stack[0] !== '' && stack[1] === '' && operator !== ''){
        switch(operator){
          case '+':
            stack[1] = stack[0];
            display.textContent = stack[1];
            afterCalc = true;
            break;
          case '-':
            //連続計算対応のための処理
            stack[2] = stack[0];
            stack[1] = (Number(stack[0]) * -1).toFixed(13).toString();
            //符号が-の場合は11桁まで、+の場合は10桁までを表示
            if(stack[1].includes('-')){
              stack[1] = stack[1].slice(0, 11);
            }else{
              stack[1] = stack[1].slice(0, 10);
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
            afterCalc = true;
            break;
          case '*':
            stack[1] = (Number(stack[0]) ** 2).toFixed(13).toString();
            //符号が-の場合は11桁まで、+の場合は10桁までを表示
            if(stack[1].includes('-')){
              stack[1] = stack[1].slice(0, 11);
            }else{
              stack[1] = stack[1].slice(0, 10);
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
            //表示できないほど小さい数の場合は0を表示
            if(Number(stack[1]) < 10 ** -8 && Number(stack[1]) > -(10 ** -8)){
              stack[1] = '0';
            }
            //表示できないほど大きい数の場合はeを表示
            if(Number(stack[1]) >= 10 ** 10 || Number(stack[1]) <= -(10 ** 10)){
              display.textContent = `e${stack[1]}`;
              stack[0] = '';
              stack[1] = '0';
              return;
            }
            display.textContent = stack[1];
            afterCalc = true;
            break;
          case '/':
            //0で割られた場合の処理
            if(Number(stack[0]) === 0){
              display.textContent = 'error';
              stack[0] = '';
              stack[1] = '0';
              return;
            }
            //連続計算対応のための処理
            stack[2] = stack[0];
            stack[1] = (1 / Number(stack[0])).toFixed(13).toString();
             //符号が-の場合は11桁まで、+の場合は10桁までを表示
             if(stack[1].includes('-')){
              stack[1] = stack[1].slice(0, 11);
            }else{
              stack[1] = stack[1].slice(0, 10);
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
            //表示できないほど小さい数の場合は0を表示
            if(Number(stack[1]) < 10 ** -8 && Number(stack[1]) > -(10 ** -8)){
              stack[1] = '0';
            }
            //表示できないほど大きい数の場合はeを表示
            if(Number(stack[1]) >= 10 ** 10 || Number(stack[1]) <= -(10 ** 10)){
              display.textContent = `e${stack[1]}`;
              stack[0] = '';
              stack[1] = '0';
              return;
            }
            display.textContent = stack[1];
            afterCalc = true;
            break;
          default:
            return;
        }
        return;
      }
      if(stack[0] !== '' && stack[1] !== '' && operator !== ''){
        switch(operator){
          case '+':
            stack[2] = stack[1];
            //浮動小数点誤差と指数表記を回避
            const sum = (Number(stack[0]) + Number(stack[1])).toFixed(13).toString();
            //符号が-の場合は11桁まで、+の場合は10桁までを表示
            if(sum.includes('-')){
              stack[1] = sum.slice(0, 11);
            }else{
              stack[1] = sum.slice(0, 10);
            }
            //連続計算対応のための処理
            if(afterCalc === false){
              stack[0] = stack[2];
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
            //表示できないほど小さい数の場合は0を表示
            if(Number(sum) < 10 ** -8 && Number(sum) > -(10 ** -8)){
              stack[1] = '0';
            }
            display.textContent = stack[1];
            //表示できないほど大きい数の場合はeを表示
            if(Number(sum) >= 10 ** 10 || Number(sum) <= -(10 ** 10)){
              display.textContent = `e${stack[1]}`;
              stack[0] = '';
              stack[1] = '0';
              return;
            }
            afterCalc = true;
            break;
          case '-':
            //連続計算対応のための処理
            if(afterCalc === true){
              stack[0] = stack[1];
              stack[1] = stack[2];
            }else{
              stack[2] = stack[1];
            }
            const diff = (Number(stack[0]) - Number(stack[1])).toFixed(13).toString();
            //符号が-の場合は11桁まで、+の場合は10桁までを表示
            if(diff.includes('-')){
              stack[1] = diff.slice(0, 11);
            }else{
              stack[1] = diff.slice(0, 10);
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
            //表示できないほど小さい数の場合は0を表示
            if(Number(diff) < 10 ** -8 && Number(diff) > -(10 ** -8)){
              stack[1] = '0';
            }
            display.textContent = stack[1];
            //表示できないほど大きい数の場合はeを表示
            if(Number(diff) >= 10 ** 10 || Number(diff) <= -(10 ** 10)){
              display.textContent = `e${stack[1]}`;
              stack[0] = '';
              stack[1] = '0';
              return;
            }
            afterCalc = true;
            break;
          case '*':
            //浮動小数点誤差と指数表記を回避
            const prod = (Number(stack[0]) * Number(stack[1])).toFixed(13).toString();
            //符号が-の場合は11桁まで、+の場合は10桁までを表示
            if(prod.includes('-')){
              stack[1] = prod.slice(0, 11);
            }else{
              stack[1] = prod.slice(0, 10);
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
            //表示できないほど小さい数の場合は0を表示
            if(Number(prod) < 10 ** -8 && Number(prod) > -(10 ** -8)){
              stack[1] = '0';
            }
            display.textContent = stack[1];
            //表示できないほど大きい数の場合はeを表示
            if(Number(prod) >= 10 ** 10 || Number(prod) <= -(10 ** 10)){
              display.textContent = `e${stack[1]}`;
              stack[0] = '';
              stack[1] = '0';
              return;
            }
            afterCalc = true;
            break;
          case '/':
            //連続計算対応のための処理
            if(afterCalc === true){
              stack[0] = stack[1];
              stack[1] = stack[2];
            }else{
              stack[2] = stack[1];
            } 
            //0で割られた場合の処理
            if(Number(stack[1]) === 0){
              display.textContent = 'error';
              stack[0] = '';
              stack[1] = '0';
              return;
            }
            //浮動小数点誤差と指数表記を回避
            const quot = (Number(stack[0]) / Number(stack[1])).toFixed(13).toString();
            //符号が-の場合は11桁まで、+の場合は10桁までを表示
            if(quot.includes('-')){
              stack[1] = quot.slice(0, 11);
            }else{
              stack[1] = quot.slice(0, 10);
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
            //表示できないほど小さい数の場合は0を表示
            if(Number(quot) < 10 ** -8 && Number(quot) > -(10 ** -8)){
              stack[1] = '0';
            }
            display.textContent = stack[1];
            //表示できないほど大きい数の場合はeを表示
            if(Number(quot) >= 10 ** 10 || Number(quot) <= -(10 ** 10)){
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
    }

    //数字をクリックした時に表示される数字を追加
    buttons.forEach((btn: HTMLButtonElement) => {
      btn.addEventListener('click', () => {
        if(operator !== ''){            //演算子が入力されている場合
          //calc後の数値入力を初期化
          if(afterCalc === true){
            stack[0] = '';
            stack[1] = '';
            stack[2] = '';
            operator = '';
            afterCalc = false;
          }
          if(stack[1] === '0' && !stack[1].includes('.')){         //ディスプレイが0の時は消してから数字を入力、小数点が入力されている場合は消さない
            stack[1] = '';
          }
          if(stack[1] !=null && stack[1].length === 10 && stack[1].includes('-') === false){
            return;
          }else if(stack[1] !=null && stack[1].length === 11 && stack[1].includes('-') === true){
            return;
          }
          stack[1] += btn.value as string;
          display.textContent = stack[1];
        }else{                          //演算子が入力されていない場合
          //calc後の数値入力を初期化
          if(afterCalc === true){
            stack[0] = '';
            stack[1] = '';
            stack[2] = '';
            operator = '';
            afterCalc = false;
          }
          if(stack[1] === '0' && !stack[1].includes('.')){
            stack[1] = '';
          }
          if(stack[1] !=null && stack[1].length === 10 && stack[1].includes('-') === false){
            return;
          }else if(stack[1] !=null && stack[1].length === 11 && stack[1].includes('-') === true){
            return;
          }
          stack[1] += btn.value as string;
          display.textContent = stack[1];
        }
      });
    });

    //小数点をクリックした時に小数点を入力
    dot.addEventListener('click', () => {
      //calc後の数値入力を初期化
      if(afterCalc === true){
        stack[0] = '';
        stack[1] = '';
        stack[2] = '';
        operator = '';
        afterCalc = false;
      }
      if(stack[1] === ''){
        stack[1] = '0';
      }
      if(stack[1] !== '' && stack[1].length === 10){
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
        }else if(stack[0] !== '' && stack[1] === ''){     //演算子の入力を訂正したいとき
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
    if(afterCalc === true){
      return;
    }else if(afterCalc === false){
        stack[1] = '0';
        display.textContent = stack[1];
      }
    });
    
    //Cをクリックした時にスタックを初期化
    clear.addEventListener('click', () => {
      stack[0] = '';
      stack[1] = '0';
      stack[2] = '';
      operator = '';
      display.textContent = stack[1];
    });

    //±をクリックした時に符号を反転
    plusMinus.addEventListener('click', () => {
      stack[1] = (Number(stack[1]) * -1).toFixed(13).toString();
      //小数点以下の末尾の0を削除
      for(let i = 0; i < 13; i++){
        if(stack[1].includes('.') && stack[1].endsWith('0')){
          stack[1] = stack[1].slice(0, -1);
        }
        if(stack[1].endsWith('.')){
          stack[1] = stack[1].slice(0, -1);
          break;
        }
      }
      display.textContent = stack[1];
    });

    //平方根をクリックした時に平方根を入力
    squareRoot.addEventListener('click', () => {
      if(stack[1].includes('-')){
        display.textContent = 'error';
        stack[0] = '';
        stack[1] = '0';
        stack[2] = '';
        operator = '';
        return;
      }
      const ans = Math.sqrt(Number(stack[1])).toString();
      stack[1] = ans.slice(0, 10);
      display.textContent = stack[1];
      afterCalc = true;
    });

    //パーセントをクリックした時にパーセントを入力
    persent.addEventListener('click', () => {
      if(afterCalc === true){
        return;
      }
      if(operator === '*' || operator === '/'){
        stack[1] = (Number(stack[1]) / 100).toString();
        calc();
      }else if(operator === '+'){
        stack[1] = (Number(stack[0]) * Number(stack[1]) / 100).toString();
        const stack0: string = stack[0];
        calc();
        stack[0] = stack0;      //連続計算を見本の電卓の仕様に合わせる
      }else if(operator === '-'){
        stack[1] = (Number(stack[0]) * Number(stack[1]) / 100).toString();
        calc();
        stack[2] = stack[0];    //連続計算を見本の電卓の仕様に合わせる
      }else{
        return;
      }
    });
  }
}
