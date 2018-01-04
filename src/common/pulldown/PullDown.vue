<template>
	<div class="pull-down-wrap" :style="`height: ${height}px;width: ${height * 2}px;top: -${height}px`">
		<template v-if="height < 50">
			<div class="pull-down-circle"></div>
			<div class="pull-down-circle big"></div>
			<div class="pull-down-circle"></div>
		</template>
		<span v-else>松开刷新</span>
	</div>
</template>

<script>
	import './pulldown.styl'
	export default{
		props: ['height', 'isRefresh']
	}
</script>
