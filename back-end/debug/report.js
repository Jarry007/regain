import Config from './config'

class Report {
    constructor(options){
        this.errorQueue = []
        this.repeatList = {}
        this.config = new Config().config
        
    }
}