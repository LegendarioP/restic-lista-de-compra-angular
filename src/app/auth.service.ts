import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { gapi } from 'gapi-script';


interface User {
  id: string,
  nome: string,
  email: string
}

interface ShoppingItem {
  id: string;
  title: string;
  userId: string;
  purchased: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private clientId = 'GOOGLE_TOKEN_ID';
  private apiKey = 'GOOGLE_APIKEY';

  // BehaviorSubject para armazenar e emitir o estado de autenticação
  private authStatus = new BehaviorSubject<boolean>(this.isAuthenticated());
  authStatus$ = this.authStatus.asObservable();

  constructor() {}

  initClient(): Promise<void> {
    return new Promise((resolve, reject) => {
      gapi.load('client:auth2', () => {
        gapi.client
          .init({
            apiKey: this.apiKey,
            clientId: this.clientId,
            scope: 'email',
            discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/oauth2/v2/rest'],
          })
          .then(() => {
            resolve();
          })
          .catch((err: any) => {
            reject(err);
          });
      });
    });
  }

  authenticate(): Promise<void> {
    return new Promise((resolve, reject) => {
      gapi.auth2
        .getAuthInstance()
        .signIn()
        .then((user: any) => {
          const profile = user.getBasicProfile();
          const email = profile.getEmail();
          const userId = profile.getId();
          let isAuthenticated = false

          localStorage.setItem('userEmail', email);
          localStorage.setItem('userId', userId);
          this.authStatus.next(true);



          fetch('http://localhost:3000/users').then((response) => {
            if (!response.ok) {
              throw new Error('Erro ao encontrar usuario');
            }
            return response.json();
          })
          .then((data) => {
            if(data.find((item: User) => item.id == userId)){
              isAuthenticated = true
              resolve();
            }
          })

          if(!isAuthenticated){
            console.log("entrou aqui")


            fetch('http://localhost:3000/users', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email, id: userId }),
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error('Erro ao cadastrar usuário');
                }
                return response.json();
              })
              .then(() => {
                resolve();
              })
              .catch((err) => {
                reject(err);
              });

          }
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }

  signOut(): Promise<void> {
    return gapi.auth2
      .getAuthInstance()
      .signOut()
      .then(() => {
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userId');
        this.authStatus.next(false);
        window.location.reload();
      });
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('userEmail');
  }

  fetchShoppingList(userId: string): Promise<ShoppingItem[]> {
    return fetch(`http://localhost:3000/shopping-list?userId=${userId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao buscar a lista de compras');
        }
        return response.json();
      })
      .then(data => {
        return data
      });
  }
}