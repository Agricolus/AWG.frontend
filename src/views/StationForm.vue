<template>
	<div class="stationForm">
		<div class="form">
			<header>
				<label class="title" v-if="!stationId">New station</label>
				<label class="title" v-else>Edit station</label>
			</header>
			<hr />
			<div class="form-control">
				<label>Installation date</label>
				<datepicker
					:v-model="stationForm.dateInstalled"
					calendar-button
					calendar-button-icon="fas fa-calendar"
					v-model="stationForm.dateInstalled"
					v-validate.immediate="'required'"
				></datepicker>
			</div>

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
				<label>Select point on map</label>
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
					<input
						name="latitude"
						type="text"
						placeholder="Insert latitutde"
						v-model="lat"
						v-validate.immediate="'required'"
						readonly
					/>
					<span class="error">{{ errors.first('latitude') }}</span>
				</div>
				<div class="form-control">
					<label>Longitude</label>
					<input
						type="text"
						name="longitude"
						placeholder="Insert lng"
						v-model="lng"
						readonly
						v-validate.immediate="'required'"
					/>
					<span class="error">{{ errors.first('longitude') }}</span>
				</div>
			</div>

			<div class="form-control">
				<label>Add controlled properties</label>
				<div>
					<div
						v-for="(p,index) in controlledProperties"
						:key="index"
						class="custom-tag"
						@click="addControlledProperty(p)"
						:class="{'selected': isSelected(p)}"
					>
						<i class="fas fa-plus" v-if="!isSelected(p)"></i>
						<i class="fas fa-times" v-else></i>
						<label>{{p}}</label>
					</div>
				</div>
				<span
					class="error"
					v-if="!stationForm.controlledProperty.length"
				>You must select at least one controlled property</span>
			</div>
			<div class="divider-10"></div>
			<div class="option-data">
				<label>Optional</label>
				<i
					class="fas fa-arrow-circle-up"
					v-if="showOptionData"
					@click="showOptionData =!showOptionData"
				></i>
				<i
					class="fas fa-arrow-circle-down"
					v-if="!showOptionData"
					@click="showOptionData =!showOptionData"
				></i>
			</div>
			<hr />
			<div v-if="showOptionData">
				<div class="form-control">
					<label>Source</label>
					<input type="text" placeholder="Insert source" v-model="stationForm.source" />
				</div>

				<div class="form-control">
					<label>Serial number</label>
					<input type="text" placeholder="Insert serial number" v-model="stationForm.serialNumber" />
				</div>

				<div class="form-control">
					<label>Device model</label>
					<input type="text" placeholder="Insert model" v-model="stationForm.refDeviceModel" />
				</div>
				<div class="form-control">
					<label>Data provider</label>
					<input
						name="data provider"
						type="text"
						placeholder="Insert data provider"
						v-model="stationForm.dataProvider"
					/>
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
				<button
					class="btn btn-primary"
					@click="save"
					:disabled="!isValid || !stationForm.controlledProperty.length"
				>
					<i class="fas fa-save"></i>
					Save
				</button>
			</div>
		</div>
	</div>
</template>
<script src="./StationForm.ts" lang="ts"/>