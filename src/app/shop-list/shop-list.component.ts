import { Component, NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';

interface ShoppingItem {
  name: string;
  purchased: boolean;
}

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule, MatIconModule],
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css']
})
export class ShoppingListComponent {
  newItem: string = '';
  items: ShoppingItem[] = [];

  addItem() {
    if (this.newItem.trim()) {
      this.items.push({ name: this.newItem, purchased: false });
      this.newItem = '';
    }
  }

  editItem(item: ShoppingItem) {
    const updatedName = prompt('Editar item:', item.name);
    if (updatedName !== null && updatedName.trim()) {
      item.name = updatedName;
    }
  }

  markAsPurchased(item: ShoppingItem) {
    item.purchased = !item.purchased;
  }

  removeItem(item: ShoppingItem) {
    this.items = this.items.filter(i => i !== item);
  }
  get unpurchasedItems() {
    return this.items.reverse().filter(item => !item.purchased);
  }

  get purchasedItems() {
    return this.items.reverse().filter(item => item.purchased);
  }


}
