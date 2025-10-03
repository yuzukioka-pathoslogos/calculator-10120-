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

    //基本的に式の左辺がstack[0]、右辺がstack[1]
    const stack: string[] = ['', '0'];
    display.textContent = stack[1];
    // 最後に押した演算子を格納
    let operator: string | null = null;
    //計算を行う関数
    const calc = function(){
      switch(operator){
        case '+':
          stack[1] = (Number(stack[0]) + Number(stack[1])).toString();
          display.textContent = stack[1];
          break;
        case '-':
          stack[1] = (Number(stack[0]) - Number(stack[1])).toString();
          display.textContent = stack[1];
          break;
        case '*':
          stack[1] = (Number(stack[0]) * Number(stack[1])).toString();
          display.textContent = stack[1];
          break;
        case '/':
          if(Number(stack[1]) === 0){
            display.textContent = 'error';
            stack[0] = '';
            stack[1] = '0';
            return;
          }
          stack[1] = (Number(stack[0]) / Number(stack[1])).toString();
          display.textContent = stack[1];
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
          stack[1] += btn.value as string;
          display.textContent = stack[1];
        }else{                          //演算子が入力されていない場合
          if(stack[1] === '0'){
            stack[1] = '';
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
      if(stack[1].includes('.')){       //小数点がすでに入力されている場合は入力しない
        return;
      }else{                            //小数点が入力されていない場合は小数点を入力
      stack[1] += '.';
      display.textContent = stack[1];
      }
    });

    //演算子をクリックした時に変数operatorに演算子を代入
    operators.forEach((op: HTMLButtonElement) => {
      op.addEventListener('click', () => {
        if(stack[0] === ''){
          operator = op.value as string;
          stack[0] = stack[1];
          stack[1] = '';
        }else{
          calc();
          operator = op.value as string;
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
      operator = null;
      display.textContent = stack[1];
    });

    //±をクリックした時に符号を反転
    plusMinus.addEventListener('click', () => {
      stack[1] = (Number(stack[1]) * -1).toString();
      display.textContent = stack[1];
    });

    //平方根をクリックした時に平方根を入力
    squareRoot.addEventListener('click', () => {
      stack[1] = Math.sqrt(Number(stack[1])).toString();
      display.textContent = stack[1];
    });

    //パーセントをクリックした時にパーセントを入力
    persent.addEventListener('click', () => {
      if(operator === '*' || operator === '/'){
        stack[1] = (Number(stack[1]) / 100).toString();
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
