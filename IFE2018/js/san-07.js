import styles from "../../css/san-07.css"
let app=san.defineComponent({
	template:`
	<div>
	  <button on-click="toggle">TOGGLE</button>
	  <span s-if="show" s-transition="hook">
	    Transition Layer
	  </span>
	</div>`,
	initData:function(){
		return {show: true};
	},
	toggle:function(){
		this.data.set("show",!this.data.get('show'));
	},
	hook:{
		enter: function (el, done) {
			//不能生效 为什么done函数为空？
			el.classList.remove("leave");
			el.classList.add("before-enter");
			el.classList.add("enter");
			el.classList.remove("before-enter");
			done();
        	},
		
    	leave: function (el, done) {
			el.classList.remove("enter");
			el.classList.add("before-leave");
			el.classList.add("leave");
			el.classList.remove("before-leave");
			//使用延时器会有BUG
			//el.style.opacity获取为空 不能用if判断
			setTimeout(done,500);
    	}    
	}
})
let myApp=new app();
myApp.attach(document.body);
