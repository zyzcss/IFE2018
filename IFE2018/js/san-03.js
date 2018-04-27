var MyApp = san.defineComponent({
    template: 
    `<div>
    <p class="{{!isToggle ? ' bkg' : ''}}" style="{{isToggle ? 'background:' + color : ''}}">hello san!</p>
    <button on-click="changeClass(isToggle)">切换样式(class)</button>
    <button on-click="changeStyle(isToggle)">切换样式(style)</button>
    </div>`,
    initData: function () {
        return {
           	isToggle:true,
           	color:'#5ff'
        };
    },
    changeClass:function(isToggle){
    	this.data.set("isToggle",!isToggle);
    },
    changeStyle:function(isToggle){
    	this.data.set("isToggle",!isToggle);
    }
    
});
var myApp = new MyApp();
myApp.attach(document.body);
