<template>
	<div class="home">
		<header>
			<label class="title">Agri Weather Gateway</label>
		</header>
		<section class="first">
			<l-map class="map" :zoom="zoom" :min-zoom="minZoom" :max-zoom="maxZoom" :center="center">
				<l-tile-layer :url="url"></l-tile-layer>
				<l-marker
					:lat-lng="markerLatLng"
					:icon="icon"
					@click="showStation"
					:attribution="markerAttribution"
				>
					<l-popup class="custom-popup" content="Stazione 5, Perugia Umbria (IT)"></l-popup>
				</l-marker>
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
					<tr>
						<td>Station 1</td>
						<td>
							<i class="fas fa-circle red-status"></i>
						</td>
						<td>location</td>
						<td>id</td>
						<td>10 april 2019</td>
						<td>type</td>
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


