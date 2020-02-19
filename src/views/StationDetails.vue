<template>
	<div class="stationDetails">
		<header>
			<div class="station-select">
				<!-- <div>
					<select>
						<option value="Italy" selected>Select country</option>
					</select>
					<select>
						<option value="Umbria">Select region</option>
					</select>
				</div>-->

				<select @change="changeStation">
					<option disabled>Select station</option>
					<option
						v-for="s in stations"
						:key="s.id"
						:value="s.id"
						:selected="s.id == station.id"
					>{{ s.name }}</option>
				</select>
			</div>
			<div>
				<button class="btn btn-primary" @click="goToEdit()">
					<i class="fas fa-pencil-alt left-icon"></i>
					Edit station
				</button>
			</div>
		</header>
		<section v-if="station" class="daily-measure-section">
			<card v-if="stationId" title="ID" :main-information="station.name"></card>
			<card
				v-if="lastMeasure.dateCreated"
				title="Last Update"
				:main-information="lastMeasure.dateCreated | dateformat('hh:mm')"
				:below="lastMeasure.dateCreated | dateformat('DD MMM YYYY')"
			></card>
			<card
				v-if="checkProperty('weatherType')"
				title="Weather Condition"
				:main-information="false"
				:weatherIcon="lastMeasure.weatherType | weatherConditionIcon"
			></card>
			<card
				v-if="checkProperty('windDirection')"
				title="Wind Direction"
				:main-information="lastMeasure.windDirection"
				icon="fab fa-telegram-plane"
			></card>
			<card
				v-if="checkProperty('solarRadiation')"
				title="Solar Radiation"
				:main-information="lastMeasure.solarRadiation"
				unit="w/m2"
			></card>
			<card
				v-if="checkProperty('temperature')"
				title="Temperature"
				:main-information="lastMeasure.temperature"
				unit="°C"
			></card>
			<card
				v-if="checkProperty('precipitation')"
				title="Precipitation"
				:main-information="lastMeasure.precipitation"
				unit="mm"
			></card>
			<card
				v-if="checkProperty('relativeHumidity')"
				title="Relaty Humidity"
				:main-information="lastMeasure.relativeHumidity"
				unit="%"
				minRelativeHumidity
			></card>
			<card
				v-if="checkProperty('windSpeed')"
				title="Wind Speed"
				:main-information="lastMeasure.windSpeed"
				unit="km/h"
			></card>
			<card
				v-if="checkProperty('atmosphericPressure')"
				title="Atmoshperic Pressure"
				:main-information="lastMeasure.atmosphericPressure"
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
						:main-information="false"
						:min="measure.minTemperature"
						:max="measure.maxTemperature"
						unit="°C"
					></card>
				</template>
			</div>
			<select v-model="timeSelectedIntedval" class="station-select">
				<option v-for="(v, k) in timeIntervals" :key="k" :value="v">{{ v }}</option>
			</select>
		</section>
		<section class="charts">
			<div class="card precipitation" v-if="checkProperty('precipitation')">
				<precipitations-chart :precipitations="precipitations"></precipitations-chart>
			</div>
			<div class="card temperature" v-if="checkProperty('temperature')">
				<temperatures-chart :temperatures="temperatures"></temperatures-chart>
			</div>
			<div class="card pressure" v-if="checkProperty('atmosphericPressure')">
				<pressures-chart :pressures="pressures"></pressures-chart>
			</div>
			<div class="card humidity" v-if="checkProperty('relativeHumidity')">
				<humidity-chart :humidity="humidity"></humidity-chart>
			</div>
			<!-- <div class="card windspeed"></div> -->
		</section>
	</div>
</template>
<script src="./StationDetails.ts" lang="ts"/>