<template>
    <div>
        <div class="font-14">{{headline}}</div>
        <div>
            <span v-for="item in items"
                  :key="item.value"
                  :class="fullItemClass">

                {{item.title}}
            </span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ProfilePreferences',
        props: {
            items: Array,
            headline: String,
            itemClass: String
        },
        computed: {
            fullItemClass(){
                return 'tag small-tag ' + this.itemClass;
            }
        }
    }
</script>
