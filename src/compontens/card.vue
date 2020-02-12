<template>
	<div class="card">
		<div class="header">{{title}}</div>
		<div class="body">
			<div class="main-info">
				<i v-if="icon" class="left-icon" :class="icon" />
				<label>{{mainInformation}}</label>
				<small v-if="unit">{{unit}}</small>
			</div>
			<div v-if="min" class="info">
				<label>min {{min}}</label>
				<small>{{unit}}</small>
			</div>
			<div v-if="max" class="info">
				<label>max {{max}}</label>
				<small>{{unit}}</small>
			</div>
		</div>
	</div>
</template>
<script src="./card.ts" />