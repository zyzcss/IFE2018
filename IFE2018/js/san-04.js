let son = san.defineComponent({
    template: `
    <template>
    	<input type="text" placeholder="请输入要传递的消息" value="{= msg =}">
    	<button on-click="sendParent">传递</button>
    </template>`,
    inited:function() {
    	//实例初始化完成后给msg赋值
        this.data.set("msg", "");
    },
    sendParent: function () {
    	//fire派发parentClick 也可以传递信息
        this.fire("parentClick");
        //向上派发消息
        this.dispatch("UI:child-up", this.data.get("msg"));
    },

});

let parent = san.defineComponent({
	template: `
	<div>
		<myson on-parentClick="getMsg" msg="{{ msg }}"></myson>
		<p>
			我是父组件:
			<input type="text" value="{= msg =}" style="{{isGetMsg ? 'color:#f55' : ''}}">
		</p>
	</div>`,
    initData: function () {
        return {
        	isGetMsg:false
    	}
    },
    components: {
        "myson": son,
    },
    getMsg: function (doneMsg) {
    	//不进行fire派发 使用dispatch派发
    	//this.fire("parentClick");
    	this.data.set("isGetMsg",true);
    },
    messages:{
    	"UI:child-up":function(msg){
    		this.data.set("msg",msg.value);
    		this.dispatch("UI:parent-up", this.data.get("msg"));
    	}
    }
});
let parent_p=san.defineComponent({
	template: `
	<div>
		<myson msg="{{ msg }}"></myson>
		<p>
			我是更高级的父组件:
			<input type="text" value="{= msg =}" style="{{isGetMsg ? 'color:#55f' : ''}}">
		</p>
	</div>`,
    initData: function () {
        return {
        	msg: "等待消息到来",
        	isGetMsg:false
    	}
    },
    components: {
        "myson": parent
    },
    messages:{
    	"UI:parent-up":function(msg){
    		this.data.set("isGetMsg",true);
    		this.data.set("msg",msg.value);
    	}
    }
})
let myApp = new parent_p();
myApp.attach(document.body);
