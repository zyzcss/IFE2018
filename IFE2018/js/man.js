var MyApp = san.defineComponent({
    template: 
    `<ul>
    <li s-for="item in news" on-click="delNews(news)">{{item}}</li>
    <p>{{!!isOK}}你好{{name}}</p>
    <input type="button" on-click="changeOk(isOK)" value="{{isOK}}">
    <p s-html="rawHTML" s-if="isHidden" s-transition="opacityTrans"></p>
    {{rawHTML | raw}}
    {{num}}
    <div on-click="capture:mainClick" style="background:#000">
    	<button on-click="capture:btnClick">click</button>
    </div>
    <div>
	    <label><input type="checkbox" value="errorrik" checked="{= online =}">errorrik</label>
	    <label><input type="checkbox" value="otakustay" checked="{= online =}">otakustay</label>
	    <label><input type="checkbox" value="firede" checked="{= online =}">firede</label>
	</div>
    </ul>`,
    initData: function () {
        return {
            name: 'San',
           	news:['san', 'er', 'esui', 'etpl', 'esl'],
           	isOK:true,
           	rawHTML:"<strong>html</strong>",
           	user:{
           		"name":"zzz"
           	},
           	num:1,
           	isHidden:true,
           	online:[]
        };
    },
    changeOk:function(isOK){
    	//set
    	this.data.set("isOK",!isOK);
    	//get
    	console.log(this.data.raw.news)
    	//合并
    	this.data.merge("user",{"pass":"123"})
    	console.log(this.data.raw.user)
    	//执行方法
    	this.numToDouble();
    	//数组方法
    	this.data.splice('news',[1,2,"aaa"]);
    	console.log(this.data.raw.news)
    	this.data.set("isHidden",!this.data.get("isHidden"));
    	console.log(this.data.get("online"))
    },
    delNews:function(news){
    	//this.data.set("rawHTML",news)
    	//console.log(this.data.raw.news)
    	this.data.shift("news");
    },
    numToDouble:function(){
    	this.data.apply("num",function(num){
    		return num*2
    	})
    	console.log(this.data.raw.num)
    },
    btnClick:function(){
    	console.log("son");
    },
    mainClick:function(){
    	console.log("father");
    },
    updated: function () {
        console.log(this.data.get('online'));
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
var Men = san.defineComponent({
    template: '<div>'
      + '<slot s-for="item in data" var-n="item.name" var-email="item.email" var-sex="item.sex ? \'male\' : \'female\'">'
        + '<p>{{n}},{{sex}},{{email}}</p>'
      + '</slot>'
      + '</div>'
});

var MyComponent = san.defineComponent({
    components: {
        'x-men': Men
    },

    template: '<div><x-men data="{{men}}" s-ref="men">'
          + '<h3>{{n}}</h3>'
          + '<p><b>{{sex}}</b><u>{{email}}</u></p>'
        + '</x-men></div>',

    attached: function () {
        var slots = this.ref('men').slot();

        // 3
        slots.length

        // truthy
        slots[0].isInserted

        // truthy
        //contentSlot.isScoped
    }
});

var myComponent = new MyComponent({
    data: {
        men: [
            {name: 'errorrik', sex: 1, email: 'errorrik@gmail.com'},
            {name: 'leeight', sex: 0, email: 'leeight@gmail.com'},
            {name: 'otakustay', email: 'otakustay@gmail.com', sex: 1}
        ]
    }
});
myComponent.attach(document.body);