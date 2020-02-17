<template>
	<div class="sidebar">
		<header>
			<div class="title">AWG</div>
		</header>
		<section>
			<div class="header">
				<label>21 May, 2020</label>
				<label>15:42</label>
			</div>
			<ul class="nav">
				<li class="nav-item">
					<router-link :to="{ name: 'home' }" class="nav-link">
						<i class="fas fa-home nav-item-icon"></i>
						Homepage
					</router-link>
				</li>
				<li class="nav-item">
					<router-link :to="{ name: 'stations' }" class="nav-link">
						<i class="fas fa-th-list nav-item-icon"></i>
						MyStations
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