class _Config {
    constructor(options){
        this.config = {
            version:'1.0.0',
            setSystemInfo:false,
            setLocation:false,
            key:'',
            delay:1000,
            url:'',
            except:[
                /^Script error\.?/,
                /^Javascript error:Script error\.? on line 0/
            ],
            random:1,
            repeat:5
        }
        this.config = Object.assign(this.config,options)
    }

    get(name){
        return this.config[name]
    }

    set(name,value){
        this.config[name] = value
        return this.config[name]
    }
}

export const Config = _Config 