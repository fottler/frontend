/**
 * the version where numbers before the prefix move to the phone number
 */
export default class _PhoneMask {
    constructor (prefix, mask) {
        this.prefix = prefix;
        this.mask = mask;
        this.maskArray = this.mask.split('#');
        this.numberOfDigitsInMask = this.maskArray.length-1;
    }


    rawToFormatted(raw){
        raw = raw || '';
        raw = raw.substr(0, this.numberOfDigitsInMask);

        return this.prefix + this.insertRawIntoMask(raw);
    }
    formattedToRaw(formatted){
        formatted = formatted || '';
        const prefixPos = this.prefixPosition(formatted);

        formatted = prefixPos !== false
            ? this.cutOffPrefix(formatted, prefixPos)
            : formatted;

        return formatted
            .replace(/\D/g, '')
            .substr(0, this.numberOfDigitsInMask);
    }


    insertRawIntoMask(raw){
        return [...raw].reduce((result, current, i)=>{
            return result + this.maskArray[i] + current;
        }, '');
    }
    prefixPosition(formatted){
        return formatted.substr(0, this.prefix.length) === this.prefix
            ? 0
            : formatted.substr(1, this.prefix.length) === this.prefix
                ? 1 : false;
    }
    cutOffPrefix(formatted, startPosition = 0){
        return ''
            + formatted.substr(0, startPosition)
            + formatted.substr(startPosition + this.prefix.length);
    }

}