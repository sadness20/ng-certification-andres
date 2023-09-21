import { Component, OnInit } from '@angular/core';
import { WeatherData, WeatherFullData, WeatherService } from '../../services/weather.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, take, tap } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  public selectedCode: string = ''
  public weatherData: WeatherData | undefined = undefined
  public weatherDataFull: WeatherFullData | undefined = undefined
  public error: string = ''
  public submitted: boolean = false
  public weatherForm: FormGroup
  public countries: Country[] = [
    { name: "Mexico", code: "MX" },
    { name: "United States", code: "US" },
    { name: "Canada", code: "CA" },
    { name: "Brazil", code: "BR" },
    { name: "United Kingdom", code: "GB" },
    { name: "Germany", code: "DE" },
    { name: "France", code: "FR" },
    { name: "China", code: "CN" },
    { name: "India", code: "IN" },
    { name: "Australia", code: "AU" }
  ];

  constructor(private weatherService: WeatherService, private fb: FormBuilder) {
    this.weatherForm = this.fb.group({
      zipcode: ['85010', Validators.required],
      countrycode: ['MX', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.error = ''
    this.submitted = true;

    if (this.weatherForm.valid) {
      const zipcode = this.weatherForm.get('zipcode')?.value
      const countrycode = this.weatherForm.get('countrycode')?.value

      this.weatherService.getForecast(zipcode, countrycode)
        .pipe(
          take(1),
          tap((res: WeatherData) => {
            this.weatherData = res
            this.weatherDataFull = undefined
            this.selectedCode = zipcode
          }),
          catchError((err: any) => {
            this.error = err.error.message
            return []
          })
        )
        .subscribe()
    }
  }

  public closeWeather(): void {
    this.weatherData = undefined
  }

  public closeFullWeather(): void {
    this.weatherDataFull = undefined
  }

  public openFullForecast(): void {
    this.error = ''
    this.submitted = true;

    if (this.weatherForm.valid) {
      const zipcode = this.weatherForm.get('zipcode')?.value
      const countrycode = this.weatherForm.get('countrycode')?.value

      this.weatherService.getFullForecast(zipcode, countrycode)
        .pipe(
          take(1),
          tap((res: WeatherFullData) => {
            this.weatherDataFull = res
            this.selectedCode = zipcode
          }),
          catchError((err: any) => {
            this.error = err.error.message
            return []
          })
        )
        .subscribe()
    }
  }
}

export interface Country {
  name: string
  code: string
}