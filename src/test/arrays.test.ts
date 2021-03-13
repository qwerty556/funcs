import { range,pull,pullAll,chunk } from "../src/Arrays"

describe("range",()=>{
    test("nomal",()=>{
        expect(range(0,0)).toStrictEqual([0])
        expect(range(1,1)).toStrictEqual([1])
        expect(range(0,1)).toStrictEqual([0,1])
        expect(range(0,10)).toStrictEqual([0,1,2,3,4,5,6,7,8,9,10])
        expect(range(1,10)).toStrictEqual([1,2,3,4,5,6,7,8,9,10])

        expect(range(1,0)).toStrictEqual([1,0])
        expect(range(10,0)).toStrictEqual([10,9,8,7,6,5,4,3,2,1,0])
        expect(range(10,1)).toStrictEqual([10,9,8,7,6,5,4,3,2,1])


        expect(range(0,-3)).toStrictEqual([0,-1,-2,-3])
        expect(range(-1,-3)).toStrictEqual([-1,-2,-3])
        expect(range(-3,0)).toStrictEqual([-3,-2,-1,0])
        expect(range(-3,-1)).toStrictEqual([-3,-2,-1])
        expect(range(-3,1)).toStrictEqual([-3,-2,-1,0,1])
    })
})

describe("pull",()=>{
    test("nomal",()=>{
        const _arr = [1,2,3,4]

        let arr = _arr.slice()
        expect(pull(arr,-1)).toBe(undefined)
        expect(arr).toStrictEqual(_arr)

        arr = _arr.slice()
        expect(pull(arr,0)).toBe(1)
        expect(arr).toStrictEqual([2,3,4])

        arr = _arr.slice()
        expect(pull(arr,3)).toBe(4)
        expect(arr).toStrictEqual([1,2,3])

        arr = _arr.slice()
        expect(pull(arr,4)).toBe(undefined)
        expect(arr).toStrictEqual(_arr)


        arr = _arr.slice()
        expect(pull(arr,n=>n<1)).toBe(undefined)
        expect(arr).toStrictEqual(_arr)

        arr = _arr.slice()
        expect(pull(arr,n=>n===1)).toBe(1)
        expect(arr).toStrictEqual([2,3,4])

        arr = _arr.slice()
        expect(pull(arr,n=>n===5)).toBe(undefined)
        expect(arr).toStrictEqual([1,2,3,4])
    })
})

describe("pullAll",()=>{
    test("nomal",()=>{
        const _arr = [1,2,3,4]

        let arr = _arr.slice()
        expect(pullAll(arr,n=>n===0)).toStrictEqual([])
        expect(arr).toStrictEqual(_arr)

        arr = _arr.slice()
        expect(pullAll(arr,n=>n===1)).toStrictEqual([1])
        expect(arr).toStrictEqual([2,3,4])

        arr = _arr.slice()
        expect(pullAll(arr,n=>n<=3)).toStrictEqual([1,2,3])
        expect(arr).toStrictEqual([4])

        arr = _arr.slice()
        expect(pullAll(arr,n=>n>4)).toStrictEqual([])
        expect(arr).toStrictEqual([1,2,3,4])
    })
})

describe("chunk",()=>{
    test("nomal",()=>{
        const arr = [1,2,3,4,5,6,7,8,9,10]
        const clone = arr.slice()

        expect(chunk(arr,3)).toStrictEqual([[1,2,3],[4,5,6],[7,8,9],[10]])
        expect(arr).toStrictEqual(clone)

        expect(chunk(arr,0)).toStrictEqual(chunk(arr,1))
        expect(chunk(arr,-1)).toStrictEqual(chunk(arr,1))
        expect(chunk(arr,11)).toStrictEqual([arr])
        

        expect(chunk([1,2],3)).toStrictEqual([[1,2]])
        expect(chunk([],3)).toStrictEqual([])

    })
})