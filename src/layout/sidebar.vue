<template>
	<div class="sidebar">
		<header>
			<div class="title">AWG</div>
		</header>
		<section>
			<ul class="nav">
				<li class="nav-item">
					<router-link :to="{ name: 'home' }" class="nav-link">
						<i class="fas fa-home nav-item-icon"></i>
						Home
					</router-link>
				</li>
				<li class="nav-item">
					<router-link :to="{ name: 'stations' }" class="nav-link">
						<i class="fas fa-th-list nav-item-icon"></i>
						Stations
					</router-link>
				</li>
			</ul>
		</section>
		<footer>
			<img src="/assets/img/Powered BY FIWARE_H_cmyk_ white.png" />
		</footer>
	</div>
</template>
<script src="./sidebar.ts" lang="ts"/>