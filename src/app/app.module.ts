import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { HomeComponent } from './pages/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { WeatherDetailsComponent } from './pages/weather-details/weather-details.component';
import { WeatherDetailsMultipleComponent } from './pages/weather-details-multiple/weather-details-multiple.component';
import { WeatherService } from './services/weather.service';

@NgModule({
  imports:      [ BrowserModule, FormsModule, AppRoutingModule, FormsModule, HttpClientModule, ReactiveFormsModule  ],
  declarations: [ AppComponent, HelloComponent, HomeComponent, WeatherDetailsComponent, WeatherDetailsMultipleComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [ WeatherService ]
})
export class AppModule { }
