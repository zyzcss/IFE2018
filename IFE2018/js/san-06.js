import styles from "../../css/san-06.css"
let card=san.defineComponent({
    /*
        信息由信息头head 标题 title 内容 content 时间 time组成
        vat-表示使用内部的数据
    */
    template:`<div>
        <slot s-for="msg in msgs"
        var-head="{{msg.head}}"
        var-title="{{msg.title}}" 
        var-content="{{msg.content}}" 
        var-time="{{msg.time}}"
        class="card">
        </slot>    
    </div>`,

});
let taskMenu=san.defineComponent({
    /*
        组件的样式在父组件里设置，可以进行样式处理
        如加粗 倾斜 下划线 调整视觉效果
    */
    template:`<div class="container">
        <h1 class="title"><slot name="title"></slot>{{title}}</h1>
        <card msgs="{{msgs}}" s-ref="msgs">
            <div class="card">
                <h3 class="head">{{head}}</h3>
                <div class="content">
                    <p><strong><i>标题:{{title}}</i></strong></p>
                    <p>内容:{{content}}</p>
                    <p>时间:{{time}}</p>
                </div>
            </div>
        </card>
    </div>`,
    components:{
        "card":card
    },
    inited:function(){
        /*
            当前组件的time不能替换上面的time 
            确认tiem是card组件内部的数据
        */
       console.log(this.data.set("time","我是父组件的信息"))
    }
});
let myComponent=san.defineComponent({
    //既可直接参数定义 又可简单的命名定义
    template:`<div style="margin:0 auto;overflow: hidden;width:800px;">
        <task-memu title="{{title[2]}}" msgs="{{msgs}}">
            <span slot="title">任{{title[1]}}</span>
        </task-memu>
    </div>`,
    components:{
       "task-memu":taskMenu
    },
    initData:function(){
        return{
            title:"任务栏",
            msgs:[{head:"任务一",title:"插槽",content:"XXX",time:"2018-4-30"},
            {head:"任务二",title:"插槽",content:"XXX",time:"2018-4-30"},
            {head:"任务三",title:"插槽",content:"XXX",time:"2018-4-30"},
            {head:"任务四",title:"插槽",content:"XXX",time:"2018-4-30"},
            {head:"任务五",title:"插槽",content:"XXX",time:"2018-4-30"},
            {head:"任务六",title:"插槽",content:"XXX",time:"2018-4-30"},]
        }
    }
})
let component=new myComponent();
component.attach(document.body)
