/**
 * Single Source of true helper for lists in vuex
 */
export default class SSList {

    static idExists(cache, id){
        return cache.hasOwnProperty(id);
    }
    static exists(cache, item){
        return self.idExists(cache, item.id);
    }
    static getById(list, cache, id){
        const index = cache[id];

        self.idExists(cache, id) || throw new ReferenceError('There is no element with id '+id);
        return list[index];
    }
    static getAllByIds(list, cache, ids){
        return ids.map(id => self.getById(list, cache, id));
    }
    /**
     * add or rewrite if exists
     */
    static set(list, cache, item, set, add, addToCache){
        item.hasOwnProperty('id') || throw new ReferenceError('The property "id" is not defined on this object');

        if(self.exists(cache, item)){
            const index = cache[item.id];

            set(index, item);
        }
        else{
            add(item);
            addToCache(item.id, list.length-1);
        }
    }
    /**
     * add or rewrite if exists
     */
    static addAll(list, cache, items, set, add, addToCache){
        items.forEach((item)=>{
            self.set(list, cache, item, set, add, addToCache);
        });
    }

}
const self = SSList;
