import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ShoppingListComponent } from './shop-list/shop-list.component';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common'; // Importa o CommonModule

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ShoppingListComponent, CommonModule], // Adiciona CommonModule aqui
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'shop-list';
  isLoggedIn = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.initClient().then(() => {
      console.log('gapi client initialized');
    }).catch(err => {
      console.error('Error initializing gapi client', err);
    });

    // Atualiza o estado de login com base no `authStatus$`
    this.authService.authStatus$.subscribe(isAuthenticated => {
      this.isLoggedIn = isAuthenticated;
    });
  }

  login() {
    this.authService.authenticate().then(() => {
      console.log('Usuário autenticado e registrado.');
    }).catch((err: any) => {
      console.error('Erro na autenticação', err);
    });
  }

  logout() {
    this.authService.signOut().then(() => {
      console.log('Usuário desconectado.');
    }).catch((err: any) => {
      console.error('Erro ao desconectar', err);
    });
  }
}