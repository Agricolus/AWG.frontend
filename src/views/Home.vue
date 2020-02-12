<template>
	<div class="home">
		<header>
			<label class="title">Agri Weather Gateway</label>
		</header>
		<section class="first">
			<l-map class="map" :zoom="zoom" :min-zoom="minZoom" :max-zoom="maxZoom" :center="center">
				<l-tile-layer :url="url"></l-tile-layer>
				<template v-for="station in filteredStations">
					<l-marker :key="station.id" :lat-lng="station.location.coordinates" :icon="icon">
						<l-popup class="custom-popup">
							<strong>{{ station.name }}</strong>
							<small>station.description</small>
						</l-popup>
					</l-marker>
				</template>
			</l-map>
		</section>
		<section class="second">
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
					<tr v-for="station in filteredStations" :key="station.id">
						<td>{{ station.name }}</td>
						<td>
							<i class="fas fa-circle red-status"></i>
						</td>
						<td>{{ station.location }}</td>
						<td>{{ station.id }}</td>
						<td>{{ station.dateCreated | dateformat }}</td>
						<td>{{ station.type }}</td>
					</tr>
				</tbody>
			</table>
			<button class="btn btn-primary">
				SHOW ALL DATA
				<i class="fas fa-arrow-right right-icon"></i>
			</button>
		</section>
	</div>
</template>
<script src="./Home.ts" lang="ts"/>


