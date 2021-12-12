import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage-angular';


@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {
  private _storage: Storage | null = null;
  
  constructor(private storage: Storage){ 
      this.init();
    }

    async init() {
      console.log("I'm in local-storage init")
      // If using, define drivers here: await this.storage.defineDriver(/*...*/);
      const storage = await this.storage.create();
      console.log("Storage is: ", storage);
      this._storage = storage;
    }
  
    // Create and expose methods that users of this service can
    // call, for example:
    public set(key: string, value: any) {
      this._storage?.set(key, value);
    }

    async getAll(itemType: string): Promise<any>{
      const data = await this.storage.get(itemType);
      const items = JSON.parse(data || '[]');
      return items;
    }
  
    async create(itemType: string, keys: Array<string>, values: Array<any>): Promise<any>{
      const data = await this.storage.get(itemType);
      const items = JSON.parse(data || '[]');
      const obj: any = {};
      obj.id = new Date().getTime(); //sets a unique value for the pet id
      keys.map((key, index) => {
        obj[key] = values[index];
      });
      console.log("my item: ", JSON.stringify(obj));
      items.push(obj);
      await this.storage.set(itemType, JSON.stringify(items));
      return {
        ...obj,
        insertID: obj.id
      }
    }
  
  
    async getById(itemType: string, id: number): Promise<any> {
      const data = await this.storage.get(itemType);
      const items = JSON.parse(data || '[]');
      const item = items.find((it) => {
       return it.id === id;
      });
      return item;
  
      }
  
      async update(itemType: string, id: number, keys: Array<string>, values: Array<any>): Promise<any>{
        const data = await this.storage.get(itemType);
        const items = JSON.parse(data || '[]');
        const itemIndex = items.findIndex((item) => {
          return item.id === id;
      });
      keys.map((key, ind) => {
        items[itemIndex][key] =  values[ind];
      });
      this.storage.set(itemType, JSON.stringify(items));
      return items[itemIndex];
    
    }


  }




 





  

