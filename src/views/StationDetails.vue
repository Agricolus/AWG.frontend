<template>
	<div class="stationDetails">
		<header></header>
		<section>
			<card title="ID" mainInformation="St1"></card>
			<card title="Last Update" mainInformation="15.38"></card>
			<card title="ID" mainInformation="St1"></card>
			<card title="Wind Direction" mainInformation="SSW" icon="fab fa-telegram-plane"></card>
			<card title="Solar Radiation" mainInformation="700" unit="w/m2"></card>

			<card
				title="Temperature"
				mainInformation="13.96"
				unit="°C"
				:secondaryInformations="['min 13.72', 'max 14.20']"
			></card>
			<card title="Precipitation" mainInformation="22" unit="mm"></card>
			<card
				title="Relaty Humidity"
				mainInformation="39"
				unit="%"
				:secondaryInformations="['min 13.72', 'max 14.20']"
			></card>
			<card title="Wind Speed" mainInformation="15" unit="km/h"></card>
			<card
				title="Wind Speed"
				mainInformation="8"
				unit="atm"
				:secondaryInformations="['min 13.72', 'max 14.20']"
			></card>
		</section>
	</div>
</template>
<script src="./StationDetails.ts" lang="ts"/>