<template>
    <div class="scroller">
        <div class="scrollable">
            <div v-for="(item, index) in items"
                 :key="index"
                 class="item">

                <slot :index="index"
                      :item="item"></slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ScrollableCarousel',
        props: {
            items: Array
        }
    }
</script>
