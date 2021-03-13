export function range(start:number,end:number):number[]{
    const [small,big] = [start,end].sort((a:number,b:number)=>a-b)
    const arr:number[] = Array.from({length:Math.abs(big - small) + 1},(_:undefined,i:number)=> i + small)
    return start > end ? arr.reverse() : arr
}

export function pull<T>(arr:T[],indexOrPredicete:number|((t:T)=>boolean)):T|undefined{
    let i:number = typeof indexOrPredicete === "function"
        ? arr.findIndex(indexOrPredicete)
        : indexOrPredicete

    return i > -1 
            ? arr.splice(i,1)[0]
            :undefined
}

export function pullAll<T>(arr:T[],predicate:((t:T)=>boolean)):T[]{
    const res = []
    for(let i = arr.length-1 ; i >= 0 ; i-=1|0){
        if(predicate(arr[i])){
            res.unshift(arr.splice(i,1)[0])
        }
    }

    return res
}

export function chunk<T>(arr:T[],_size:number):Array<T[]>{
    const arr_ = arr.slice()
    const size = Math.max(1,_size)
    const chunk_ = []
    while(arr_.length > 0){
        chunk_.push(arr_.splice(0,size))
    }

    return chunk_
}

export function groupBy<T>(arr:T[],_mapper?:((t:T)=>any)):Map<any,T[]>{
    const res = new Map()
    const mapper = _mapper?_mapper:(t:T)=>t
    for(const t of arr){
        const maped = mapper(t)
        if(res.has(maped)){
            res.get(maped).push(t)
        }else{
            res.set(maped,[t])
        }
    }
    return res
}

