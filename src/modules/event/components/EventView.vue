<template>
    <div class="event-view">
        <div class="image-wrapper">
            <img :src="pictureUrl"
                 :alt="event.title">

            <div v-if="event.about"
                 class="about">{{event.about}}</div>

            <a v-if="!isGuest"
               href="#"
               :class="{like: true, liked: event.is_favorite}"
               @click.prevent="switchFavorite"></a>
        </div>

        <div class="content-wrapper">
            <div class="date-wrapper">
                {{beautifulDate}}
            </div>
            <div class="address-wrapper">
                <a href="#"
                   @click.prevent="$emit('open-map', event.id)">{{event.address}}</a>
            </div>
            <div class="people-wrapper">
                <span>{{event.males_number}}/{{event.max_males_number}}</span>
                <span>{{event.females_number}}/{{event.max_females_number}}</span>

                <a href="#"
                   :class="{disabled: !isOwnerOrMember}"
                   @click.prevent="isOwnerOrMember && $emit('open-members', event.id)">посмотреть участников</a>
            </div>
            <div class="preferences-wrapper">
                {{foodString}}, {{drinksString}}
            </div>
            <div class="button-wrapper">
                <a v-if="isOwnerOrMember"
                   href="#"
                   class="button yellow-button wide"
                   @click.prevent="$emit('open-chat', event.id)">открыть чат</a>

                <span v-else-if="applied">Ваша заявка на рассмотрении</span>

                <a v-else
                   href="#"
                   class="button yellow-button wide"
                   @click.prevent="$emit('apply', event.id)">Хочу пойти</a>
            </div>
        </div>
    </div>
</template>

<script>
    import DateUtil from "@/core/utilities/DateUtil";
    import Event from "@/modules/event/models/Event";
    import User from "@/modules/user/models/User";

    export default {
        name: 'EventView',
        props: {
            event: Object,
            user: Object
        },
        computed: {
            statuses: ()=>Event.statuses,
            isGuest(){
                return User.isGuest(this.user.auth_status);
            },
            isOwnerOrMember(){
                return Event.isOwnerOrMember(this.event.status);
            },
            applied(){
                return Event.applied(this.event.status);
            },
            beautifulDate(){
                return DateUtil.toHumanReadable(this.event.datetime);
            },
            pictureUrl(){
                return Event.bigPictureUrl(this.event.picture);
            },
            foodString(){
                return Event.foodString(this.event.food_preferences);
            },
            drinksString(){
                return Event.drinksString(this.event.drink_preferences);
            }
        },
        methods: {
            switchFavorite(){
                this.event.is_favorite
                    ? this.$emit('remove-from-favorites', this.event.id)
                    : this.$emit('add-to-favorites', this.event.id);
            }
        }
    }
</script>
