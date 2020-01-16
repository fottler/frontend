<template>
    <list-row class="bb"
              :class="!this.item.is_read ? 'highlighted' : ''"
              :icon="icon"
              @click.native.prevent="$emit('click')">

        <div class="main-text">{{content}}</div>
    </list-row>
</template>

<script>
    import ListConfig from "@/config/ListConfig";
    import Template from "@/core/Template";
    import ListRow from "@/components/common/ListRow";

    export default {
        name: 'NotificationItem',
        components: {ListRow},
        props: {
            item: Object
        },
        computed: {
            icon(){
                const icons = {
                    1: 'event', 2: 'event', 4: 'friend', 5: 'message'
                };
                return icons[this.item.type] + (this.item.is_read ? '-grey' : '');
            },
            content(){
                const template = Template.findTemplate2Levels(ListConfig.notificationType, this.item.type);

                return Template.run(template, this.item);
            }
        }
    }
</script>
