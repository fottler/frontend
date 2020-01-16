<template>
    <div class="list-row">
        <img v-if="icon"
             :src="'/images/icons/'+icon+'.svg'"
             :style="iconStyles"
             class="icon" >

        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'ListRow',
        props: {
            icon: String,
            iconWidth: {
                type: String,
                default: '16'
            },
            iconTop: {
                type: String,
                default: '15'
            },
            iconLeft: {
                type: String,
                default: '14'
            }
        },
        computed: {
            iconStyles(){
                return'width: '+ this.iconWidth +'px;'+
                    'height: '+ this.iconWidth +'px;'+
                    'top: '+ this.iconTop +'px;'+
                    'left: '+ this.iconLeft +'px;';
            }
        }
    }
</script>
