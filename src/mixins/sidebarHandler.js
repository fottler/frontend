import ObjectUtil from "@/core/utilities/ObjectUtil";

export default {
    data(){
        return {
            sidebar: {
                //types: {},
                type: null,
                shown: false
            }
        }
    },
    methods: {
        showSidebar(type){
            this.sidebar.type = type;
            this.sidebar.shown = true;
        },
        hideSidebar(){
            this.sidebar.shown = false;
        },
        sidebarIs(type){
            return this.sidebar.type === type;
        },
        findSidebarByType(type){
            return Object.values(this.sidebar).find(function(item){
                return ObjectUtil.isObject(item) && item.type === type;
            });
        },
        sidebarHeadline(type){
            const sidebarObj = this.findSidebarByType(type);

            return sidebarObj ? sidebarObj.headline : '';
        }
    },
}