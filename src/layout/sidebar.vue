<template>
	<div class="sidebar">
		<header>
			<div class="title">AWG</div>
		</header>
		<section v-if="user">
			<div class="user-info">
				<div class="user-initals rounded">{{ user.username[0].toUpperCase() }}</div>
				<div class="username">{{ user.username }}</div>
				<div class="email">{{ user.email }}</div>
				<div class="logout">
					<i class="fas fa-sign-out-alt fa-2x" @click="logout()"></i>
				</div>
			</div>
		</section>
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
				<li class="nav-item" v-if="isAdmin">
					<a :href="authenticationServerUrl" class="nav-link" target="_blank">
						<i class="fas fa-users nav-item-icon"></i>
						Users
					</a>
				</li>
			</ul>
		</section>
		<footer>
			<img src="/assets/img/Powered BY FIWARE_H_cmyk_ white.png" />
		</footer>
	</div>
</template>
<script src="./sidebar.ts" lang="ts"/>