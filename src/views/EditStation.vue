<template>
	<div class="stationForm">
		<div class="form">
			<header>
				<label class="title">New station</label>
			</header>
			<hr />
			<div class="form-control">
				<label>Name</label>
				<input type="text" placeholder="Insert name" v-model="stationForm.name" />
			</div>
			<div class="form-control">
				<label>Installation date</label>
				<datepicker
					:v-model="stationForm.dateInstalled"
					calendar-button
					calendar-button-icon="fas fa-calendar"
				></datepicker>
			</div>
			<div class="form-control">
				<label>Source</label>
				<input type="text" placeholder="Insert source" v-model="stationForm.source" />
			</div>

			<div class="form-control">
				<label>Serial number</label>
				<input type="text" placeholder="Insert serialNumber" v-model="stationForm.serialNumber" />
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
			</div>
			<div class="form-control">
				<label>Device model</label>
				<input type="text" placeholder="Insert refDeviceModel" v-model="stationForm.refDeviceModel" />
			</div>
			<div class="form-control">
				<label>Description</label>
				<textarea placeholder="Insert description" rows="4" v-model="stationForm.description" />
			</div>
		</div>
	</div>
</template>
<script src="./EditStation.ts" lang="ts"/>