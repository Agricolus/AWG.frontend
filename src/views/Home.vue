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
			<table class="table">
				<thead>
					<tr>
						<th>Name</th>
						<th>Status</th>
						<th>Location</th>
						<th>id</th>
						<th>Data Created</th>
						<th>Type</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="station in stations" :key="station.id" @mouseover="highlightStationIcon(station)">
						<td>{{ station.name }}</td>
						<td>
							{{ station.deviceState }}
							<i class="wi wi-na fa-2x" v-if="!station.deviceState"></i>
						</td>
						<td>{{ station.location }}</td>
						<td>{{ station.id }}</td>
						<td>{{ station.dateCreated | dateformat }}</td>
						<td>{{ station.type }}</td>
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


