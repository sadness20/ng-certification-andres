import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WeatherData } from '../../services/weather.service';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html'
})
export class WeatherDetailsComponent implements OnInit {

  @Input() weatherData: WeatherData = {} as WeatherData
  @Input() zipCode: string = ''

  @Output() close = new EventEmitter<void>()
  @Output() openFullForecast = new EventEmitter<void>()

  constructor() { }

  ngOnInit(): void {
  }

  get weatherIconSrc(): string {
    const weatherMain = this.weatherData?.weather[0]?.main
    switch (weatherMain) {
      case 'Clear':
        return 'https://www.angulartraining.com/images/weather/sun.png'
      case 'Clouds':
        return 'https://www.angulartraining.com/images/weather/clouds.png'
      case 'Rain':
        return 'https://www.angulartraining.com/images/weather/rain.png'
      case 'Snow':
        return 'https://www.angulartraining.com/images/weather/snow.png'
      default:
        return 'https://www.pngall.com/wp-content/uploads/2/Question-Mark-PNG-HD-Image.png'
    }
  }

  public callClose(): void {
    this.close.emit()
  }

  public callOpenFullForecast(): void {
    this.openFullForecast.emit()
  }
}
