<template>
    <div class="container columns">
        <div class="column is-one-quarter">
            Previous Executions
        </div>
        <div class="column">
            <div class="is-inline-block" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'OverviewTab',
    props: {
        train: Object,
        configs: Array,
    },
};
</script>

<style scoped>

</style>
