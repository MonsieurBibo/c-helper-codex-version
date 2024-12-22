<template>
	<CdxDialog
		title="C-helper">
	</CdxDialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { CdxDialog } from '@wikimedia/codex';

export default defineComponent( {
	components: { CdxDialog },
	setup() {
		const checkboxValue = ref( [] );
		const open = ref( true );
	}
} );

</script>
