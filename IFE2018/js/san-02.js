var MyApp = san.defineComponent({
    template:`<div>
        
    </div>`,
    initDate:function(){
        return{
            user:{
                name:'',
                age:null,
                info:'',
            }
        }
    },
    removeInfo:function(){
        this.data.set("user",{name:'',age:null,info:'',})
    }
});
var myApp = new MyApp();
myApp.attach(document.body);