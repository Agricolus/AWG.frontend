<template>
	<div class="stationDetails">
		<header>
			<select>
				<option value="Italy" selected>Italy</option>
			</select>
			<select>
				<option value="Umbria">Umbria</option>
			</select>
			<select @change="changeStation">
				<option value="Stazione">Stazione</option>
				<option
					v-for="s in stations"
					:key="s.id"
					:value="s.id"
					:selected="s.id == station.id"
				>{{ s.name }}</option>
			</select>
		</header>
		<section v-if="lastMeasure && dailyMeasure && station">
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
		</section>
		<section class="map-container">
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
		<section class="daily-summary-section">
			<h3>Last seven days</h3>
			<template v-for="measure in dailyMeasures">
				<div :key="measure.id" class="daily-summary">
					<span class="date">{{ measure.date | dateformat("ddd DD") }}</span>
					<span class="icon">X</span>
					<span class="temperatures">
						<span class="temp-min">{{ measure.minTemperature }}</span>
						<span class="temp-max">{{ measure.maxTemperature }}</span>
					</span>
				</div>
			</template>
		</section>
	</div>
</template>
<script src="./StationDetails.ts" lang="ts"/>