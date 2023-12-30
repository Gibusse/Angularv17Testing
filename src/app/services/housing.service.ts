import { Injectable } from '@angular/core';
import { Housinglocation } from '../models/housinglocation';

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  readonly baseUrl = 'https://angular.dev/assets/tutorials/common';
  readonly externalApiUrl = 'http://localhost:4000/locations';

  public async getAllHousingLocations(): Promise<Housinglocation[]> {
    const data = await fetch(this.externalApiUrl);
    return (await data.json()) ?? [];
  }

  public async getHousingLocationById(id: number): Promise<Housinglocation | undefined> {
    const data = await fetch(`${this.externalApiUrl}/${id}`)
    return (await data.json()) ?? {};
  }

  public submitApplication (firstName: string, lastName: string, email: string) {
    console.log(`
      Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}
    `)
  }
}
