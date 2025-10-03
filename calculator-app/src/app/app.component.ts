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


    const stack: string[] = ['', '0'];
    let operator: string | null = null;
    display.textContent = stack[0];
    function clearDisplay(){
      display.textContent = '';
    }

    //数字をクリックした時に表示される数字を追加
      buttons.forEach((btn: HTMLButtonElement) => {
        btn.addEventListener('click', () => {
          if(operator !== null){       //演算子が入力されている場合
            if(stack[1] === '0'){       //ディスプレイが0の時は消してから数字を入力
              stack[1] = '';
            }
            stack[1] += btn.value as string;
            console.log(`stack[1]: ${stack[1]}`);
            display.textContent = stack[1];
          }else{                      //演算子が入力されていない場合
            if(stack[1] === '0'){
              stack[1] = '';
            }
            stack[1] += btn.value as string;
            console.log(`stack[1]: ${stack[1]}`);
            display.textContent = stack[1];
          }
        });
      });

    //演算子をクリックした時に変数operatorに演算子を代入
    operators.forEach((op: HTMLButtonElement) => {
      op.addEventListener('click', () => {
        if(stack[0] === ''){
          operator = op.value as string;
          console.log(`operator: ${operator}`);
          stack[0] = stack[1];
          stack[1] = '';
        }else{
          calc();
          operator = op.value as string;
          console.log(`operator: ${operator}`);
          stack[0] = stack[1];
          stack[1] = '';
        }
      });
    });

    //演算子によって計算を行う関数
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
          stack[1] = (Number(stack[0]) / Number(stack[1])).toString();
          display.textContent = stack[1];
          break;
      }
    }

    //=をクリックした時に演算子によって計算を行う
    equal.addEventListener('click', () => {
      calc();
    });
  

    clearEntry.addEventListener('click', () => {
      stack[1] = '0';
      display.textContent = stack[1];
    });
    
    clear.addEventListener('click', () => {
      stack[0] = '';
      stack[1] = '0';
      display.textContent = stack[1];
    });



  }
}
