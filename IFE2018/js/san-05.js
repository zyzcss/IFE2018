//导入css
import '../../css/input.css';
//checkbox组中的父选项
let sonCheckboxGroup = san.defineComponent({
    template: `
    <template>
   		<label>
    	<input type="checkbox" 
    	checked="{=isAllCheck=}" 
    	disabled="{{disabled}}"
    	indeterminate="{=isHaveCheck=}" 
    	on-change="sendGroup(isAllCheck)">
    	<span class="{{isHaveCheck?'ind':''}}"></span>{{name}}</label>
    </template>`,
    sendGroup:function(isAllCheck,group){
    	//console.log(this.data.get("disabled"))
    	this.data.set("isHaveCheck",null);
    	this.dispatch("UI:group",isAllCheck);
    }
});
//checkbox组中的子选项
let sonCheckbox = san.defineComponent({
    template: `
    <template>
    	<label>
    	<input type="checkbox" 
    	checked="{=checkeds=}" 
    	value="{{name}}"
    	on-change="sendParent(checkeds)">
    	<span></span>{{name}}</label>
    </template>`,
    sendParent:function(checkeds){
    	this.dispatch("UI:child-up",checkeds);
    }
});
let sanInput=san.defineComponent({
	template: `
	<template>
		<input type="text" 
		placeholder="{{placehold}}"
		value="{=value=}"
		readonly="{{readonly?readonly:'false'}}"
		disabled="{{disabled?disabled:'false'}}"
		on-input="validate(type,value)"
		class="{{myclass?myclass:''}}">
		<span s-if="{{isSuccess==false}}">{{errorMsg}}</span>
	</template>`,
	initData:function(){
		return{
			myclass:"",
			isSuccess:null
		}
	},
	validate:function(type,value){
		//如果传入了type
		if(type){
			let patt;
			//检测type类型
			switch(type){
				case "email":
					patt=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
					break;
				case "number":
					patt=/^[0-9]*[1-9][0-9]*$/;
					break;
			}
			if(patt){
				//验证 改变class并上传到父组件
				let isSuccess=patt.test(value);
				this.data.set("isSuccess",isSuccess);
				this.dispatch("UI:validate",isSuccess);
				if(isSuccess){
					this.data.set("myclass","success")
				}else{
					this.data.set("myclass","error");
				}
				
			}
		}
	}
});
//checkbox组 合并了父选项和子选型
let checkGroup = san.defineComponent({
	template: `
	<div>
		<ul>
			<group-check 
			name="{{hobby.name}}" 
			group="{{index}}" 
			isAllCheck="{{hobby.isAllCheck}}"
			isHaveCheck="{{hobby.isHaveCheck}}"
			disabled="{{disabled}}"></group-check>
			<li s-for="i in hobby.list">
				<list-check 
				name="{{i}}" 
				checkeds="{=checkeds=}" ></list-check>
			</li>
		</ul>
	</div>`,
    components: {
        "group-check": sonCheckboxGroup,
        "list-check":sonCheckbox
    },
    messages:{
    	"UI:child-up":function(msg){
    		//根据分组和选中项来让父组件的样式改变
    		let arr=this.data.get("hobby").list;
    		let list=this.arrGet(msg.value,arr);
    		this.data.set("hobby.isAllCheck",false);
    		if(list.length==0){
    			this.data.set("hobby.isHaveCheck",null);
    		}else if(list.length<arr.length){
    			this.data.set("hobby.isHaveCheck",true);
    		}else{
    			this.data.set("hobby.isHaveCheck",null);
    			this.data.set("hobby.isAllCheck",true);
    		}
    	},
    	"UI:group":function(msg){
    		//根据父组件的样式改变子组件
    		let isCheck=msg.value;
    		let myList=this.data.get("hobby").list;
    		if(isCheck){
    			this.data.set("checkeds",this.data.get("checkeds").concat(myList));
    		}else{
    			let arr=this.arrSub(this.data.get("checkeds"),myList);
    			this.data.set("checkeds",arr);
    		}
    	}
    },
    //arr1减去arr2
    arrSub:function(arr1,arr2){
    	let k=0;
    	let arr=[];
    	for(let i=arr1.length-1;i>=0;i--){
    		for(let j=0;j<arr2.length;j++){
    			if(arr1[i]==arr2[j]){
    				k=1;
    			}
    		}
    		if(k==0)arr.push(arr1[i]);
    		k=0;
    	}
    	return arr;
    },
    //arr1与arr2相交的项
    arrGet:function(arr1,arr2){
    	let k=0;
    	let arr=[];
    	for(let i=arr1.length-1;i>=0;i--){
    		for(let j=0;j<arr2.length;j++){
    			if(arr1[i]==arr2[j]){
    				k=1;
    			}
    		}
    		if(k==1)arr.push(arr1[i]);
    		k=0;
    	}
    	return arr;
    }
});
let parent=san.defineComponent({
	/*
		san-input
		placehold,type,errorMsg,readonly,disabled
		提示信息  类型 错误信息 是否只读 是否可用
		check
		hobby,checkeds,disable
		数据源 选中的项 是否禁用父类
	*/
	template:`
	<div>
		<san-input
	    placehold="请输入邮箱"
	    type="email"
	    errorMsg="请输入正确的邮箱"
	    readonly="false"></san-input>
		<san-input
	    value="hello"
	    readonly="true"></san-input>
		<san-input
	    value="san"
	    disabled="true"></san-input>
	    <check hobby="{{hobbys[0]}}" checkeds="{=checkeds=}" disabled="false"></check>
	    <check hobby="{{hobbys[1]}}" checkeds="{=checkeds=}" disabled="true"></check>
		<button on-click="lookInfos">查看所选项（控制台）</button>
	</div>`,
	components:{
		"san-input":sanInput,
		"check":checkGroup
	},
	initData:function(){
		return{
			hobbys:[{name:"娱乐(可勾选父类)",list:["吃饭","睡觉","码代码"],isAllCheck:false,isHaveCheck:null},
        	{name:"娱乐(不勾选父类)",list:["吃饭啊","睡觉啊","码代码啊"],isAllCheck:false,isHaveCheck:null}],
        	checkeds:[]
		}
	},
	lookInfos:function(){
		console.log(this.data.get("checkeds"))
	}
	
})
let myApp = new parent();
myApp.attach(document.body);
