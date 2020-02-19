<template>
	<div class="card">
		<div class="header">{{title}}</div>
		<div class="body">
			<div class="main-info" v-if="mainInformation !== false">
				<i class="no-value wi wi-na fa-3x" v-if="mainInformation === null"></i>
				<template v-if="mainInformation !== null">
					<i v-if="icon" :class="mainInformation" />
					<label v-if="!icon">{{ mainInformation }}</label>
					<small v-if="unit" v-html="unit"></small>
					<small v-if="below" class="below">{{ below }}</small>
				</template>
			</div>

			<!-- <div class="main-info weather" v-if="weatherIcon">
				<i :class="weatherIcon"></i>
			</div>-->

			<!-- <div class="info" v-if="min || max">
				<div v-if="min">
					<label>min {{ min }}</label>
					<small v-if="unit">{{ unit }}</small>
				</div>
				<div v-if="max">
					<label>max {{ max }}</label>
					<small v-if="unit">{{ unit }}</small>
				</div>
			</div>-->
		</div>

		<div class="footer"></div>
	</div>
</template>
<script src="./card.ts" />