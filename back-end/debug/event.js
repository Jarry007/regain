class _Event{
    constructor(){
        this.msg = {}
    }

    subscribe(key,fn){
        if(typeof fn !== 'function') return
        if(!this.msg[key]){
            this.msg[key] = []
        }
        this.msg[key].push(fn)
    }

    publish(){
        const key = Array.prototype.shift.call(arguments)
        let cb = this.msg[key]
        if(!cb||!cb.length) return
        cb.forEach(element => {
         element.apply(null,arguments)   
        });
    }

    remove(key,fn){
        const fns = this.msg[key]
        if(!fns) return
        if(!fn) return delete this.msg[key]
        for(let i =0;i<fns.length;i++){
            const item = fns[i]
            if(item===fn || item.fn === fn){
                fns.splice(i,1)
                break
            } 
        }
    }
}

export const Event = _Event