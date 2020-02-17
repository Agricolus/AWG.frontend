<template>
	<div class="stationDetails">
		<header>
			<div class="station-select">
				<div>
					<select>
						<option value="Italy" selected>Select country</option>
					</select>
					<select>
						<option value="Umbria">Select region</option>
					</select>
				</div>

				<select @change="changeStation">
					<option value="Stazione">Select station</option>
					<option
						v-for="s in stations"
						:key="s.id"
						:value="s.id"
						:selected="s.id == station.id"
					>{{ s.name }}</option>
				</select>
			</div>
		</header>
		<section v-if="lastMeasure && dailyMeasure && station" class="daily-measure-section">
			<card v-if="stationId" title="ID" :mainInformation="stationId"></card>
			<card
				v-if="lastMeasure.dateCreated"
				title="Last Update"
				:mainInformation="lastMeasure.dateCreated | dateformat('hh:mm')"
			></card>
			<card
				v-if="lastMeasure.weatherType"
				title="Weather Condition"
				:weatherIcon="lastMeasure.weatherType| weatherConditionIcon"
			></card>
			<card
				v-if="lastMeasure.windDirection"
				title="Wind Direction"
				:mainInformation="lastMeasure.windDirection"
				icon="fab fa-telegram-plane"
			></card>
			<card
				v-if="lastMeasure.solarRadiation"
				title="Solar Radiation"
				:mainInformation="lastMeasure.solarRadiation"
				unit="w/m2"
			></card>

			<card
				v-if="lastMeasure.temperature"
				title="Temperature"
				:mainInformation="lastMeasure.temperature"
				unit="°C"
				:min="dailyMeasure.minTemperature"
				:max="dailyMeasure.maxTemperature"
			></card>
			<card
				v-if="lastMeasure.precipitation"
				title="Precipitation"
				:mainInformation="lastMeasure.precipitation"
				unit="mm"
			></card>
			<card
				v-if="lastMeasure.relativeHumidity"
				title="Relaty Humidity"
				:mainInformation="lastMeasure.relativeHumidity"
				unit="%"
				minRelativeHumidity
				:min="dailyMeasure.minRelativeHumidity"
				:max="dailyMeasure.maxRelativeHumidity"
			></card>
			<card
				v-if="lastMeasure.windSpeed"
				title="Wind Speed"
				:mainInformation="lastMeasure.windSpeed"
				unit="km/h"
				:min="dailyMeasure.minWindSpeed"
				:max="dailyMeasure.maxWindSpeed"
			></card>
			<card
				v-if="lastMeasure.atmosphericPressure"
				title="Atmoshperic Pressure"
				:mainInformation="lastMeasure.atmosphericPressure"
				unit="atm"
			></card>
		</section>
		<section class="map-container" v-if="station && stations">
			<l-map
				class="map"
				:zoom="zoom"
				:min-zoom="minZoom"
				:max-zoom="maxZoom"
				:center="station.location.coordinates"
			>
				<l-tile-layer :url="url"></l-tile-layer>
				<template v-for="s in stations">
					<l-marker :key="s.id" v-if="s.id != station.id" :lat-lng="s.location.coordinates" :icon="icon">
						<l-popup class="custom-popup">
							<strong>{{ s.name }}</strong>
							<small>{{ s.description }}</small>
						</l-popup>
					</l-marker>
				</template>
				<l-marker
					v-if="station.id"
					:lat-lng="station.location.coordinates"
					:icon="highlighticon"
					@ready="openPopup"
				>
					<l-popup class="custom-popup">
						<strong>{{ station.name }}</strong>
						<small>{{ station.description }}</small>
					</l-popup>
				</l-marker>
			</l-map>
		</section>

		<hr />
		<section class="daily-summary-section">
			<label>Weather Details</label>
			<div class="daily-summary-cards">
				<template v-for="measure in cardValues">
					<card
						class="card-daily-summary"
						:weatherIcon="measure.condition | weatherConditionIcon"
						:key="measure.id"
						:title="measure.date | dateformat(measure.dateformat)"
						:min="measure.minTemperature"
						:max="measure.maxTemperature"
						unit="°C"
					></card>
				</template>
			</div>
			<select v-model="timeSelectedIntedval" class="station-select">
				<option
					v-for="(interval, k) in timeIntervals"
					:key="interval"
					:value="interval"
					selected
				>{{ k }}</option>
			</select>
		</section>
		<section class="charts">
			<div class="card precipitation" v-if="precipitations">
				<precipitations-chart :precipitations="precipitations"></precipitations-chart>
			</div>
			<div class="card temperature" v-if="temperatures">
				<temperatures-chart :temperatures="temperatures"></temperatures-chart>
			</div>
			<div class="card pressure" v-if="pressures">
				<pressures-chart :pressures="pressures"></pressures-chart>
			</div>
			<div class="card humidity" v-if="humidity">
				<humidity-chart :humidity="humidity"></humidity-chart>
			</div>
			<!-- <div class="card windspeed"></div> -->
		</section>
	</div>
</template>
<script src="./StationDetails.ts" lang="ts"/>