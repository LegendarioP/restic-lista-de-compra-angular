import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ShoppingListComponent } from "./shop-list/shop-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ShoppingListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'shop-list';
}
