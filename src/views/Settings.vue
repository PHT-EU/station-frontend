<template>
    <div class="container is-fluid">
        <div class="columns">
            <div class="column is-one-fifth">
                <SettingsMenu />
            </div>
            <div class="column">
                <h1 class="heading">
                    Settings
                </h1>
            </div>
        </div>
    </div>
</template>

<script>
import SettingsMenu from '@/components/settings/SettingsMenu';

export default {
    name: 'Settings',
    components: { SettingsMenu },
};

</script>

<style scoped>

</style>
