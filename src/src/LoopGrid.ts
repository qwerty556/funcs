declare global {
    interface GridCurrentFocus {
        H:number,
        W:number
    }

    interface GridEventHooks<T> {
        readonly beforeFocus:Array<((...args:any[])=>void)>,
        readonly afterFocus :Array<((...args:any[])=>void)>,

        readonly beforePut  :Array<((...args:any[])=>void)>,
        readonly afterPut   :Array<((...args:any[])=>void)>,
        readonly interceptPut:Array<((t:T)=>T)>,

        readonly beforeGet  :Array<((...args:any[])=>void)>,
        readonly afterGet   :Array<((...args:any[])=>void)>,
        readonly interceptGet:Array<((t:T)=>T)>,

        readonly interceptToArray:Array<((_:Array<Array<T>>)=>Array<Array<T>>)>,
    }
}

class Grid<T> {

    readonly eventHooks:GridEventHooks<T> = {
        beforeFocus:[],afterFocus:[],
        beforePut:[],afterPut:[],interceptPut:[],
        beforeGet:[],afterGet:[],interceptGet:[],
        interceptToArray:[]
    } as GridEventHooks<T>

    readonly grid:Array<Array<T>> = []
    focusW:number = 0
    focusH:number = 0
    
    private constructor(initdata:Array<Array<T>>) {
        this.grid = initdata
    }

    static of<T>(initdata:Array<Array<T>>,initfocusW=0,initfocusH=0):Grid<T>{
        return new Grid<T>(initdata).focus(initfocusW,initfocusH)
    }

    toArray():Array<Array<T>>{
        return this.eventHooks.interceptToArray.reduce((__,_)=>_(__),this.grid.map(_=>_.slice()))
    }

    eventHook(eventSetter:(eventHooks:GridEventHooks<T>)=>GridEventHooks<T>):Grid<T>{
        eventSetter(this.eventHooks)
        return this
    }

    resolutionHW(H:number,W:number):GridCurrentFocus{
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
     * @returns
     */
    focus(H:number,W:number):Grid<T>{

        this.eventHooks.beforeFocus.forEach(_=>_(...arguments))

        const resolutionHW_:GridCurrentFocus = this.resolutionHW(H,W)
        this.focusW = resolutionHW_.W
        this.focusH = resolutionHW_.H

        this.eventHooks.afterFocus.forEach(_=>_(...arguments))
        
        return this
    }

    /**
     * 相対位置でフォーカス先を指定,他はforcusメソッドと同じ
     * @param H 
     * @param W 
     * @returns 
     */
    move(H:number,W:number):Grid<T>{
        return this.focus(H+this.focusH,W+this.focusW)
    }

    currentFocus():GridCurrentFocus{
        return {
            H:this.focusH,
            W:this.focusW
        } as GridCurrentFocus
    }

    put(t:T):T{
        this.eventHooks.beforePut.forEach(_=>_(...arguments))

        const oldval:T = this.grid[this.focusH][this.focusW]
        this.grid[this.focusH][this.focusW] = this.eventHooks.interceptPut.reduce((t_:T,_)=>_(t_),t)

        this.eventHooks.afterPut.forEach(_=>_(...arguments))
        return oldval
    }

    get():T{
        this.eventHooks.beforeGet.forEach(_=>_(...arguments))
        const t_ = this.eventHooks.interceptGet.reduce((t_:T,_)=>_(t_),this.grid[this.focusH][this.focusW])
        this.eventHooks.afterGet.forEach(_=>_(...arguments))
        return t_
    }

    ref(refer:(_:Array<Array<T>>)=>Array<Array<T>>):Grid<T>{
        refer(this.grid)
        return this
    }
}


export default Grid