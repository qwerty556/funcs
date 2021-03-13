export function sum(...nums:number[]):number{
    return nums.reduce((sum:number,n:number)=>sum+n,0)
}

export function between(small:number,big:number):(n:number)=>boolean{
    if(small > big) throw TypeError(`small=${small} big=${big}`)
    return (n:number):boolean=>small <= n && n <= big
}