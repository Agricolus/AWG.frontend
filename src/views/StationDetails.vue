<template>
	<div class="stationDetails">
		<header>
			<select>
				<option value="Italy" selected>Italy</option>
			</select>
			<select>
				<option value="Umbria">Umbria</option>
			</select>
			<select>
				<option value="Stazione">Stazione</option>
			</select>
		</header>
		<section v-if="lastMeasure && dailyMeasure">
			<card v-if="stationId" title="ID" :mainInformation="stationId"></card>
			<card
				v-if="lastMeasure.dateCreated"
				title="Last Update"
				:mainInformation="lastMeasure.dateCreated | dateformat('hh:mm')"
			></card>
			<card
				v-if="lastMeasure.weatherType"
				title="Weather Condition"
				:mainInformation="lastMeasure.weatherType"
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
			<l-map class="map" :zoom="zoom" :min-zoom="minZoom" :max-zoom="maxZoom" :center="center">
				<l-tile-layer :url="url"></l-tile-layer>
			</l-map>
		</section>
	</div>
</template>
<script src="./StationDetails.ts" lang="ts"/>