export {};

declare global {
    interface Array<T> {
        pipe<T>(fn1:(a:T[])=>any):any
    }
}

Array.prototype.pipe = function<T>(fn:(a:T[])=>any):any{
    return fn(this)
}