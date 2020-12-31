
class DebugMp {
    constructor(options){
        this.rewriteApp()
    }

    rewriteApp(){
        const originApp = App
        
        App = (app)=>{
            ['onLaunch','onShow','onHide','onError'].forEach(item=>{
                const userDefinedMethod = app[item]
                if(item === 'onLaunch'){
                    this.getNetWorktType()
                    this.config.setLocation && this.getLocation()
                    this.config.setSystemInfo && this.getSystemInfo()
                }
                const that = this
                app[item] = function(options){
                    const breadcrumb = {
                        type:'function',
                        time:new Date().toLocaleDateString(),
                        belong:'App',
                        method:item,
                        path:options && options.path,
                        query:options && options.query,
                        scene:options && options.scene
                    }

                    that.pushTo(breadcrumb)
                    item === 'onError' && that.error({msg:options})
                    return userDefinedMethod && userDefinedMethod.call(this,options)
                }
            })
            return originApp(app)
        }
    }

    getNetWorktType(){
        wx.getNetworkType({
            success:res=>{
                this.networkType = res.networkType
            }
        })
    }

    getLocation(){
        wx.getLocation({
            type:'wgs84',
            success:res=>{
                this.locationInfo = res
            }
        })
    }

    getSystemInfo(){
        wx.getSystemInfo({
            success:res=>{
                this.systemInfo = res
            }
        })
    }





}

export const MpDebug = new DebugMp()