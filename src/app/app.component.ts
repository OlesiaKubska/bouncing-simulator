import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BouncySimulatorComponent } from './bouncy-simulator/bouncy-simulator.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BouncySimulatorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'bouncy-simulator-project';
}
