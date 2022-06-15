<template>
	<div class="card" v-if="condition">
		<div class="header">{{title}}</div>
		<div class="body">
			<div class="main-info">
				<template>
					<i v-if="icon" :class="condition" />
					<label v-else>{{ condition }}</label>
				</template>
			</div>
		</div>
		<div class="footer"></div>
	</div>
</template>

<script src="./card.ts" />