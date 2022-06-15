<template>
	<div class="login">
		<h2>Agri Weather Gateway</h2>
		<div class="container right-panel-active">
			<div class="form-container sign-in-container">
				<div class="form">
					<h1>Sign in</h1>
					<input
						type="email"
						placeholder="eMail"
						v-model="username"
						autocomplete="off"
						autofocus="on"
						inputmode="email"
						:class="incorrectCredentials ? 'error-input' : ''"
					/>
					<input
						type="password"
						placeholder="Password"
						v-model="password"
						autocomplete="off"
						:class="incorrectCredentials ? 'error-input' : ''"
					/>
					<span class="error" v-if="incorrectCredentials">
						<i class="fas fa-exclamation-circle"></i> Invalid credentials
					</span>
					<button class="action" @click="login()">
						<i class="fas fa-sign-in-alt"></i> Login
					</button>
				</div>
			</div>
			<div class="overlay-container">
				<div class="overlay">
					<div class="overlay-panel overlay-left">
						<h1>Welcome Back</h1>
						<div class="title">Please login with your personal information</div>
						<div class="title">Or</div>
						<a :href="authenticationServerUrl + '/sign_up'" target="_blank">
							<button class="register">
								<i class="fas fa-user-plus"></i> Register
							</button>
						</a>
					</div>
				</div>
			</div>
		</div>
		<h3>
			<i class="fas fa-rocket"></i> Powered by
			<a :href="authenticationServerUrl" target="_blank">Fiware Keyrock idM</a>
		</h3>
	</div>
</template>

<script lang="ts" src="./login.ts"></script>