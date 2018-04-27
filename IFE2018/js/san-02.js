var MyApp = san.defineComponent({
    template:`<div>
        <input type="text" placeholder="请输入姓名" value="{=user.name=}" required="required"> 
        <button on-click="addInfo">添加</button>
        <table style="border:1px solid #ddd">
            <thead>
                <tr>
                    <td>姓名</td><td>审核状态</td><td>操作</td>
                </tr>
            </thead>
            <tbody>
                <tr s-for="u in users">
                    <td>u.name</td>
                    <td>u.type</td>
                    <td><button s-if="isCheck" on-click="check">审核</button>
                        <button s-else on-click="delInfo">删除</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>`,
    initDate:function(){
        return{
            arr:[1,2],
            user:{
                name:"",
                type:"待审核"
            }
        }
    },
    addInfo:function(){
        let u=this.data.get("user");
        console.log(this.data.get("arr"));
        this.data.set("arr","22");
        //this.data.set("users","aa");
        console.log(this.data.get("arr"));
    }
});
var myApp = new MyApp();
myApp.attach(document.body);