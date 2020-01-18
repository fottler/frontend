<template>
    <div>
        <List v-show="events.length"
              class="row event-list"
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

        <div v-show="!events.length"
             class="empty-list">
            {{emptyListContent}}
        </div>
    </div>
</template>

<script>
    import List from "@/components/common/List";
    import EventItem from "@/modules/event/components/EventItem";
    import {addToFavorites, removeFromFavorites} from "@/store/types";
    import { createNamespacedHelpers } from 'vuex'
    import Config from "@/config/Config";

    const { mapActions } = createNamespacedHelpers('favorite');
    const { mapState: mapUserInfoState } = createNamespacedHelpers('user');

    export default {
        name: 'EventListContainer',
        components: {EventItem, List},
        props: {
            events: Array,
            emptyListText: String
        },
        computed: {
            emptyListContent(){
                return this.emptyListText || Config.message.eventListIsEmpty;
            },
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
