<template>
	<div class="home">
		<header>
			<label class="title">Agri Weather Gateway</label>
		</header>
		<section class="map-section">
			<l-map
				class="map"
				:zoom="mapSettings.zoom"
				:min-zoom="mapSettings.minZoom"
				:max-zoom="mapSettings.maxZoom"
				:center="mapCenter"
			>
				<l-tile-layer :url="mapSettings.url"></l-tile-layer>
				<l-marker v-if="highlightMarker" :lat-lng="highlightMarker" :icon="highlightIcon"></l-marker>
				<template v-for="station in stations">
					<l-marker
						:key="station.id"
						:lat-lng="[station.location.coordinates[1],station.location.coordinates[0]]"
						:icon="icon"
					>
						<l-popup class="custom-popup">
							<strong>{{ station.name }}</strong>
							<small>{{station.description}}</small>
						</l-popup>
					</l-marker>
				</template>
			</l-map>
		</section>
		<section class="table-section">
			<label>First 10 nearest stations</label>
			<table class="table">
				<thead>
					<tr>
						<th>Status</th>
						<th>Name</th>
						<th>Last Value Date</th>
						<th>Installation Date</th>
						<th>Serial Number</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="station in stations"
						:key="station.id"
						@mouseover="highlightStationIcon(station)"
						@click="goToDetails(station.id)"
					>
						<td>
							{{ station.deviceState }}
							<i class="wi wi-na fa-2x" v-if="!station.deviceState"></i>
						</td>
						<td>{{ station.name }}</td>

						<td
							v-if="station.dateLastValueReported"
						>{{ station.dateLastValueReported | dateformat('DD MMM YYYY, HH:mm') }}</td>
						<td v-else>
							<i class="wi wi-na fa-2x"></i>
						</td>
						<td
							v-if="station.dateInstalled"
						>{{ station.dateInstalled | dateformat('DD MMM YYYY, HH:mm') }}</td>
						<td v-else>
							<i class="wi wi-na fa-2x"></i>
						</td>
						<td>
							{{ station.serialNumber }}
							<i class="wi wi-na fa-2x" v-if="!station.serialNumber"></i>
						</td>
					</tr>
				</tbody>
			</table>
			<button class="btn btn-primary" @click="goToStations()">
				SHOW ALL DATA
				<i class="fas fa-arrow-right right-icon"></i>
			</button>
		</section>
	</div>
</template>
<script src="./Home.ts" lang="ts"/>


