import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private baseURL = 'https://api.openweathermap.org/data/2.5'
  private apiKey = '5a4b2d457ecbef9eb2a71e480b947604'

  constructor(private httpClient: HttpClient) { }

  public getForecast(zipCode: string, countryCode: string): Observable<WeatherData> {
    const params = {
      appid: this.apiKey,
      zip: `${zipCode},${countryCode.toLowerCase()}`,
      units: 'metric'
    }

    return this.httpClient.get(`${this.baseURL}/weather`, { params }).pipe(
      map((data: any) => {
        return data as WeatherData
      })
    )
  }

  public getFullForecast(zipCode: string, countryCode: string): Observable<WeatherFullData> {
    const params = {
      appid: this.apiKey,
      zip: `${zipCode},${countryCode.toLowerCase()}`,
      units: 'metric',
      cnt: 5
    }

    return this.httpClient.get(`${this.baseURL}/forecast/daily`, { params }).pipe(
      map((data: any) => {
        return {
          ...data,
          list: data.list.map((l: any) => {
            const date = new Date(l.dt * 1000)
            const formattedDate = date.toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'short',
              day: 'numeric',
            })

            return {
              ...l,
              formattedDate: formattedDate
            }
          })
        } as WeatherFullData
      })
    )
  }
}

export interface WeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  rain: {
    '1h': number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface WeatherFullData {
  city: {
    id: number;
    name: string;
    coord: {
      lon: number;
      lat: number;
    };
    country: string;
    population: number;
    timezone: number;
  };
  cod: string;
  message: number;
  cnt: number;
  list: {
    formattedDate: string
    dt: number;
    sunrise: number;
    sunset: number;
    temp: {
      day: number;
      min: number;
      max: number;
      night: number;
      eve: number;
      morn: number;
    };
    feels_like: {
      day: number;
      night: number;
      eve: number;
      morn: number;
    };
    pressure: number;
    humidity: number;
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
    speed: number;
    deg: number;
    gust: number;
    clouds: number;
    pop: number;
    rain?: number;
  }[];
}