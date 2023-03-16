import { AppControllerService } from './app-controller.service';
import { map } from 'rxjs/operators';
import { BehaviorSubject, of } from 'rxjs';
import { Injectable } from '@angular/core';

type CharStorage = 's' | 'l';

/**
 * @author igor.silva
 * @description Serviço criado com objetivo de gerenciar o estado da aplicação (Storage) através de uma lista reativa.
 */
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private whichStorage!: CharStorage;
  private arrRef: Array<any> = [];
  private itemSources: Map<string, BehaviorSubject<string>> = new Map();
  protected get storage(): Storage {
    const literals = {
      s: sessionStorage,
      l: localStorage,
    };
    return literals[this.whichStorage];
  }

  constructor(private appController: AppControllerService) {
    addEventListener('storage', (event: StorageEvent) => {
      if (event.key) {
        if (this.itemSources.has(event.key)) {
          (this.itemSources as Map<string, any>)
            .get(event.key)
            .next(event.newValue);
        }
      }
    });
  }

  /**
   * @whichSt parametro que define qual storage será usado , session ou localstorage.
   * @description Esse método tem como finalidade definir qual storage será utilizado pra gerenciar o estado,
   * e a partir desse momento tudo será armazenado nesse storage, até que o parâmetro do outro storage seja setado
   * que deve seguir a mesma lógica.
   * @param whichSt define qual storage será utilizado. Ex: se passado o caractere 's', então será usado o sessionStorage,
   * e assim segue para o caractere 'l' que define o localStorage. Se nada passado, por padrão o serviço utiliza o localStorage.
   * @author igor.silva
   */
  bootStorageReference(whichSt?: CharStorage): void {
    this.whichStorage = whichSt ? whichSt : 'l';
    this.clear();
  }

  /**
   * @description Método que tem como finalidade buscar o dado no Storage pela chave passada.
   * @param key Parâmetro chave que define qual valor será buscado na lista do Storage.
   * @returns retorna um Observable com relação ao que foi buscado de acordo com a chave passada.
   */
  get(key: string = 'state'): any {
    const state: any = this.storage.getItem('state');
    if (key === 'state') {
      return of(state);
    }

    if (!this.itemSources.has(key)) {
      this.itemSources.set(key, new BehaviorSubject<string>(state[key]));
    }

    return (this.itemSources as any)
      .get(key)
      .asObservable()
      .pipe(
        map((data: any) =>
          data && data !== 'undefined' ? JSON.parse(data) : ''
        )
      );
  }

  /**
   * @description Método que tem como finalidade armazenar o dado no Storage pela chave e dados passados.
   * @param key Parâmetro chave que define qual valor será armazenado na lista do Storage.
   * @param value Dado que será armazenado na lista do Storage.
   * @returns void
   * @author igor.silva
   */
  store(key: string = 'state', value: any): void {
    try {
      const aux = {};
      const literals = {
        state: { ...value },
        default: (key: string, value: any) => {
          (aux as any)[key] = value;
          return aux;
        },
      } as any;

      const toStore = literals[key] || literals['default'](key, value);

      const ref: any = (JSON.parse(this.storage.getItem('state') as any) as Array<any>);

      if (ref?.length) {
        this.arrRef = [...ref];
      }

      this.arrRef.push({ ...toStore });
    } catch (error) {
      console.log('error: ', error);
    } finally {
      this.storage.setItem('state', JSON.stringify(this.arrRef));
    }
  }

  /**
   * @description Método que tem como finalidade limpar os dados do Storage.
   * @returns void
   * @author igor.silva
   */
  clear(): any {
    this.itemSources.forEach((itemSource: BehaviorSubject<string>) => {
      (itemSource as any).next(null);
      itemSource.complete();
    });

    this.itemSources.clear();
    return this.storage.clear();
  }

  removeEmpty(obj: any): any {
    return Object.entries(obj)
      .filter(([_, v]) => v != null)
      .reduce(
        (acc, [k, v]) => ({ ...acc, [k]: v === Object(v) ? this.removeEmpty(v) : v }),
        {}
      );
  }
}
