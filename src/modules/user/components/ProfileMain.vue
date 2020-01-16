<template>
    <table class="w-100 profile-main">
        <tr>
            <td>
                <img :src="avatarUrl"
                     :alt="user.name"
                     class="avatar max-100">
            </td>
            <td>
                <div>{{user.name}}, {{age}}</div>
                <div class="font-12">{{formattedPhone}}</div>
                <div class="city"
                     v-if="user.city">{{user.city}}</div>

                <slot></slot>
            </td>
        </tr>
    </table>
</template>

<script>
    import DateUtil from "@/core/utilities/DateUtil";
    import User from "@/modules/user/models/User";
    import PhoneMask from "@/core/PhoneMask";

    export default {
        name: 'ProfileMain',
        props: {
            user: Object
        },
        computed: {
            age(){
                return DateUtil.getAgeByBirthDate(this.user.birthday);
            },
            avatarUrl(){
                return User.smallAvatarUrl(this.user.avatar);
            },
            formattedPhone(){
                const phoneMask = new PhoneMask(User.phoneMask.prefix, User.phoneMask.mask);

                return phoneMask.rawToFormatted(this.user.phone);
            }
        }
    }
</script>
