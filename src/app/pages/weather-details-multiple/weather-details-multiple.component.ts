import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WeatherFullData } from '../../services/weather.service';

@Component({
  selector: 'app-weather-details-multiple',
  templateUrl: './weather-details-multiple.component.html'
})
export class WeatherDetailsMultipleComponent implements OnInit {

  @Input() weatherDataFull: WeatherFullData = {} as WeatherFullData
  @Input() zipCode: string = ''

  @Output() close = new EventEmitter<void>()
  @Output() openFullForecast = new EventEmitter<void>()

  constructor() { }

  ngOnInit(): void {
  }

  public callClose(): void {
    this.close.emit()
  }

  public getIcon(weather: string): string {
    switch (weather) {
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
}
