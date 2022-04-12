import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../environments/environment"

@Injectable({
	providedIn: "root",
})
export class GeneralService {
	constructor(private http: HttpClient) { }

	/**
	 *  Get Name of city
	 * @param citiesName 
	 * @returns 
	 */
	getCities(citiesName: string) {
		return this.http.get(
			`${environment.city_data_url}?q=${citiesName}&limit=1&appid=${environment.weather_app_id}`
		);
	}


	/**
	 * Get weather informations
	 * @param lat int 
	 * @param lon int
	 * @param exclude str Daily/Hourly 
	 * @returns 
	 */
	getWhether(lat: any, lon: any, exclude: string = 'daily') {
		return this.http.get(
			`${environment.weather_api}?lat=${lat}&lon=${lon}&exclude=current,minutely,${exclude},alerts&appid=${environment.weather_app_id}`
		);
	}
}
