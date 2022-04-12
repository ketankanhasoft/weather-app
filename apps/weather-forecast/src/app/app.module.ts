import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { MuiModule } from "angular-mui";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';


// import {FormControl,FormGroup} from '@angular/forms';

// import {FormsModule,ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from "./app.component";
import { WhetherComponent } from "./whether/whether.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { DevToolsExtension, NgRedux, NgReduxModule } from "@angular-redux/store";
import { IAppState, rootReducer } from "./store";
import { UsersActions } from "./actions/users.actions";
import { MatAutocompleteModule } from '@angular/material/autocomplete';
// 

@NgModule({
	declarations: [AppComponent, WhetherComponent],
	imports: [
		BrowserModule,
		MuiModule,
		BrowserAnimationsModule,
		MatButtonToggleModule,
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,
		MatTableModule,
		HttpClientModule,
		MatAutocompleteModule,

		ReactiveFormsModule,
		NgReduxModule
	],
	providers: [UsersActions],
	bootstrap: [AppComponent],
},
)
export class AppModule {

	constructor(
		private ngRedux: NgRedux<IAppState>,
		devTool: DevToolsExtension
	) {
		this.ngRedux.configureStore(
			rootReducer,
			{} as IAppState,
			[],
			[devTool.isEnabled() ? devTool.enhancer() : f => f]
		);

	}

}
