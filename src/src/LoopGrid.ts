declare global {
    interface LoopGridCurrentFocus {
        H:number,
        W:number
    }
}

function makeKey(H:number,W:number):string{
    return [H,W].join("|")
}

function fucusedMemo<T>(focused:Set<string>,H:number,W:number){
    const key:string = makeKey(H,W)
    const res = focused.has(key)
    if(!res){
        focused.add(key)
    }
    return res
} 

class LoopGrid<T> {
    grid:Array<Array<T>>
    focusedSet = new Set<string>()
    focusX:number = 0
    focusY:number = 0
    
    constructor(initdata:Array<Array<T>>,initFocusX=0,initFocusY=0) {
        // if( initdata.length === 0 || initdata[0].length === 0 || initdata.some(_=>_.length !== initdata[0].length)){
        //     throw Error("要素数は1以上である必要があります,子配列同士は同じ長さである必要があります")
        // }
        this.grid = initdata.map(_=>_.slice())
        this.focus(initFocusX,initFocusY)
    }

    toArray():Array<Array<T>>{
        return this.grid.map(_=>_.slice())
    }

    resolutionHW(H:number,W:number):LoopGridCurrentFocus{
        const H_ = (H < 0 
            ? H - (Math.ceil(H*-1/this.grid.length) *-1 * this.grid.length)
            : H - (Math.floor(H/this.grid.length) * this.grid.length)
        )

        const W_ = (W < 0 
            ? W - (Math.ceil(W*-1/this.grid[H_].length) *-1 * this.grid[H_].length)
            : W - (Math.floor(W/this.grid[H_].length) * this.grid[H_].length)
        )

        return {
            H:H_,
            W:W_
        }
    }

    /**
     * 絶対位置でフォーカス先を指定
     * @param H 
     * @param W 
     * @returns 対象のセルに初めてフォーカスした時はtrueそれ以外はfalse
     */
    focus(H:number,W:number):boolean{

        const resolutionHW_:LoopGridCurrentFocus = this.resolutionHW(H,W)
        this.focusX = resolutionHW_.W
        this.focusY = resolutionHW_.H
        
        return !fucusedMemo(this.focusedSet,resolutionHW_.H,resolutionHW_.W)//初回フォーカス時はtrueを返す
    }

    /**
     * 相対位置でフォーカス先を指定,他はforcusメソッドと同じ
     * @param H 
     * @param W 
     * @returns 
     */
    move(H:number,W:number):boolean{
        return this.focus(H+this.focusY,W+this.focusX)
    }

    currentFocus():LoopGridCurrentFocus{
        return {
            H:this.focusY,
            W:this.focusX
        } as LoopGridCurrentFocus
    }

    isFocused(H:number,W:number):boolean{
        const resolutionHW_:LoopGridCurrentFocus = this.resolutionHW(H,W)
        return this.focusedSet.has(makeKey(resolutionHW_.H,resolutionHW_.W))
    }

    forgetFocusedMemo(H:number,W:number):boolean{
        const resolutionHW_:LoopGridCurrentFocus = this.resolutionHW(H,W)
        return this.focusedSet.delete(makeKey(resolutionHW_.H,resolutionHW_.W))
    }

    put(t:T):T{
        const oldval:T = this.grid[this.focusY][this.focusX]
        this.grid[this.focusY][this.focusX] = t
        return oldval
    }

    get():T{
        return this.grid[this.focusY][this.focusX]
    }
}


export default LoopGrid