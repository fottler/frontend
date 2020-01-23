<template>
    <div class="event"
         @click.prevent="$emit('click')">

        <div class="image-wrapper">
            <img :src="pictureUrl"
                 :alt="item.title">
            <div class="overlay">
                <!-- //todo <div class="distance">0.2 км</div>-->
                <a v-if="!isGuest"
                   href="#"
                   :class="{like: true, liked: item.is_favorite}"
                   @click.stop.prevent="switchFavorite"></a>
            </div>
        </div>

        <div class="content-wrapper">
            <div class="title">{{item.title}}</div>

            <table class="date-wrapper">
                <tr>
                    <td><!-- //todo Сегодня--></td>
                    <td>{{beautifulDate}}</td>
                </tr>
            </table>

            <div class="people-wrapper">
                <span>{{item.males_number}}/{{item.max_males_number}}</span>
                <span>{{item.females_number}}/{{item.max_females_number}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import Event from "@/modules/event/models/Event";
    import User from "@/modules/user/models/User";
    import DateUtil from "@/core/utilities/DateUtil";

    export default {
        name: 'EventItem',
        props: {
            item: Object,
            user: Object
        },
        computed: {
            isGuest(){
                return User.isGuest(this.user.auth_status);
            },
            pictureUrl(){
                return Event.smallPictureUrl(this.item.picture);
            },
            beautifulDate(){
                return DateUtil.toHumanReadable(this.item.datetime);
            }
        },
        methods: {
            switchFavorite(){
                this.item.is_favorite
                    ? this.$emit('remove-from-favorites')
                    : this.$emit('add-to-favorites');
            }
        }
    }
</script>
