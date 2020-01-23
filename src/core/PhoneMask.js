
export default class PhoneMask {
    constructor (prefix, mask) {
        this.prefix = prefix;
        this.mask = mask;
        this.maskArray = this.mask.split('#');
        this.numberOfDigitsInMask = this.maskArray.length-1;
    }


    rawToFormatted(raw){
        raw = raw || '';
        raw = raw.substring(0, this.numberOfDigitsInMask);

        return this.prefix + this.insertRawIntoMask(raw);
    }
    formattedToRaw(formatted){
        formatted = formatted || '';
        formatted = this.containsPrefix(formatted)
            ? this.cutOffPrefix(formatted)
            : '';

        return formatted
            .replace(/\D/g, '')
            .substring(0, this.numberOfDigitsInMask);
    }


    insertRawIntoMask(raw){
        return [...raw].reduce((result, current, i)=>{
            return result + this.maskArray[i] + current;
        }, '');
    }
    containsPrefix(formatted){
        return formatted.substring(0, this.prefix.length) === this.prefix;
    }
    cutOffPrefix(formatted){
        return formatted.substring(this.prefix.length);
    }

}