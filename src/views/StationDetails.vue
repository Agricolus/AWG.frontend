<template>
	<div class="stationDetails" v-if="station">
		<header>
			<select @change="changeStation">
				<option
					v-for="s in stations"
					:key="s.id"
					:value="s.id"
					:selected="s.id == station.id"
				>{{ s.name }}</option>
			</select>
			<div class="header-buttons">
				<button class="btn btn-primary" @click="downloadCSV()">
					<i class="fas fa-download left-icon"></i>
					Download CSV
				</button>
				<button class="btn btn-primary" @click="goToEdit()">
					<i class="fas fa-pencil-alt left-icon"></i>
					Edit station
				</button>
			</div>
		</header>
		<section v-if="station" class="daily-measure-section">
			<card title="Name" :main-information="station.name"></card>
			<card
				title="Last Update"
				:main-information="lastMeasureDateObserved | dateformat('HH:mm')"
				:below="lastMeasureDateObserved | dateformat('DD MMM YYYY')"
			></card>
			<card
				title="Weather Condition"
				:main-information="lastMeasureWeatherType | weatherConditionIcon"
				:icon="true"
			></card>
			<card
				title="Wind Direction"
				:main-information="lastMeasureWindDirection ? 'wi wi-wind from-' + lastMeasureWindDirection + '-deg' : null"
				:icon="true"
			></card>
			<card
				title="Solar Radiation"
				:main-information="lastMeasureSolarRadiation"
				:unit="unitsMeasure['solarRadiation']"
			></card>
			<card
				title="Temperature"
				:main-information="lastMeasureTemperature"
				:unit="unitsMeasure['temperature']"
			></card>
			<card
				title="Precipitation"
				:main-information="lastMeasurePrecipitation"
				:unit="unitsMeasure['precipitation']"
			></card>
			<card
				title="Relative Humidity"
				:main-information="lastMeasureRelativeHumidity"
				:unit="unitsMeasure['relativeHumidity']"
			></card>
			<card
				title="Wind Speed"
				:main-information="lastMeasureWindSpeed"
				:unit="unitsMeasure['windSpeed']"
			></card>
			<card
				title="Atmoshperic Pressure"
				:main-information="lastMeasureAtmosphericPressure"
				:unit="unitsMeasure['atmosphericPressure']"
			></card>
		</section>
		<section class="map-container" v-if="station && stations.length">
			<l-map
				class="map"
				:zoom="mapSettings.zoom"
				:min-zoom="mapSettings.minZoom"
				:max-zoom="mapSettings.maxZoom"
				:center="[station.location.coordinates[1],station.location.coordinates[0]]"
			>
				<l-tile-layer :url="mapSettings.url"></l-tile-layer>
				<l-marker v-if="highlightMarker" :lat-lng="highlightMarker" :icon="highlighticon"></l-marker>
				<template v-for="s in stations">
					<l-marker
						:key="s.id"
						v-if="s.id != station.id"
						:lat-lng="[s.location.coordinates[1],s.location.coordinates[0]]"
						:icon="icon"
					>
						<l-popup class="custom-popup">
							<strong>{{ s.name }}</strong>
							<small>{{ s.description }}</small>
						</l-popup>
					</l-marker>
				</template>
			</l-map>
		</section>

		<hr />
		<section class="daily-summary-section" v-if="timeSelectedInterval == timeIntervals.daily">
			<div class="daily-summary-cards">
				<template v-for="measure in cardValues">
					<card
						class="card-daily-summary"
						:icon="measure.condition | weatherConditionIcon"
						:key="measure.id"
						:title="measure.date | dateformat(measure.dateformat)"
						:condition="measure.condition"
					></card>
				</template>
			</div>
		</section>
		<section class="daily-summary-section">
			<select v-model="timeSelectedInterval" class="station-select">
				<option v-for="(v, k) in timeIntervals" :key="k" :value="v">{{ v }}</option>
			</select>
		</section>
		<section class="charts">
			<div class="card precipitation" v-if="precipitations.length">
				<precipitations-chart :precipitations="precipitations"></precipitations-chart>
			</div>
			<div class="card temperature" v-if="temperatures.length">
				<temperatures-chart :temperatures="temperatures"></temperatures-chart>
			</div>
			<div class="card pressure" v-if="pressures.length">
				<pressures-chart :pressures="pressures"></pressures-chart>
			</div>
			<div class="card humidity" v-if="humidity.length">
				<humidity-chart :humidity="humidity"></humidity-chart>
			</div>
		</section>
	</div>
</template>

<script src="./StationDetails.ts" lang="ts"/>