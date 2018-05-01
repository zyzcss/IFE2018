import styles from "../../css/san-08.css"
let panel=san.defineComponent({
	/*
		根据isUp决定小三角形是朝上还是朝下
		使用s-transition来制作动画
		插槽决定类型 数据由外界传入
	*/
	template:`<div class="box">
		<span class="title"><slot name="title"></slot></span>
		<div class="{{isUp?'up':'down'}}" on-click="{{change}}"></div>
		<div class="content" s-if="{{isUp}}" s-transition="upAndDown">
			<slot name="content"></slot>
		</div>
	</div>`,
	change:function(){
		this.data.set("isUp",!this.data.get("isUp"))
	},
	updated:function(){
		console.log("i'm updated 更新,isUp:",this.data.get("isUp"));
	},
	upAndDown:{
		//根据官方文档制作的过渡效果 高度变化
		enter: function (el, done) {
            var steps = 20;
            var currentStep = 0;
            let height=el.offsetHeight;
            function goStep() {
                if (currentStep >= steps) {
                    el.style.height = height+"px";
                    done();
                    return;
                }
                el.style.height = (height / steps * currentStep++)+"px";
                requestAnimationFrame(goStep);
            }
            goStep();
        },
        leave: function (el, done) {
            var steps = 20;
            var currentStep = 0;
            let height=el.offsetHeight;
            function goStep() {
                if (currentStep >= steps) {
                    el.style.height = "0px";
                    done();
                    return;
                }
                el.style.height = (height - height / steps * currentStep++)+"px";
                requestAnimationFrame(goStep);
            }
            goStep();
        }
	}
})
let myApp=san.defineComponent({
	/*
		isUp是卡片一开始的初始状态 缩小的
	*/
	template:`<div>
		<panel isUp="{{isUp}}" s-if="{{!isUp}}">
			<slot slot="title">标题一(生命周期见console)</slot>
			<slot slot="content">
				{{myContent}}
			</slot>
		</panel>
		<panel isUp="{{isUp}}">
			<slot slot="title">标题二</slot>
			<slot slot="content">
				{{myContent}}
			</slot>
		</panel>
		<panel isUp="{{isUp}}">
			<slot slot="title">标题三</slot>
			<slot slot="content">
				我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容
				我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容
				我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容
			</slot>
		</panel>
	</div>`,
	compiled:function(){
		console.log("i'm compiled 我的数据还未加载 所以是"+this.data);
		//this.data.set("myContent","我是");
	},
	initData:function(){
		return{
			isUp:true,
			myContent:"asdasd"
		}
	},
	inited:function(){
		console.log("我是initData中初始化的数据,isUp:"+this.data.get("isUp"))
		//修改了initData中的isUp
		this.data.set("isUp",false);
		console.log("i'm inited我的数据已经加载且在initData后，可以修改initData的值,isUp:",this.data.get("isUp"));
		//设置了myContent的内容
		this.data.set("myContent",`我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容
				我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容
				我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容`);
		
	},
	created:function(){
		this.data.set("isUp",true);
		//组件创建完成 修改数据会修改inited中的数据
		console.log("i'm created,isUp:",this.data.get("isUp"));
		
	},
	attached:function(){
		this.data.set("isUp",false);
		//组件被装载
		console.log("i'm attached,isUp:",this.data.get("isUp"));
	},
	detached:function(){
		//调用app.dispose();时触发
		this.data.set("isUp",true);
		console.log("i'm detached 卸载组件时会调用我,isUp:",this.data.get("isUp"));
	},
	disposed:function(){
		//调用app.dispose(); 且组件以被卸载完成调用
		this.data.set("isUp",false);
		console.log("i'm disposed 组件卸载调用我,isUp:",this.data.get("isUp"));
	},
	components:{
		"panel":panel
	},

})
console.log("在每个生命周期都改变isUp的值 观察值的变化以及加载顺序");
console.log("第一次创建组件开始————————");
let app=new myApp();
console.log("第一次创建组件结束————————");
console.log("删除组件开始——————————");
//卸载组件
app.dispose();
console.log("删除组件结束——————————");
console.log("第二次创建组件开始——————");
app=new myApp();
console.log("第二次创建组件结束——————");
//插入html中
app.attach(document.body);