import { expect } from 'chai/lib/chai'
import PhoneMask from "@/core/PhoneMask";
import User from "@/modules/user/models/User";

const fabric = ()=>new PhoneMask(User.phoneMask.prefix, User.phoneMask.mask);

describe('PhoneMask.rawToFormatted', () => {
  it('correct formatted if too many symbols', () => {
    const result = fabric().rawToFormatted('9611636979111');
    expect(result).to.equal('+7 (961) 163-69-79');
  });
  it('correct formatted from 961', () => {
    const result = fabric().rawToFormatted('961');
    expect(result).to.equal('+7 (961');
  });
  it('correct formatted from 9611636', () => {
    const result = fabric().rawToFormatted('9611636');
    expect(result).to.equal('+7 (961) 163-6');
  });
  it('correct formatted from 79611636', () => {
    const result = fabric().rawToFormatted('79611636');
    expect(result).to.equal('+7 (796) 116-36');
  });
  it('correct formatted from empty', () => {
    const result = fabric().rawToFormatted('');
    expect(result).to.equal('+7');
  });
});
describe('PhoneMask.formattedToRaw', () => {
  it('correct raw from correct formatted', () => {
    const result = fabric().formattedToRaw('+7 (961) 163-69-79');
    expect(result).to.equal('9611636979');
  });
  it('correct raw from formatted with non numeric symbols', () => {
    const result = fabric().formattedToRaw('+7 (961) 16asd3-6  9-79');
    expect(result).to.equal('9611636979');
  });
  it('correct raw from formatted with too many numbers', () => {
    const result = fabric().formattedToRaw('+7 (961) 163-69-79111');
    expect(result).to.equal('9611636979');
  });
  it('correct raw from short formatted', () => {
    const result = fabric().formattedToRaw('+7 (961) 163-');
    expect(result).to.equal('961163');
  });
  it('correct raw from even shorter formatted', () => {
    const result = fabric().formattedToRaw('+7 (961) ');
    expect(result).to.equal('961');
  });
  /*it('correct raw from short formatted without leading 7', () => {
    const result = fabric().formattedToRaw('+ (961) ');
    expect(result).to.equal('961');
  });*/
  it('correct raw from empty', () => {
    const result = fabric().formattedToRaw('');
    expect(result).to.equal('');
  });
  it('correct raw from non numeric', () => {
    const result = fabric().formattedToRaw('+te st');
    expect(result).to.equal('');
  });
  it('correct raw from number before +7', () => {
    const result = fabric().formattedToRaw('9+7');
    expect(result).to.equal('');
  });
  it('correct raw from number before +7 and numbers after', () => {
    const result = fabric().formattedToRaw('9+7 (611)');
    expect(result).to.equal('');
  });
  it('correct raw from number before +7 and numbers after. #2', () => {
    const result = fabric().formattedToRaw('+97 (611)');
    expect(result).to.equal('');
  });
});
