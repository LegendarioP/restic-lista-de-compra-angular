import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../auth.service';
import { v4 as uuidv4 } from 'uuid'; 


interface ShoppingItem {
  id: string; 
  title: string;
  purchased: boolean;
}

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule, MatIconModule],
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  newItem: string = '';
  items: ShoppingItem[] = [];
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated();
    if (this.isAuthenticated) {
      const userId = localStorage.getItem('userId');
      if (userId) {
        this.authService.fetchShoppingList(userId).then(fetchedItems => {
          this.items = fetchedItems;
        }).catch(err => {
          console.error('Erro ao carregar a lista de compras', err);
        });
      }
    }
  }

  addItem() {
    if (this.newItem.trim()) {
      const newItem: ShoppingItem = { id: uuidv4() , title: this.newItem, purchased: false };
      this.items.push(newItem);
      this.newItem = '';

      const userId = localStorage.getItem('userId');
      if (userId) {
        fetch('http://localhost:3000/shopping-list', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...newItem, userId }), // Inclui o userId
        }).catch(err => {
          console.error('Erro ao adicionar o item no servidor', err);
        });
      }
    }
  }

  editItem(item: ShoppingItem) {
    const updatedName = prompt('Editar item:', item.title);
    if (updatedName !== null && updatedName.trim()) {
      item.title = updatedName;

      fetch(`http://localhost:3000/shopping-list/${item.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      }).catch(err => {
        console.error('Erro ao atualizar o item no servidor', err);
      });
    }
  }

  markAsPurchased(item: ShoppingItem) {
    item.purchased = !item.purchased;

    fetch(`http://localhost:3000/shopping-list/${item.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    }).catch(err => {
      console.error('Erro ao atualizar o status no servidor', err);
    });
  }

  removeItem(item: ShoppingItem) {
    this.items = this.items.filter(i => i !== item);

    fetch(`http://localhost:3000/shopping-list/${item.id}`, {
      method: 'DELETE',
    }).catch(err => {
      console.error('Erro ao remover o item do servidor', err);
    });
  }

  get unpurchasedItems() {
    return this.items.reverse().filter(item => !item.purchased);
  }

  get purchasedItems() {
    return this.items.reverse().filter(item => item.purchased);
  }
}