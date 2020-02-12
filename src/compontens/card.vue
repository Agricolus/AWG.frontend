<template>
	<div class="card">
		<div class="header">{{title}}</div>
		<div class="body">
			<div class="main-info">
				<i v-if="icon" :class="icon" />
				<label>{{mainInformation}}</label>
				<small v-if="unit">{{unit}}</small>
			</div>
			<div v-for="(i, index) in secondaryInformations" class="sec-info" :key="index">
				<label>{{i}}</label>
				<small>{{unit}}</small>
			</div>
		</div>
	</div>
</template>
<script src="./card.ts" />