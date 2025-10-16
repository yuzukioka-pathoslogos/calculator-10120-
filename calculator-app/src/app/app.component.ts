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
    const stack: string[] = ['', '0', ''];
    let afterCalc: boolean = false;
    let afterSqrt: boolean = false;
    let error: boolean = false;
    const self = this;
    self.display = stack[1];
    // 最後に押した演算子を格納
    let operator: string = '';

    //小数点以下の末尾の0と小数点を削除する関数
    function removeTrailingZeros(num: string): string {
      if(num.includes('.')){
        num = num.replace(/0+$/, '');
        num = num.replace(/\.$/, '');
        if(num === ''){
          num = '0';
        }
      }
      return num;
    }

    //浮動小数点誤差と指数表記を回避するための関数（整数スケーリング＋文字列操作）
    function scaleCalc(a: string, b: string, op: string): string {
      //小数点以下の桁数を取得
      const aDecimals = (a.split('.')[1] || '').length;
      const bDecimals = (b.split('.')[1] || '').length;
      //小数点以下の桁数の最大値を取得
      const maxDecimals = Math.max(aDecimals, bDecimals);
      //文字列からBigintに変換し、桁数を調整
      const aScaled = BigInt(a.replace('.', '')) * BigInt(10 ** (maxDecimals - aDecimals));
      const bScaled = BigInt(b.replace('.', '')) * BigInt(10 ** (maxDecimals - bDecimals));
      switch(op){
        case '+':
          const sum = aScaled + bScaled;
          let sumString = sum.toString();
          //小数を含んでいた場合
          if(0 < maxDecimals){
            if(sumString.includes('-')){
              //符号を削除して置き、後から追加
              sumString = sumString.slice(1);
              //小数点以下の桁数の最大値を超えるまで0埋め
              while(sumString.length <= maxDecimals){
                sumString = '0' + sumString;
              }
              sumString = '-' + sumString;
            }else{
              while(sumString.length <= maxDecimals){
                sumString = '0' + sumString;
              }
            }
          }
            //整数部分と小数部分の間に小数点を追加
            sumString = sumString.slice(0, sumString.length - maxDecimals)
             + '.' + sumString.slice(sumString.length - maxDecimals);
          return sumString;
        case '-':
          const diff = aScaled - bScaled;
          let diffString = diff.toString();
          if(0 < maxDecimals){
            if(diffString.includes('-')){
              diffString = diffString.slice(1);
              while(diffString.length <= maxDecimals){
                diffString = '0' + diffString;
              }
              diffString = '-' + diffString;
            }else{
              while(diffString.length <= maxDecimals){
                diffString = '0' + diffString;
              }
            }
          }
            diffString = diffString.slice(0, diffString.length - maxDecimals)
             + '.' + diffString.slice(diffString.length - maxDecimals);
          return diffString;
        case '*':
          const product = aScaled * bScaled;
          let productString = product.toString();
          if(0 < maxDecimals){
            if(productString.includes('-')){
              productString = productString.slice(1);
              while(productString.length <= maxDecimals * 2){
                productString = '0' + productString;
              }
              productString = '-' + productString;
            }else{
              while(productString.length <= maxDecimals * 2){
                productString = '0' + productString;
              }
            }
          }
            productString = productString.slice(0, productString.length - maxDecimals * 2)
             + '.' + productString.slice(productString.length - maxDecimals * 2);
          return productString;
        case '/':
          const quotient = aScaled * BigInt(10 ** 10) / bScaled;
          let quotientString = quotient.toString();
          if(quotientString.includes('-')){
            quotientString = quotientString.slice(1);
            while(quotientString.length <= 10){
              quotientString = '0' + quotientString;
            }
            quotientString = '-' + quotientString;
          }else{
            while(quotientString.length <= 10){
              quotientString = '0' + quotientString;
            }
          }
          quotientString = quotientString.slice(0, quotientString.length - 10)
           + '.' + quotientString.slice(quotientString.length - 10);
          return quotientString;
        default:
          return '';
      }
    }

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
            stack[1] = scaleCalc(stack[0], '-1', '*');
            break;
          case '*':
            //連続計算対応のための処理
            stack[2] = stack[0];
            stack[1] = scaleCalc(stack[0], stack[0], '*');
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
            stack[1] = scaleCalc('1', stack[0], '/');        
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
            stack[1] = scaleCalc(stack[0], stack[1], '+');
            break;
          case '-':
            //連続計算対応のための処理
            stack[2] = stack[1];
            stack[1] = scaleCalc(stack[0], stack[1], '-');
            break;
          case '*':
            //連続計算対応のための処理
            stack[2] = stack[0];
            stack[1] = scaleCalc(stack[0], stack[1], '*');
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
            stack[1] = scaleCalc(stack[0], stack[1], '/');
            break;
          default:
            return;
        }
      }
      //連続計算対応のための処理
      else if(stack[0] === '' && stack[1] !== '' && stack[2] !== '' && operator !== ''){
        switch(operator){
          case '+':
            stack[1] = scaleCalc(stack[1], stack[2], '+');
            break;
          case '-':
            stack[1] = scaleCalc(stack[1], stack[2], '-');
            break;
          case '*':
            stack[1] = scaleCalc(stack[1], stack[2], '*');
            break;
          case '/':
            //0で割られた場合の処理
            if(Number(stack[2]) === 0){
              self.display = 'error';
              error = true;
              return;
            }
            stack[1] = scaleCalc(stack[1], stack[2], '/');
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
            stack[1] = scaleCalc(stack[0], stack[2], '+');
            //連続計算対応のための処理
            stack[2] = stack[0];
            break;
            case '-':
            stack[1] = scaleCalc(stack[2], stack[0], '-');
            //連続計算対応のための処理
            stack[2] = stack[0];
            break;
          case '*':
            stack[1] = scaleCalc(stack[0], stack[0], '*');
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
            stack[1] = scaleCalc('1', stack[0], '/');
            //連続計算対応のための処理
            stack[2] = stack[0];
            break;
          default:
            return;
        }
      }
    //ここから下は計算結果であるstack[1]の処理

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
      stack[1] = removeTrailingZeros(stack[1]);
      self.display = stack[1];
      stack[0] = '';
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
          stack[1] = '0';
          afterCalc = false;
        }
        //sqrt後の数値入力を初期化。ただし、stack[2]が値を持つ場合はstack[0]に代入しておく
        if(afterSqrt === true){
          if(stack[2] !== ''){
            stack[0] = stack[2];
            stack[2] = '';
          }
          stack[1] = '0';
          afterSqrt = false;
        }
        //ディスプレイが0の時は消してから数字を入力、小数点が入力されている場合は消さない
        if(stack[1] === '0' || stack[1] === '-0'){         
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
        stack[1] = '0';
        afterCalc = false;
      }
      if(afterSqrt === true){
        if(stack[2] !== ''){
          stack[0] = stack[2];
          stack[2] = '';
        }
        stack[1] = '0';
        afterSqrt = false;
      }
      //ディスプレイが0の時は消してから数字を入力、小数点が入力されている場合は消さない
      if(stack[1] === '0' || stack[1] === '-0'){         
        stack[1] = '';
      }
      //stack[1]が空の場合は0を入力
      if(stack[1] === ''){
        stack[1] = '0';
      }
      //10桁（-を含めて11桁）までしか入力できないようにする
      if(stack[1] !=null && stack[1].length === 10 && stack[1].includes('-') === false){
        return;
      }else if(stack[1] !=null && stack[1].length === 11 && stack[1].includes('-') === true){
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
        //-が入力されていない場合は-を追加、入力されている場合は-を削除
        if(stack[1].includes('-') === false){
          stack[1] = '-' + stack[1];
        }else{
          stack[1] = stack[1].slice(1);
        }
        self.display = stack[1];
      }else if(stack[0] !== '' && stack[1] === ''){
        //-が入力されていない場合は-を追加、入力されている場合は-を削除
        if(stack[0].includes('-') === false){
          stack[0] = '-' + stack[0];
        }else{
          stack[0] = stack[0].slice(1);
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
        //整数スケーリングしておくことで安全性を確保
        stack[1] = Math.sqrt(Number(stack[1]) * (10 ** 8)).toString();
        stack[1] = scaleCalc(stack[1], '10000', '/');
        stack[1] = stack[1].slice(0, 10);
        //小数点以下の末尾の0を削除
        stack[1] = removeTrailingZeros(stack[1]);
        self.display = stack[1];
        afterSqrt = true;
      }
      //演算子→√の順で入力した場合の例外処理
      else if(stack[0] !== '' && stack[1] === ''){
        if(stack[0].includes('-')){
          self.display = 'error';
          error = true;
          return;
        }
        //整数スケーリングしておくことで安全性を確保
        stack[1] = Math.sqrt(Number(stack[0]) * (10 ** 8)).toString();
        stack[1] = scaleCalc(stack[1], '10000', '/');
        stack[1] = stack[1].slice(0, 10);
        //小数点以下の末尾の0を削除
        stack[1] = removeTrailingZeros(stack[1]);
        self.display = stack[1];
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
      //演算子→√→％の順で入力した場合の例外処理
      if(afterSqrt === true && stack[0] !== '' && stack[1] === '' && stack[2] !== ''){
        stack[1] = stack[0];
        stack[0] = stack[2];
        stack[2] = '';
        afterSqrt = false;
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
              const stackPlus = stack[0];       //連続計算を見本の電卓の仕様に合わせる
              stack[1] = scaleCalc(stack[0], stack[1], '*');
              stack[1] = scaleCalc(stack[1], '100', '/');
              calc();
              stack[2] = stackPlus;
              break;
            case '-':
              const stackMinus = stack[0];     //連続計算を見本の電卓の仕様に合わせる
              stack[1] = scaleCalc(stack[0], stack[1], '*');
              stack[1] = scaleCalc(stack[1], '100', '/');
              calc();
              stack[2] = stackMinus;
              break;
            case '*':
              stack[1] = scaleCalc(stack[1], '100', '/');
              calc();
              break;
            case '/':
              const stackDivide = stack[1];
              stack[1] = scaleCalc(stack[1], '100', '/');
              calc();
              stack[2] = stackDivide;     //連続計算を見本の電卓の仕様に合わせる
              break;
            default:
            return;
          }
        }else if(afterCalc === true){
          switch(operator){
            case '*':
              stack[1] = scaleCalc(stack[1], '100', '/');
              calc();
              break;
            case '/':
              const stackDivide2 = stack[2];
              stack[2] = scaleCalc(stack[2], '100', '/');
              calc();
              stack[2] = stackDivide2;     //連続計算を見本の電卓の仕様に合わせる
              break;
            default:
              //=を押した後だと入力を無視する
              return;
          }
        }
      }else{        //stack[1]が空の場合の例外処理(演算子→％の順で入力した場合)
          switch(operator){
            case '*':
              calc();
              stack[1] = scaleCalc(stack[1], '100', '/');
              stack[1] = stack[1].slice(0, 10);
              //小数点以下の末尾の0を削除
              stack[1] = removeTrailingZeros(stack[1]);
              self.display = stack[1];
              break;
            case '/':
              calc();
              stack[1] = scaleCalc(stack[1], '100', '*');
              stack[1] = stack[1].slice(0, 10);
              //小数点以下の末尾の0を削除
              stack[1] = removeTrailingZeros(stack[1]);
              self.display = stack[1];
              break;
          }
      }
      console.log(`stack[0]: ${stack[0]} stack[1]: ${stack[1]} stack[2]: ${stack[2]} 
        operator: ${operator} afterCalc: ${afterCalc} error: ${error} afterSqrt: ${afterSqrt}`);
    };
  }
}
