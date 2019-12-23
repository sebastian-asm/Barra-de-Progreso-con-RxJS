import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit() {
    const barra = document.getElementById('barra-progreso');

    // Proceso RxJS
    const scroll$ = fromEvent<Event>(document, 'scroll').pipe(
      map(this.calcularPorcentaje),
      tap(console.log)
    );

    scroll$.subscribe(porciento => {
      barra.style.width = `${porciento}%`;
    });
  }

  calcularPorcentaje(e: any) {
    // Destructuración del objecto (evento) recibido
    const {
      scrollTop,
      scrollHeight,
      clientHeight
    } = e.target.documentElement;

    return (scrollTop / (scrollHeight - clientHeight)) * 100;
  }

}
