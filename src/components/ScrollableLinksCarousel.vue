<template>
    <div>
        <scrollable-carousel :items="items"
                             v-slot="{item}">
            <a href="#"
               :class="fullItemClass(item)"
               @click.prevent="$emit('click', item.id)">{{item[captionProperty]}}</a>
        </scrollable-carousel>
    </div>
</template>

<script>
    import ScrollableCarousel from "@/components/ScrollableCarousel";

    export default {
        name: 'ScrollableLinksCarousel',
        components: {ScrollableCarousel},
        props: {
            activeItemId: [Number, String, Array],
            items: Array,
            captionProperty: {
                type: String,
                default: 'title'
            },
            itemClass: {
                type: String,
                default: 'tag'
            },
            activeItemClass: {
                type: String,
                default: 'grey-tag'
            }
        },
        methods: {
            fullItemClass(item){
                return {
                    [this.itemClass]: true,
                    [this.activeItemClass]:
                        Array.isArray(this.activeItemId)
                            ? (this.activeItemId.includes(item.id))
                            : (item.id === this.activeItemId)
                };
            }
        }
    }
</script>
