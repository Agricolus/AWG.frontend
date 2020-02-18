<template>
	<div class="card">
		<div class="header">{{title}}</div>
		<div class="body">
			<div class="main-info">
				<i v-if="icon" class="left-icon" :class="icon" />
				<label>{{ mainInformation || 'N/A ' }}</label>
				<small v-if="unit">{{ unit }}</small>
				<small class="below">{{ below }}</small>
			</div>

			<div class="main-info weather" v-if="weatherIcon">
				<i :class="weatherIcon"></i>
			</div>
			<div class="info" v-if="min || max">
				<div v-if="min">
					<label>min {{ min }}</label>
					<small v-if="unit">{{ unit }}</small>
				</div>
				<div v-if="max">
					<label>max {{ max }}</label>
					<small v-if="unit">{{ unit }}</small>
				</div>
			</div>
		</div>
		<div class="footer"></div>
	</div>
</template>
<script src="./card.ts" />