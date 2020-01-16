<template>
    <scrollable-carousel :items="statistics"
                         v-slot="{item}">
        <div>{{item.number}}</div>
        <div>{{item.title}}</div>
    </scrollable-carousel>
</template>

<script>
    import ScrollableCarousel from "@/components/ScrollableCarousel";
    export default {
        name: 'ProfileStatistics',
        components: {ScrollableCarousel},
        props: {
            items: Object
        },
        computed: {
            statistics(){
                const result = {
                    friends: {number: 0, title: 'друзей'},
                    my_events: {number: 0, title: 'моих событий'},
                    participate: {number: 0, title: 'иду'},
                    my_requests: {number: 0, title: 'на одобрении'}
                };

                return Object.keys(result).map((name)=>{
                    result[name].number = this.items[name];

                    return result[name];
                });
            }
        },
    }
</script>
