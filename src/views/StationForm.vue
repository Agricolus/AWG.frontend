<template>
	<div class="stationForm">
		<div class="form">
			<header>
				<label class="title" v-if="!stationId">New station</label>
				<label class="title" v-else>Edit station</label>
			</header>

			<hr />

			<div class="form-control">
				<label>Name</label>
				<input
					name="name"
					type="text"
					placeholder="Insert name"
					v-model="stationForm.name"
					v-validate.immediate="'required'"
				/>
				<span class="error">{{ errors.first('name') }}</span>
			</div>

			<div class="form-control">
				<label>Provider</label>
				<input
					name="provider"
					type="text"
					placeholder="Insert provider"
					v-model="stationForm.dataProvider"
					v-validate.immediate="'required'"
				/>
				<span class="error">{{ errors.first('provider') }}</span>
			</div>

			<div class="form-control">
				<label>Provider serial number</label>
				<input
					name="serial number"
					type="text"
					placeholder="Insert provider serial number"
					v-model="stationForm.serialNumber"
					v-validate.immediate="'required'"
				/>
				<span class="error">{{ errors.first('serial number') }}</span>
			</div>

			<div class="form-control">
				<label>Select point on map</label>
				<span class="error" v-if="!lat || !lng">You must select a point</span>
				<div class="map-form">
					<l-map
						class="map"
						:zoom="zoom"
						:min-zoom="minZoom"
						:max-zoom="maxZoom"
						:center="center"
						@click="onclickMap"
					>
						<l-tile-layer :url="url"></l-tile-layer>
						<l-marker v-if="markerLatLng" :lat-lng="markerLatLng" :icon="icon"></l-marker>
					</l-map>
				</div>
			</div>

			<div class="form-row">
				<div class="form-control">
					<label>Latitude</label>
					<input name="latitude" type="text" readonly :value="lat ? lat.toFixed(6) : null" />
				</div>
				<div class="form-control">
					<label>Longitude</label>
					<input type="text" name="longitude" :value="lng ? lng.toFixed(6) : null" readonly />
				</div>
			</div>

			<div class="divider-10"></div>

			<div class="option-data" @click="showOptionData =!showOptionData">
				<label>Optional</label>
				<i class="fas fa-arrow-circle-up" v-if="showOptionData"></i>
				<i class="fas fa-arrow-circle-down" v-if="!showOptionData"></i>
			</div>

			<hr />

			<div v-if="showOptionData">
				<div class="form-control">
					<label>Installation date</label>
					<datepicker
						:v-model="stationForm.dateInstalled"
						calendar-button
						calendar-button-icon="fas fa-calendar"
						placeholder="Insert installation date"
						v-model="stationForm.dateInstalled"
					></datepicker>
				</div>

				<div class="form-control">
					<label>Device model</label>
					<input type="text" placeholder="Insert model" v-model="stationForm.refDeviceModel" />
				</div>

				<div class="form-control">
					<label>Description</label>
					<textarea placeholder="Insert description" rows="4" v-model="stationForm.description" />
				</div>
			</div>

			<div class="buttons">
				<button
					class="btn btn-danger"
					@dblclick="deleteStation()"
					v-tooltip="'Double click to delete station'"
					v-if="stationId"
				>
					<i class="fas fa-trash-alt"></i>
					Delete
				</button>
				<button class="btn" @click="back">
					<i class="fas fa-times"></i>
					Cancel
				</button>
				<button class="btn btn-primary" @click="save" :disabled="!isValid || !lat || !lng">
					<i class="fas fa-save"></i>
					Save
				</button>
			</div>
		</div>
	</div>
</template>

<script src="./StationForm.ts" lang="ts"/>