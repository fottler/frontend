<template>
    <div>
        <List class="row event-list"
              item-class="col-6 col-sm-4"
              :items="events"
              v-slot="{index, item}">

            <event-item :index="index"
                        :item="item"
                        :user="user"
                        @click="$emit('item-click', item.id)"
                        @add-to-favorites="_addToFavorites(item.id)"
                        @remove-from-favorites="_removeFromFavorites(item.id)"></event-item>
        </List>
    </div>
</template>

<script>
    import List from "@/components/common/List";
    import EventItem from "@/modules/event/components/EventItem";
    import {addToFavorites, removeFromFavorites} from "@/store/types";
    import { createNamespacedHelpers } from 'vuex'

    const { mapActions } = createNamespacedHelpers('favorite');
    const { mapState: mapUserInfoState } = createNamespacedHelpers('user');

    export default {
        name: 'EventListContainer',
        components: {EventItem, List},
        props: {
            events: Array
        },
        computed: {
            ...mapUserInfoState(['user']),
        },
        methods: {
            _addToFavorites(id){
                this[addToFavorites](id);
            },
            _removeFromFavorites(id){
                this[removeFromFavorites](id);
            },
            ...mapActions([
                addToFavorites,
                removeFromFavorites
            ])
        }
    }
</script>
