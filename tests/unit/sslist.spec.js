import { expect } from 'chai/lib/chai'
import SSList from "@/core/SSList";

const
    list = ()=>[
      {id: 1, text: '1 item'},
      {id: 2, text: '2 item'},
      {id: 5, text: '5 item'},
      {id: 0, text: '0 item'}
    ],
    cache = ()=>{
      return {
        0: 3,
        1: 0,
        2: 1,
        5: 2
      }
    };



describe('SSList.idExists', () => {
  it('find 0', () => {
    const result = SSList.idExists(cache(), 0);
    expect(result).to.be.true;
  });
  it('find 2', () => {
    const result = SSList.idExists(cache(), 2);
    expect(result).to.be.true;
  });
  it('not find 3', () => {
    const result = SSList.idExists(cache(), 3);
    expect(result).to.be.false;
  });
  it('find \'2\'', () => {
    const result = SSList.idExists(cache(), '2');
    expect(result).to.be.true;
  });
  it('not find null', () => {
    const result = SSList.idExists(cache(), null);
    expect(result).to.be.false;
  });
  it('not find undefined', () => {
    const result = SSList.idExists(cache(), undefined);
    expect(result).to.be.false;
  });
});
describe('SSList.exists', () => {
  it('find with id 2', () => {
    const result = SSList.exists(cache(), {id:2,text:''});
    expect(result).to.be.true;
  });
  it('not find with id 3', () => {
    const result = SSList.exists(cache(), {id:3,text:''});
    expect(result).to.be.false;
  });
});
describe('SSList.getById', () => {
  it('find 0', () => {
    const result = SSList.getById(list(), cache(), 0);
    expect(result).to.eql({id: 0, text: '0 item'});
  });
  it('find 2', () => {
    const result = SSList.getById(list(), cache(), 2);
    expect(result).to.eql({id: 2, text: '2 item'});
  });
    it('find \'2\'', () => {
        const result = SSList.getById(list(), cache(), '2');
        expect(result).to.eql({id: 2, text: '2 item'});
    });
  it('not find 3', () => {
    expect(()=>{
        SSList.getById(list(), cache(), 3)
    }).to.throw(ReferenceError);
  });
  it('not find null', () => {
    expect(()=>{
        SSList.getById(list(), cache(), null)
    }).to.throw(ReferenceError);
  });
  it('not find undefined', () => {
    expect(()=>{
        SSList.getById(list(), cache(), undefined)
    }).to.throw(ReferenceError);
  });
});
describe('SSList.getAllByIds', () => {
  it('get full array', () => {
    const result = SSList.getAllByIds(list(), cache(), [1,2,5,0]);
    expect(result).to.eql(list());
  });
  it('get[1,0]', () => {
    const result = SSList.getAllByIds(list(), cache(), [1,0]);
    expect(result).to.eql([
      {id: 1, text: '1 item'},
      {id: 0, text: '0 item'}
    ]);
  });
    it('get []', () => {
        const result = SSList.getAllByIds(list(), cache(), []);
        expect(result).to.eql([]);
    });
  it('get [1,0,3,4,null,undefined,\'2\']', () => {
    expect(()=>{
        SSList.getAllByIds(list(), cache(), [1,0,3,4,null,undefined,'2'])
    }).to.throw(ReferenceError);
  });
  it('get[-1,0,5,1]', () => {
    expect(()=>{
        SSList.getAllByIds(list(), cache(), [-1,0,5,1])
    }).to.throw(ReferenceError);
  });
});
describe('SSList.add', () => {
  it('add item 3', () => {
    const
        newList = list(),
        newCache = cache();
    SSList.set(newList, newCache, {id:3, text:'3 item'},
        (i, item)=>newList[i]=item,
        (item)=>newList.push(item),
        (key, value)=>newCache[key]=value
    );

    expect(newCache).to.eql({
      0: 3,
      1: 0,
      2: 1,
      3: 4,
      5: 2
    });
    expect(newList).to.eql([
      {id: 1, text: '1 item'},
      {id: 2, text: '2 item'},
      {id: 5, text: '5 item'},
      {id: 0, text: '0 item'},
      {id:3, text:'3 item'}
    ]);
  });
    it('add items 3, 3', () => {
        const
            newList = list(),
            newCache = cache();
        SSList.set(newList, newCache, {id:3, text:'3 item'},
            (i, item)=>newList[i]=item,
            (item)=>newList.push(item),
            (key, value)=>newCache[key]=value
        );
        SSList.set(newList, newCache, {id:3, text:'31 item'},
            (i, item)=>newList[i]=item,
            (item)=>newList.push(item),
            (key, value)=>newCache[key]=value
        );

        expect(newCache).to.eql({
            0: 3,
            1: 0,
            2: 1,
            3: 4,
            5: 2
        });
        expect(newList).to.eql([
            {id: 1, text: '1 item'},
            {id: 2, text: '2 item'},
            {id: 5, text: '5 item'},
            {id: 0, text: '0 item'},
            {id:3, text:'31 item'}
        ]);
    });
  it('add item without id', () => {
    expect(()=>{
      SSList.set(list(), cache(), {text:'item'}, ()=>{}, ()=>{}, ()=>{});
    }).to.throw(ReferenceError);
  });
});
describe('SSList.addAll', () => {
    it('add 3,4,5', () => {
    const
        newList = list(),
        newCache = cache();
    SSList.addAll(newList, newCache, [
        {id:3, text:'3 item'},
        {id:4, text:'4 item'},
        {id:6, text:'6 item'}
    ],
        (i, item)=>newList[i]=item,
        (item)=>newList.push(item),
        (key, value)=>newCache[key]=value
    );

    expect(newCache).to.eql({
        0: 3,
        1: 0,
        2: 1,
        3: 4,
        4: 5,
        5: 2,
        6: 6
    });
    expect(newList).to.eql([
        {id: 1, text: '1 item'},
        {id: 2, text: '2 item'},
        {id: 5, text: '5 item'},
        {id: 0, text: '0 item'},
        {id:3, text:'3 item'},
        {id:4, text:'4 item'},
        {id:6, text:'6 item'}
    ]);
  });
    it('add 1,2,5,6', () => {
        const
            newList = list(),
            newCache = cache();
        SSList.addAll(newList, newCache, [
            {id:1, text:'11 item'},
            {id:2, text:'22 item'},
            {id:5, text:'55 item'},
            {id:6, text:'6 item'}
        ],
            (i, item)=>newList[i]=item,
            (item)=>newList.push(item),
            (key, value)=>newCache[key]=value
        );

        expect(newCache).to.eql({
            0: 3,
            1: 0,
            2: 1,
            5: 2,
            6: 4
        });
        expect(newList).to.eql([
            {id: 1, text: '11 item'},
            {id: 2, text: '22 item'},
            {id: 5, text: '55 item'},
            {id: 0, text: '0 item'},
            {id:6, text:'6 item'}
        ]);
    });
    it('add 3,3,3,6', () => {
        const
            newList = list(),
            newCache = cache();
        SSList.addAll(newList, newCache, [
            {id:3, text:'3 item'},
            {id:3, text:'31 item'},
            {id:3, text:'32 item'},
            {id:6, text:'6 item'}
        ],
            (i, item)=>newList[i]=item,
            (item)=>newList.push(item),
            (key, value)=>newCache[key]=value
        );

        expect(newCache).to.eql({
            0: 3,
            1: 0,
            2: 1,
            3: 4,
            5: 2,
            6: 5
        });
        expect(newList).to.eql([
            {id: 1, text: '1 item'},
            {id: 2, text: '2 item'},
            {id: 5, text: '5 item'},
            {id: 0, text: '0 item'},
            {id:3, text:'32 item'},
            {id:6, text:'6 item'}
        ]);
    });
    it('add without id', () => {
        expect(()=>{
          SSList.addAll(list(), cache(), [
              {id:3, text:'3 item'},
              {id:3, text:'31 item'},
              {text:'32 item'},
              {id:6, text:'6 item'}
          ], ()=>{}, ()=>{}, ()=>{});
        }).to.throw(ReferenceError);
    });
});
