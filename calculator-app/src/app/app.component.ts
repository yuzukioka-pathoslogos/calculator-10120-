import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'calculator-app';
}

const display = document.querySelector('#display') as HTMLDivElement;
const buttons = document.querySelectorAll('.button') as NodeListOf<HTMLButtonElement>;
// const operators = document.querySelectorAll('.button-operator') as NodeListOf<HTMLButtonElement>
// const clear = document.querySelector('.button-clear') as HTMLButtonElement
// const equal = document.querySelector('.button-equal') as HTMLButtonElement
// const percent = document.querySelector('.button-percent') as HTMLButtonElement
// const sqrt = document.querySelector('.button-sqrt') as HTMLButtonElement
// const onc = document.querySelector('.button-on/c') as HTMLButtonElement
// const plusMinus = document.querySelector('.button-plus-minus') as HTMLButtonElement
// const dot = document.querySelector('.button-dot') as HTMLButtonElement

for (let i = 0; i < buttons.length; i++) {
  if(display.textContent !== null && buttons[i].textContent !== null){
    buttons[i].addEventListener('click', () => {
      display.textContent += buttons[i].textContent as string;
    });
  }else{
    console.log('display or buttons is null');
  }
}
