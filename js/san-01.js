var MyApp = san.defineComponent({
    template:`<div>
        <input type="text" placeholder="请输入姓名" value="{=user.name=}"> 
        <input type="number" placeholder="请输入年龄" value="{=user.age=}"> 
        <input type="text" placeholder="请输入简介" value="{=user.info=}">
        <div>
            信息: <button on-click="removeInfo">移除信息</button>
            <p>姓名:<span style="text-decoration:underline">　{{user.name}}　</span></p>
            <p>年龄:<span style="text-decoration:underline">　{{user.age}}　</span></p>
            <p>简介:<span style="text-decoration:underline">　{{user.info}}　</span></p>
        </div>
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