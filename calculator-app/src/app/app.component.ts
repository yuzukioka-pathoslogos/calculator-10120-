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
  display = '0';
  number = (num: string) => {};
  operator = (op: string) => {};
  clear = () => {};
  clearEntry = () => {};
  dot = () => {};
  plusMinus = () => {};
  sqrt = () => {};
  percent = () => {};
  equal = () => {};


  //コンポーネントのテンプレートが読み込まれた後に実行されるメソッド
  ngAfterViewInit(): void {

    //基本的に式の左辺がstack[0]、右辺がstack[1]、連続計算対応のための一時保管場所としてstack[2]を用意
    const stack: string[] = ['', '', ''];
    let afterCalc: boolean = false;
    let afterSqrt: boolean = false;
    let error: boolean = false;
    const self = this;
    self.display = '0';
    // 最後に押した演算子を格納
    let operator: string = '';
    //計算を行う関数
    const calc = () => {
      //エラーが発生している場合は計算を行わない
      if(error === true){
        return;
      }
      //左辺のみの例外処理
      if(stack[0] !== '' && stack[1] === '' && stack[2] === '' 
        && operator !== '' && afterCalc === false){
        switch(operator){
          case '+':
            //連続計算対応のための処理
            stack[2] = stack[0];
            stack[1] = stack[0];
            break;
          case '-':
            //連続計算対応のための処理
            stack[2] = stack[0];
            //浮動小数点誤差と指数表記を回避、13桁で丸めることで計算への影響を小さくする
            stack[1] = Number((Number(stack[0]) * -1).toPrecision(13)).toFixed(13);
            break;
          case '*':
            //連続計算対応のための処理
            stack[2] = stack[0];
            //浮動小数点誤差と指数表記を回避
            stack[1] = Number((Number(stack[0]) ** 2).toPrecision(13)).toFixed(13);
            break;
          case '/':
            //連続計算対応のための処理
            stack[2] = stack[0];
            //0で割られた場合の処理
            if(Number(stack[0]) === 0){
              self.display = 'error';
              error = true;
              return;
            }
            //浮動小数点誤差と指数表記を回避
            stack[1] = Number((1 / Number(stack[0])).toPrecision(13)).toFixed(13);        
            break;
          default:
            return;
        }
      }
      //基本的な計算の処理
      else if(stack[0] !== '' && stack[1] !== '' && operator !== '' 
      && afterCalc === false){
        switch(operator){
          case '+':
            //連続計算対応のための処理
            stack[2] = stack[1];
            //浮動小数点誤差と指数表記を回避
            stack[1] = Number((Number(stack[0]) + Number(stack[1])).toPrecision(13)).toFixed(13);
            break;
          case '-':
            //連続計算対応のための処理
            stack[2] = stack[1];
            //浮動小数点誤差と指数表記を回避
            stack[1] = Number((Number(stack[0]) - Number(stack[1])).toPrecision(13)).toFixed(13);
            break;
          case '*':
            //連続計算対応のための処理
            stack[2] = stack[0];
            //浮動小数点誤差と指数表記を回避
            stack[1] = Number((Number(stack[0]) * Number(stack[1])).toPrecision(13)).toFixed(13);
            break;
          case '/':
            //連続計算対応のための処理
            stack[2] = stack[1];
            //0で割られた場合の処理
            if(Number(stack[1]) === 0){
              self.display = 'error';
              error = true;
              return;
            }
            //浮動小数点誤差と指数表記を回避
            stack[1] = Number((Number(stack[0]) / Number(stack[1])).toPrecision(13)).toFixed(13);
            break;
          default:
            return;
        }
      }
      //連続計算対応のための処理
      else if(stack[0] !== '' && stack[1] !== '' && stack[2] !== '' && operator !== ''){
        switch(operator){
          case '+':
            //浮動小数点誤差と指数表記を回避
            stack[1] = Number((Number(stack[1]) + Number(stack[2])).toPrecision(13)).toFixed(13);
            break;
          case '-':
            //浮動小数点誤差と指数表記を回避
            stack[1] = Number((Number(stack[1]) - Number(stack[2])).toPrecision(13)).toFixed(13);
            break;
          case '*':
            //浮動小数点誤差と指数表記を回避
            stack[1] = Number((Number(stack[1]) * Number(stack[2])).toPrecision(13)).toFixed(13);
            break;
          case '/':
            //0で割られた場合の処理
            if(Number(stack[2]) === 0){
              self.display = 'error';
              error = true;
              return;
            }
            //浮動小数点誤差と指数表記を回避
            stack[1] = Number((Number(stack[1]) / Number(stack[2])).toPrecision(13)).toFixed(13);
            break;
          default:
            return;
        }
      }
      //stack[0]が空の場合の例外処理
      else if(stack[0] === '' && stack[1] !== '' && stack[2] !== '' && operator !== ''){
        switch(operator){
          case '+':
            stack[0] = stack[1];
            stack[1] = Number((Number(stack[1]) + Number(stack[2])).toPrecision(13)).toFixed(13);
            stack[2] = stack[0];
            break;
          case '-':
            stack[0] = stack[1];
            stack[1] = Number((Number(stack[2]) - Number(stack[1])).toPrecision(13)).toFixed(13);
            stack[2] = stack[0];
            break;
          case '*':
            stack[1] = Number((Number(stack[1]) * Number(stack[2])).toPrecision(13)).toFixed(13);
            break;
          case '/':
            stack[0] = stack[1];
            if(Number(stack[2]) === 0){
              self.display = 'error';
              error = true;
              return;
            }
            stack[1] = Number((Number(stack[2]) / Number(stack[1])).toPrecision(13)).toFixed(13);
            stack[2] = stack[0];
            break;
          default:
            return;
        }
      }
      //stack[1]が空かつsqrt後の場合の例外処理
      else if(stack[0] !== '' && stack[1] === '' && stack[2] !== '' && operator !== '' && afterCalc === false && afterSqrt === true){
        switch(operator){
          case '+':
            //浮動小数点誤差と指数表記を回避
            stack[1] = Number((Number(stack[0]) + Number(stack[2])).toPrecision(13)).toFixed(13);
            //連続計算対応のための処理
            stack[2] = stack[0];
            break;
          case '-':
            //浮動小数点誤差と指数表記を回避
            stack[1] = Number((Number(stack[2]) - Number(stack[0])).toPrecision(13)).toFixed(13);
            //連続計算対応のための処理
            stack[2] = stack[0];
            break;
          case '*':
            //浮動小数点誤差と指数表記を回避
            stack[1] = Number((Number(stack[0]) * Number(stack[2])).toPrecision(13)).toFixed(13);
            break;
          case '/':
            //0で割られた場合の処理
            if(Number(stack[0]) === 0){
              self.display = 'error';
              error = true;
              return;
            }
            //浮動小数点誤差と指数表記を回避
            stack[1] = Number((Number(stack[2]) / Number(stack[0])).toPrecision(13)).toFixed(13);
            //連続計算対応のための処理
            stack[2] = stack[0];
            break;
          default:
            return;
        }
      }
      //calc後に演算子を入力してすぐにcalcを行う場合の例外処理
      else if(stack[0] !== '' && stack[1] === '' && stack[2] !== '' 
        && operator !== '' && afterCalc === false){
        switch(operator){
          case '+':
            //浮動小数点誤差と指数表記を回避
            stack[1] = Number((Number(stack[0]) + Number(stack[2])).toPrecision(13)).toFixed(13);
            //連続計算対応のための処理
            stack[2] = stack[0];
            break;
          case '-':
            //浮動小数点誤差と指数表記を回避
            stack[1] = Number((Number(stack[2]) - Number(stack[0])).toPrecision(13)).toFixed(13);
            //連続計算対応のための処理
            stack[2] = stack[0];
            break;
          case '*':
            //浮動小数点誤差と指数表記を回避
            stack[1] = Number((Number(stack[0]) ** 2).toPrecision(13)).toFixed(13);
            //連続計算対応のための処理
            stack[2] = stack[0];
            break;
          case '/':
            //0で割られた場合の処理
            if(Number(stack[0]) === 0){
              self.display = 'error';
              error = true;
              return;
            }
            //浮動小数点誤差と指数表記を回避
            stack[1] = Number((1 / Number(stack[0])).toPrecision(13)).toFixed(13);
            //連続計算対応のための処理
            stack[2] = stack[0];
            break;
          default:
            return;
        }
      }
      //表示できないほど大きい数の場合はeを表示
      if(Number(stack[1]) >= 10 ** 10 || Number(stack[1]) <= -(10 ** 10)){
        //符号が-の場合は11桁まで、+の場合は10桁までを表示
        if(stack[1].includes('-')){
          stack[1] = stack[1].slice(0, 11);
        }else{
          stack[1] = stack[1].slice(0, 10);
        }
        self.display = `e${stack[1]}`;
        error = true;
        return;
      }
      //表示できないほど小さい数の場合は0を表示
      if(Number(stack[1]) < 10 ** -8 && Number(stack[1]) > -(10 ** -8)){
        stack[1] = '0';
      }
      //符号が-の場合は11桁まで、+の場合は10桁までを表示
      if(stack[1].includes('-')){
        stack[1] = stack[1].slice(0, 11);
      }else{
        stack[1] = stack[1].slice(0, 10);
      }
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
      self.display = stack[1];
      afterCalc = true;
    }

    //数字をクリックした時に表示される数字を追加
    self.number = (num: string) => {
        //エラーが発生している場合入力を受け付けない
        if(error === true){
          return;
        }
        //calc後の数値入力を初期化
        if(afterCalc === true){
          stack[0] = '';
          stack[1] = '0';
          afterCalc = false;
        }
        //sqrt後の数値入力を初期化ただし、stack[0]とstack[2]のどちらも空になるのは避ける
        if(afterSqrt === true){
          if(stack[2] !== ''){
            stack[0] = '';
          }
          stack[1] = '0';
          afterSqrt = false;
        }
        //ディスプレイが0の時は消してから数字を入力、小数点が入力されている場合は消さない
        if(stack[1] === '0' && !stack[1].includes('.')){         
          stack[1] = '';
        }
        //10桁（-を含めて11桁）までしか入力できないようにする
        if(stack[1] !=null && stack[1].length === 10 && stack[1].includes('-') === false){
          return;
        }else if(stack[1] !=null && stack[1].length === 11 && stack[1].includes('-') === true){
          return;
        }
        stack[1] += num as string;
        self.display = stack[1];
      
        console.log(`stack[0]: ${stack[0]} stack[1]: ${stack[1]} stack[2]: ${stack[2]} 
          operator: ${operator} afterCalc: ${afterCalc} error: ${error} afterSqrt: ${afterSqrt}`);
      };

    //小数点をクリックした時に小数点を入力
    self.dot = () => {
      //エラーが発生している場合入力を受け付けない
      if(error === true){
        return;
      }
      //calc後の数値入力を初期化
      if(afterCalc === true){
        stack[0] = '';
        stack[1] = '0';
        afterCalc = false;
      }
      if(afterSqrt === true){
        if(stack[2] !== ''){
          stack[0] = '';
        }
        stack[1] = '0';
        afterSqrt = false;
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
      self.display = stack[1];
      }
      console.log(`stack[0]: ${stack[0]} stack[1]: ${stack[1]} stack[2]: ${stack[2]} 
        operator: ${operator} afterCalc: ${afterCalc} error: ${error} afterSqrt: ${afterSqrt}`);
    };

    //演算子の処理
    self.operator = (op: string) => {
        //エラーが発生している場合入力を受け付けない
        if(error === true){
          return;
        }
        if(stack[0] === ''){
          operator = op as string;
          stack[0] = stack[1];
          stack[1] = '';
          afterCalc = false;
          afterSqrt = false;
        }else if(stack[0] !== '' && stack[1] === ''){     //演算子の入力を訂正したいとき
          operator = op as string;
        }else if(stack[0] !== '' && stack[1] !== '' && afterCalc === false){
          //stack[2]が残っていると連続計算になってしまうため初期化
          stack[2] = '';
          calc();
          stack[0] = stack[1];
          stack[1] = '';
          stack[2] = '';
          afterCalc = false;
          afterSqrt = false;
          operator = op as string;
        }else if(stack[0] !== '' && stack[1] !== '' && afterCalc === false && afterSqrt === true){
          operator = op as string;
          stack[0] = stack[1];
          stack[1] = '';
          afterSqrt = false;
        }else if(stack[0] !== '' && stack[1] !== '' && afterCalc === true){
          operator = op as string;
          stack[0] = stack[1];
          stack[1] = '';
          afterCalc = false;
          afterSqrt = false;
        }
        console.log(`stack[0]: ${stack[0]} stack[1]: ${stack[1]} stack[2]: ${stack[2]} 
          operator: ${operator} afterCalc: ${afterCalc} error: ${error} afterSqrt: ${afterSqrt}`);
      };

    //=をクリックした時の処理
    self.equal = () => {
      //エラーが発生している場合入力を受け付けない
      if(error === true){
        return;
      }
      calc();
      console.log(`stack[0]: ${stack[0]} stack[1]: ${stack[1]} stack[2]: ${stack[2]} 
        operator: ${operator} afterCalc: ${afterCalc} error: ${error} afterSqrt: ${afterSqrt}`);
    };
  
    //CEをクリックした時にスタックの1番目を初期化
    self.clearEntry = () => {
      //エラーが発生している場合入力を受け付けない
      if(error === true){
        return;
      }
      if(afterCalc === true && afterSqrt === false){
        return;
      }else{
        if(stack[1] !== ''){
          stack[1] = '0';
          self.display = stack[1];
        }
      }
      console.log(`stack[0]: ${stack[0]} stack[1]: ${stack[1]} stack[2]: ${stack[2]} 
        operator: ${operator} afterCalc: ${afterCalc} error: ${error} afterSqrt: ${afterSqrt}`);
    };
    
    //Cをクリックした時にスタックを初期化
    self.clear = () => {
      stack[0] = '';
      stack[1] = '0';
      stack[2] = '';
      operator = '';
      afterCalc = false;
      afterSqrt = false;
      error = false;
      self.display = stack[1];
      console.log(`stack[0]: ${stack[0]} stack[1]: ${stack[1]} stack[2]: ${stack[2]} 
        operator: ${operator} afterCalc: ${afterCalc} error: ${error} afterSqrt: ${afterSqrt}`);
    };

    //±をクリックした時に符号を反転
    self.plusMinus = () => {
      //エラーが発生している場合入力を受け付けない
      if(error === true){
        return;
      }
      if(stack[1] !== ''){
        stack[1] = Number((Number(stack[1]) * -1).toPrecision(13)).toFixed(13);
        //小数点以下の末尾の0と小数点を削除
        for(let i = 0; i < 13; i++){
          if(stack[1].includes('.') && stack[1].endsWith('0')){
            stack[1] = stack[1].slice(0, -1);
          }
          if(stack[1].endsWith('.')){
            stack[1] = stack[1].slice(0, -1);
            break;
          }
        }
        self.display = stack[1];
      }else if(stack[0] !== '' && stack[1] === ''){       //演算子が入力されている場合
        stack[0] = Number((Number(stack[0]) * -1).toPrecision(13)).toFixed(13);
        //小数点以下の末尾の0を削除
        for(let i = 0; i < 13; i++){
          if(stack[0].includes('.') && stack[0].endsWith('0')){
            stack[0] = stack[0].slice(0, -1);
          }
          if(stack[0].endsWith('.')){
            stack[0] = stack[0].slice(0, -1);
            break;
          }
        }
        self.display = stack[0];
      }
      console.log(`stack[0]: ${stack[0]} stack[1]: ${stack[1]} stack[2]: ${stack[2]} 
        operator: ${operator} afterCalc: ${afterCalc} error: ${error} afterSqrt: ${afterSqrt}`);
    };

    //平方根をクリックした時の処理
    self.sqrt = () => {
      //エラーが発生している場合入力を受け付けない
      if(error === true){
        return;
      }
      if(stack[1] !== ''){
        if(stack[1].includes('-')){
          self.display = 'error';
          error = true;
          return;
        }
        //浮動小数点誤差と指数表記を回避
        stack[1] = Number(Math.sqrt(Number(stack[1])).toPrecision(13)).toFixed(13);
        stack[1] = stack[1].slice(0, 10);
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
        self.display = stack[1];
        afterSqrt = true;
      }else if(stack[0] !== '' && stack[1] === ''){
        if(stack[0].includes('-')){
          self.display = 'error';
          error = true;
          return;
        }
        stack[2] = stack[0]
        //浮動小数点誤差と指数表記を回避
        stack[0] = Number(Math.sqrt(Number(stack[0])).toPrecision(13)).toFixed(13);
        stack[0] = stack[0].slice(0, 10);
        //小数点以下の末尾の0を削除
        for(let i = 0; i < 13; i++){
          if(stack[0].includes('.') && stack[0].endsWith('0')){
            stack[0] = stack[0].slice(0, -1);
          }
          if(stack[0].endsWith('.')){
            stack[0] = stack[0].slice(0, -1);
            break;
          }
        }
        self.display = stack[0];
        afterSqrt = true;
      }
      console.log(`stack[0]: ${stack[0]} stack[1]: ${stack[1]} stack[2]: ${stack[2]} 
        operator: ${operator} afterCalc: ${afterCalc} error: ${error} afterSqrt: ${afterSqrt}`);
    };

    //パーセントをクリックした時の処理
    self.percent = () => {
      //エラーが発生している場合入力を受け付けない
      if(error === true){
        return;
      }
      if(stack[1] !== ''){
        if(afterCalc === false){
          if(stack[0] === ''){
            stack[1] = '0';
            self.display = stack[1];
            return;
          }
          switch(operator){
            case '+':
              stack[1] = Number((Number(stack[0]) * Number(stack[1]) / 100).toPrecision(13)).toFixed(13);
              calc();
              stack[2] = stack[0];       //連続計算を見本の電卓の仕様に合わせる
              break;
            case '-':
              const stackMinus = stack[0];
              stack[1] = Number((Number(stack[0]) * Number(stack[1]) / 100).toPrecision(13)).toFixed(13);
              calc();
              stack[2] = stackMinus;     //連続計算を見本の電卓の仕様に合わせる
              break;
            case '*':
              stack[1] = Number((Number(stack[1]) / 100).toPrecision(13)).toFixed(13);
              calc();
              break;
            case '/':
              const stackDivide1 = stack[1];
              stack[1] = Number((Number(stack[1]) / 100).toPrecision(13)).toFixed(13);
              calc();
              stack[2] = stackDivide1;     //連続計算を見本の電卓の仕様に合わせる
              break;
            default:
            return;
          }
        }else if(afterCalc === true){
          switch(operator){
            case '*':
              stack[1] = Number((Number(stack[1]) / 100).toPrecision(13)).toString();
              calc();
              break;
            case '/':
              const stackDivide2 = stack[2];
              stack[2] = Number((Number(stack[2]) / 100).toPrecision(13)).toFixed(13);
              calc();
              stack[2] = stackDivide2;     //連続計算を見本の電卓の仕様に合わせる
              break;
            default:
              //=を押した後だと入力を無視する
              return;
          }
        }
      }else{        //stack[1]が空の場合の例外処理
        if(stack[2] === ''){
          switch(operator){
            case '+':
              stack[1] = "";
              stack[2] = stack[0];
              break;
            case '-':
              stack[1] = "";
              stack[2] = stack[0];
              break;
            case '*':
              calc();
              //浮動小数点誤差と指数表記を回避
              stack[1] = Number((Number(stack[1]) / 100).toPrecision(13)).toFixed(13);
              stack[1] = stack[1].slice(0, 10);
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
              self.display = stack[1];
              break;
            case '/':
              calc();
              //浮動小数点誤差と指数表記を回避
              stack[1] = Number((Number(stack[1]) * 100).toPrecision(13)).toFixed(13);
              stack[1] = stack[1].slice(0, 10);
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
              self.display = stack[1];
              break;
          }
        }else if(stack[2] !== ''){
          stack[1] = stack[0];
          stack[0] = stack[2];
          stack[2] = '';
          switch(operator){
            case '+':
              stack[1] = Number((Number(stack[0]) * Number(stack[1]) / 100).toPrecision(13)).toFixed(13);
              calc();
              stack[2] = stack[0];       //連続計算を見本の電卓の仕様に合わせる
              break;
            case '-':
              const stackMinus = stack[0];
              stack[1] = Number((Number(stack[0]) * Number(stack[1]) / 100).toPrecision(13)).toFixed(13);
              calc();
              stack[2] = stackMinus;     //連続計算を見本の電卓の仕様に合わせる
              break;
            case '*':
              stack[1] = Number((Number(stack[1]) / 100).toPrecision(13)).toFixed(13);
              calc();
              break;
            case '/':
              const stackDivide1 = stack[1];
              stack[1] = Number((Number(stack[1]) / 100).toPrecision(13)).toFixed(13);
              calc();
              stack[2] = stackDivide1;     //連続計算を見本の電卓の仕様に合わせる
              break;
            default:
            return;
          }
        }
      }
      console.log(`stack[0]: ${stack[0]} stack[1]: ${stack[1]} stack[2]: ${stack[2]} 
        operator: ${operator} afterCalc: ${afterCalc} error: ${error} afterSqrt: ${afterSqrt}`);
    };
  }
}
