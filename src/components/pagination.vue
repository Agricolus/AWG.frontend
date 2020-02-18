<template>
	<div class="paginator">
		<div class="per-page-selector">
			Items per page:
			<select @change="$emit('take', parseInt($event.target.value))">
				<option v-for="t in perpage" :key="t" :value="t" :selected="t == taken">{{ t }}</option>
			</select>
		</div>
		<div class="pages">
			<span class="prev-page" :class="{disabled: !hasPrev}" @click="goToPreviousPage">
				<i class="fas fa-angle-double-left"></i> prev
			</span>

			<span
				class="page"
				v-for="page in pagesHead"
				:key="page"
				:class="{'current-page': page == currentPage}"
				@click="goToPage(page)"
			>{{ page }}</span>

			<span v-if="pagesHead && pagesHead.length == extemesPagesToShow">
				<i class="fas fa-ellipsis-h"></i>
			</span>
			<span
				class="page"
				v-for="page in pagesMid"
				:key="page"
				:class="{'current-page': page == currentPage}"
				@click="goToPage(page)"
			>{{ page }}</span>
			<span v-if="pagesTail && pagesTail.length == extemesPagesToShow">
				<i class="fas fa-ellipsis-h"></i>
			</span>

			<span
				class="page"
				v-for="page in pagesTail"
				:key="page"
				:class="{'current-page': page == currentPage}"
				@click="goToPage(page)"
			>{{ page }}</span>

			<span class="next-page" :class="{disabled: !hasNext}" @click="goToNextPage">
				next
				<i class="fas fa-angle-double-right"></i>
			</span>
		</div>
	</div>
</template>
<script lang="ts" src="./pagination.ts"></script>