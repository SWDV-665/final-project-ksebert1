import { Injectable } from '@angular/core';
import { PetsService } from './pets.service';
import { SqliteStorageService } from './sqlite-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AppStartupService {

  constructor(
    private storageService: SqliteStorageService,
    private petsService: PetsService,
    private sqliteStorage : SqliteStorageService
  ) { }

  async doStartUpTasks(){
    const db = await this.sqliteStorage.initStorage();
    if (db) {
      console.log('database created');
      await this.sqliteStorage.database.executeSql(
        `CREATE TABLE IF NOT EXISTS pets
        (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, species TEXT, birthday DATE, breed TEXT, color TEXT, description TEXT, adopted DATE, gender INTEGER, altered INTEGER default 0, microchpped INTEGER default 0, archived INTEGER default 0, photo TEXT `,[]
      );

    } else{
      console.log('database not created')
    }
    this.petsService.initPets()
 }
}
   
 export function startupServiceFactory(
   startupService: AppStartupService
   ): Function{
      return () => {
       return startupService.doStartUpTasks();
     }
   }
 




 

