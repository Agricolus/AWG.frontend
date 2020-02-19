<template>
	<div class="home">
		<header>
			<label class="title">Agri Weather Gateway</label>
		</header>
		<section class="map-section">
			<l-map class="map" :zoom="zoom" :min-zoom="minZoom" :max-zoom="maxZoom" :center="center">
				<l-tile-layer :url="url"></l-tile-layer>
				<template v-for="station in stations">
					<l-marker :key="station.id" :lat-lng="station.location.coordinates" :icon="icon">
						<l-popup class="custom-popup">
							<strong>{{ station.name }}</strong>
							<small>station.description</small>
						</l-popup>
					</l-marker>
				</template>
			</l-map>
		</section>
		<section class="table-section">
			<table class="table">
				<thead>
					<tr>
						<th>Status</th>
						<th>Name</th>
						<th>Last Value Date</th>
						<th>Installation Date</th>
						<th>Source</th>
						<th>Data Provider</th>
						<th>Serial Number</th>
						<th>Model</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="station in stations" :key="station.id">
						<td>
							{{ station.deviceState }}
							<i class="wi wi-na fa-2x" v-if="!station.deviceState"></i>
						</td>
						<td>{{ station.name }}</td>
						<td
							v-if="station.dateLastValueReported"
						>{{ station.dateLastValueReported | dateformat('DD MMM YYYY, hh:mm') }}</td>
						<td v-else>
							<i class="wi wi-na fa-2x"></i>
						</td>
						<td
							v-if="station.dateInstalled"
						>{{ station.dateInstalled | dateformat('DD MMM YYYY, hh:mm') }}</td>
						<td v-else>
							<i class="wi wi-na fa-2x"></i>
						</td>
						<td>
							{{ station.source }}
							<i class="wi wi-na fa-2x" v-if="!station.source"></i>
						</td>
						<td>
							{{ station.dataProvider }}
							<i class="wi wi-na fa-2x" v-if="!station.dataProvider"></i>
						</td>
						<td>
							{{ station.serialNumber }}
							<i class="wi wi-na fa-2x" v-if="!station.serialNumber"></i>
						</td>
						<td>
							{{ station.refDeviceModel }}
							<i class="wi wi-na fa-2x" v-if="!station.refDeviceModel"></i>
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


