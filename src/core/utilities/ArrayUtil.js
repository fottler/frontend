
export default class ArrayUtil {

    static getLastElement = array => array[array.length - 1];

    static removeByValue(array, item){
        const index = array.indexOf(item);
        if (index !== -1) array.splice(index, 1);
    }
    static getChosenOptions(options, chosen, keyProperty = 'id'){
        const chosenStr = chosen.map(item => ''+item);

        return Object
            .values(options)
            .filter((item)=>
                chosenStr.includes(''+item[keyProperty])
            );
    }
    static chosenOptionsToString(options, chosen, keyProperty = 'id', valueProperty = 'title'){
        return ArrayUtil.getChosenOptions(options, chosen, keyProperty)
                        .map(item=>item[valueProperty]).join(', ');
    }
    static toString(array, property, delimiter = ', '){
        return array.map((item)=>{
            return property ? item[property] : item;
        }).join(delimiter);
    }
    static isEmpty(array){
        return Array.isArray(array) && !array.length;
    }

}

