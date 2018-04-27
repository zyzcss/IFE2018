var MyApp = san.defineComponent({
    template:`<div>
        <input type="text" placeholder="请输入姓名" value="{=user.name=}" required="required"> 
        <button on-click="addInfo">添加</button>
        <table border="1" style="border:1px solid #ccc;border-collapse: collapse">
            <thead>
                <tr>
                    <td>姓名</td><td>审核状态</td><td>操作</td>
                </tr>
            </thead>
            <tbody>
                <tr s-for="u,index in users" s-transition="opacityTrans">
                    <td>{{u.name}}</td>
                    <td>{{u.type}}</td>
                    <td>
                        <button s-if="!u.isCheck" on-click="check(index,u.rank)">审核</button>
                        <button s-else on-click="delInfo(index)">删除</button>
                    </td>
                    <td s-if="!u.isCheck">
                        <select value="{=u.rank=}" >
                          <option value ="不及格">不及格</option>
                          <option value ="及格">及格</option>
                          <option value="良好">良好</option>
                          <option value="优秀">优秀</option>
                        </select>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>`,
    initData:function(){
        return{
            users:[],
            user:{
                name:"",
                type:"待审核",
                isCheck:false,
                rank:"不及格"
            },
            
            
        }
    },
    addInfo:function(){
        let u=this.data.get("user");
        this.data.push("users",u);
        this.data.set("user",{name:"",type:"待审核",isCheck:false,rank:"不及格"})
    },
    delInfo:function(index){
        this.data.removeAt("users",index);
    },
    check:function(index,rank){
        console.log(rank)
        this.data.set("users["+index+"].isCheck",true);
        this.data.set("users["+index+"].type",rank);
    },
    opacityTrans: {
        enter: function (el, done) {
            var steps = 20;
            var currentStep = 0;

            function goStep() {
                if (currentStep >= steps) {
                    el.style.opacity = 1;
                    done();
                    return;
                }

                el.style.opacity = 1 / steps * currentStep++;
                requestAnimationFrame(goStep);
            }

            goStep();
        },

        leave: function (el, done) {
            var steps = 20;
            var currentStep = 0;
            function goStep() {
                if (currentStep >= steps) {
                    el.style.opacity = 0;
                    done();
                    return;
                }
                el.style.opacity = 1 - 1 / steps * currentStep++;
                requestAnimationFrame(goStep);
            }

            goStep();
        }
    }
});
var myApp = new MyApp();
myApp.attach(document.body);