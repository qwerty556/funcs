
export function uniq<T>(_arr:Array<T>,..._prop:Array<string|((a:T,b:T)=>number)>) : Array<T> {
    if(_arr.length < 2)
        return _arr.slice()

    if(_prop.length === 0)
        return Array.from(new Set(_arr))

    const equals:equals<T> = getEqualsByCompares(_prop)

    const res:T[] = [_arr[0]]

    for(let i:number = 1, len:number = _arr.length|0 ; i < len ; i+=1|0)
        if(res.every((v:T)=>!equals(v,_arr[i]))){
            res.push(_arr[i])
        }

    return res
}

export function sortedUniq<T>(_sortedArr:Array<T>,..._prop:Array<string|((a:T,b:T)=>number)>) : Array<T> {

    const _arr = _sortedArr

    if(_arr.length < 2)
        return _arr.slice()

    if(_prop.length === 0)
        return Array.from(new Set(_arr))

    const equals:(a: T, b: T) => boolean = getEqualsByCompares(_prop)
    
    const res:T[] = [_arr[0]]
    
    for(let i:number = 1, len:number = _arr.length|0 ; i < len ; i+=1|0)
        if(!equals(_arr[i],_arr[i-1]))
            res.push(_arr[i])

    return res
}

export function ununiq<T>(_arr:Array<T>,..._prop:Array<string|((a:T,b:T)=>number)>) : Array<T> {
    
    const equals:(a: T, b: T) => boolean = getEqualsByCompares(_prop)
    const arrC = Array.from({length:_arr.length},_=>0) // 0:不明 1:ユニーク 2:notユニーク

    for(let i = 0 , len = _arr.length; i < len ; i+=1|0){
        if(arrC[i] !== 0)
            continue

        for(let y = i+1 , len = _arr.length; y < len ; y+=1|0){
            if(arrC[y] === 0 && equals(_arr[i],_arr[y])){
                arrC[i] = 2
                arrC[y] = 2
            }
        }

        if(arrC[i] === 0)
            arrC[i] = 1
    }

    const ununiqItemIndexs = arrC.map((n:number,i:number)=>n===2?i:-1).filter(n=>n!==-1)

    return ununiqItemIndexs.map(_=>_arr[_])
}

type equals<T> = (a:T,b:T)=>boolean

//helper 
function getEqualsByCompares<T>(comparesOrPropNames:Array<string|((a:T,b:T)=>number)>):equals<T>{
    const compares:Array<(a:T,b:T)=>number>  = comparesOrPropNames.map((propNameOrCompare:string|((a:T,b:T)=>number))=>{
        if(typeof propNameOrCompare === "string"){
            const compare = (a:T,b:T)=>{
                const propName = propNameOrCompare
                return a[propName] === b[propName] ? 0 : -1
            }

            return compare
        }
            
        const compare = propNameOrCompare
        return compare
    })

    if(compares.length === 0)
        compares.push((a:T,b:T)=>a===b?0:-1)

    const equals:equals<T> = (a:T,b:T)=>compares.every((compare)=>compare(a,b) === 0)

    return equals
}