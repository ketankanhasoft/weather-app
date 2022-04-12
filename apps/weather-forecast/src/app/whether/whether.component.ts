import { select } from "@angular-redux/store";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormControl } from "@angular/forms";
import { map, Observable } from "rxjs";
import { UsersActions } from "../actions/users.actions";
import moment from "moment";

@Component({
	selector: "bp-whether",
	templateUrl: "./whether.component.html",
	styleUrls: ["./whether.component.css"],
	encapsulation: ViewEncapsulation.None,
})
export class WhetherComponent implements OnInit {
	latitude: any;
	longitude: any;
	@select() users: Observable<any> | undefined;
	cities: any;
	searchCity = new FormControl();
	selectMode = new FormControl("Hourly");
	options: string[] = ["One", "Two", "Three"];
	filteredOptions!: Observable<string[]>;
	hourlyData: any;
	dailyData: any;
	cityName: any;
	hourlyArray: any = { cityName: "", data: [] };
	dailyArray: any = {
		cityName: "",
		data: [],
	};

	constructor(public actions: UsersActions) { }

	ngOnInit(): void {
		this.users?.subscribe((res) => {
			if (res.cities) {
				let cityArr: any = [];
				res.cities.forEach((element: any) => {
					cityArr.push(element.cities);
				});
				this.cities = [].concat.apply([], cityArr);
			}

			this.hourlyData = res.hourly ? res.hourly.hourly : [];
			this.dailyData = res.daily ? res.daily.daily : [];

			if (this.hourlyData.length > 0) {
				let nextHoursDta = this.hourlyData.filter(
					(x: any) => x.dt > moment().unix()
				);
				let getHourlyForecast: any = [];
				let columsHours = [];
				for (let index = 0; index < nextHoursDta.length; index++) {
					if (index % 3 == 0 && getHourlyForecast.length < 8) {
						getHourlyForecast.push(nextHoursDta[index]);
						columsHours.push(moment.unix(nextHoursDta[index].dt).format("H"));
					}
				}

				let hourly = getHourlyForecast.map(function (element: any) {
					return {
						time: moment.unix(element.dt).format("HH:mm"),
						temp: (element.temp - 273.15).toFixed(2),
					};
				});
				this.hourlyArray = {
					cityName: this.searchCity.value,
					data: hourly,
				};
			}

			if (this.dailyData.length > 0) {
				let daily = this.dailyData.map(function (element: any) {
					return {
						days: moment.unix(element.dt).format("dddd"),
						temp: (element.temp.day - 273.15).toFixed(2),
					};
				});
				this.dailyArray = {
					cityName: this.searchCity.value,
					data: daily,
				};
			}
		});

		this.filteredOptions = this.searchCity.valueChanges.pipe(
			map((value) => this._filter(value))
		);
	}

	getDetails() {
		if (this.searchCity.value && this.selectMode?.value) {
			this.actions.getUsers(this.searchCity.value, this.selectMode?.value);
		}
	}
	private _filter(value: string): string[] {
		const filterValue = value.toLowerCase();

		return this.cities?.filter((option: string) =>
			option.toLowerCase().includes(filterValue)
		);
	}
}
