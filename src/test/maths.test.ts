import { sum , between } from "../src/Maths"

describe("sum",()=>{
    test("nomal",()=>{
        expect(sum(...[1,5,10])).toBe(16)
        expect(sum(...[1])).toBe(1)
        expect(sum(...[])).toBe(0)
        expect(sum(...[0])).toBe(0)
        expect(sum(...[-0])).toBe(0)
        expect(sum(...[+0])).toBe(0)
        expect(sum(...[0,0,0,0])).toBe(0)
        expect(sum(...[0,0,0,0,2])).toBe(2)

        expect(sum(...[-1,-5,-10])).toBe(-16)

        expect(sum(...[-1,5,0,-0,+0,+10])).toBe(14)
        expect(sum(...[0,5,3,2,1,Infinity])).toBe(Infinity)
        expect(sum(...[0,5,3,2,1,-Infinity])).toBe(-Infinity)

        expect(sum(...[-Infinity,Infinity])).toBe(Number.NaN)
        expect(sum(...[0,5,3,2,1,-Infinity,Infinity])).toBe(Number.NaN)
        expect(sum(...[0,5,3,2,1,-Infinity,Infinity,Infinity])).toBe(Number.NaN)

        expect(sum(...[Infinity,Infinity])).toBe(Infinity)
        expect(sum(...[0,5,3,2,1,Infinity,Infinity])).toBe(Infinity)

        expect(sum(...[-Infinity,-Infinity])).toBe(-Infinity)
        expect(sum(...[0,5,3,2,1,-Infinity,-Infinity])).toBe(-Infinity)
    })
})

describe("between",()=>{
    test("nomal",()=>{
        expect(typeof between(5,10)).toBe("function")
        expect([5,6,7,8,9].every(between(5,9))).toBe(true)
        expect([4,5,6,7,8,9].every(between(5,9))).toBe(false)
        expect([5,6,7,8,9,10].every(between(5,9))).toBe(false)

        expect([-2,-1,-0,0,+0,1,2,3].every(between(-2,3))).toBe(true)
        expect([-3,-2,-1,-0,0,+0,1,2,3].every(between(-2,3))).toBe(false)
        expect([-2,-1,-0,0,+0,1,2,3,4].every(between(-2,3))).toBe(false)

        expect([-0,0,+0,1,2,3].every(between(-0,3))).toBe(true)
        expect([-0,0,+0,1,2,3].every(between(0,3))).toBe(true)
        expect([-0,0,+0,1,2,3].every(between(+0,3))).toBe(true)

        expect(()=>between(2,1)).toThrow(TypeError)
    })
})