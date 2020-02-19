<template>
	<div class="stations">
		<header>
			<div class="search-box">
				<i class="fas fa-search"></i>
				<input id="text" type="text" placeholder="Find a weather station" v-model="needle" />
			</div>
		</header>
		<section class="button-section">
			<button class="btn btn-primary" @click="goToEdit()">
				<i class="fas fa-plus left-icon"></i>
				ADD A NEW STATIONS
			</button>
		</section>
		<section class="table-section">
			<table class="table" v-if="stations">
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
						v-for="(station, i) in filteredStations"
						:key="station.id.concat('-' + i)"
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
		</section>
		<pagination
			:total="pagination.totalCount"
			:taken="pagination.take"
			:skipped="pagination.skip"
			@take="takeThose"
			@skip="skipThat"
		></pagination>
	</div>
</template>
<script src="./Stations.ts" lang="ts"/>
