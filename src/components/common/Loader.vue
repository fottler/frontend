<template>
    <div class="loading-spinner-wrapper"
         :class="shown ? 'shown' : ''">
        <div class="loading-spinner">
            <div></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Loader',
        props: {
            shown: Boolean
        }
    }
</script>
