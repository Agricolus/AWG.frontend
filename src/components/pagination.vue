<template>
	<div class="paginator">
		<div class="per-page-selector">
			per_page_selector
			<select @change="$emit('take', parseInt($event.target.value))">
				<option v-for="t in perpage" :key="t" :value="t" :selected="t == taken">{{ t }}</option>
			</select>
		</div>
		<div class="pages">
			pages:
			<span v-if="hasPrev" class="prev-page" @click="goToPreviousPage"><< prev</span>

			<span
				class="page"
				v-for="page in pagesHead"
				:key="page"
				:class="{'current-page': page == currentPage}"
				@click="goToPage(page)"
			>{{ page }}</span>

			<span v-if="pagesHead && pagesHead.length == 1">...</span>
			<span
				class="page"
				v-for="page in pagesMid"
				:key="page"
				:class="{'current-page': page == currentPage}"
				@click="goToPage(page)"
			>{{ page }}</span>
			<span v-if="pagesTail && pagesTail.length == 1">...</span>

			<span
				class="page"
				v-for="page in pagesTail"
				:key="page"
				:class="{'current-page': page == currentPage}"
				@click="goToPage(page)"
			>{{ page }}</span>

			<span v-if="hasNext" class="next-page" @click="goToNextPage">next >></span>
		</div>
	</div>
</template>
<script lang="ts" src="./pagination.ts"></script>