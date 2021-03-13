

import {uniq , sortedUniq, ununiq} from "../src/Uniq"

describe("uniq",()=>{
    const arr = [
        {
            aaa:"a1",
            bbb:1,
            ccc:"c1"
        },
        {
            aaa:"a2",
            bbb:2,
            ccc:"c2"
        },
        {
            aaa:"a1",
            bbb:1
        }
    ]

    test("normal",()=>{
        expect(uniq(arr.concat(arr))).toStrictEqual(arr)
    })

    test("prop",()=>{
        expect(uniq(arr.concat(arr),"aaa")).toStrictEqual(arr.slice(0,2))
        expect(uniq(arr.concat(arr),"bbb")).toStrictEqual(arr.slice(0,2))
        expect(uniq(arr.concat(arr),(a,b)=>a.bbb - b.bbb)).toStrictEqual(arr.slice(0,2))
        expect(uniq(arr.concat(arr),"aaa","ccc")).toStrictEqual(arr)
    })

    test("empty",()=>{
        expect(uniq([])).toStrictEqual([])
    })
})

describe("sortedUniq",()=>{
    const arr = [1,3,3,5,7,3,3,3,5]

    test("normal",()=>{
        expect(sortedUniq(arr)).toStrictEqual(uniq(arr))
    })

    test("prop",()=>{
        expect(sortedUniq(arr,(a,b)=>a-b)).toStrictEqual([1,3,5,7,3,5]) // bad
        expect(sortedUniq(arr.slice().sort((a,b)=>a-b),(a,b)=>a-b)).toStrictEqual([1,3,5,7]) //good
    })

    test("empty",()=>{
        expect(sortedUniq([])).toStrictEqual([])
    })
})

describe("ununiq",()=>{
    const arr = [1,3,3,5,7,3,3,3,5]

    test("normal",()=>{
        expect(ununiq(arr)).toStrictEqual([3,3,5,3,3,3,5])
    })

    test("prop",()=>{
        expect(ununiq(arr,(a,b)=>a-b)).toStrictEqual([3,3,5,3,3,3,5])
        expect(ununiq([2,3,4,6,7],(a,b)=>Math.floor(a/2)-Math.floor(b/2))).toStrictEqual([2,3,6,7])
    })

    test("empty",()=>{
        expect(ununiq([])).toStrictEqual([])
    })
})