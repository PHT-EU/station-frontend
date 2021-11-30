<template>
    <div>
        <div class="field">
            <label class="label">Environment Variables</label>
        </div>

        <div
            v-for="(envVar, index) in airflowConfigEnvVars"
            :key="index"
            class="field is-horizontal"
        >
            <div class="field-body">
                <div class="field">
                    <p class="control is-expanded has-icons-left">
                        <input
                            v-model="envVar.key"
                            class="input"
                            type="text"
                            placeholder="Key"
                        >
                        <span class="icon is-small is-left">
                            <i class="fas fa-key" />
                        </span>
                    </p>
                </div>
                <div class="field">
                    <p class="control is-expanded has-icons-left has-icons-right">
                        <input
                            v-model="envVar.value"
                            class="input"
                            type="text"
                            placeholder="Value"
                        >
                        <span class="icon is-small is-left">
                            <i class="fas fa-equals" />
                        </span>
                    </p>
                </div>

                <div
                    v-if="index === (airflowConfigEnvVars.length - 1)"
                    class="field"
                >
                    <button
                        class="button"
                        @click="addEnvironmentVariable"
                    >
                        <span class="icon is-small">
                            <i class="fas fa-plus" />
                        </span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'KeyValueForm',
    props: {
        addEnvironmentVariable: {},
        airflowConfigEnvVars: {},
        labelName: {},
    },
};
</script>
