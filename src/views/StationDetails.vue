<template>
	<div class="stationDetails">
		<header></header>
		<section>
			<div class="card">
				<div class="header">ID</div>
				<div class="body">
					<div class="info">
						<label>{{stationId}}</label>
					</div>
				</div>
				<div class="footer"></div>
			</div>
			<div class="card" v-if="lastMeasure">
				<div class="header">LastUpdate</div>
				<div class="body">
					<div class="info">
						<label>{{lastMeasure.dateCreated | dateformat('hh:mm')}}</label>
					</div>
				</div>
				<div class="footer"></div>
			</div>
			<div class="card">
				<div class="header">Weather Type</div>
				<div class="body">
					<div class="info">
						<label>Soooole</label>
						<img />
					</div>
				</div>
				<div class="footer"></div>
			</div>
			<div class="card">
				<div class="header">Wind Direction</div>
				<div class="body">
					<div class="info">
						<i class="fab fa-telegram-plane"></i>
						<label>Soooole</label>
						<img />
					</div>
				</div>
				<div class="footer"></div>
			</div>
		</section>
	</div>
</template>
<script src="./StationDetails.ts" lang="ts"/>