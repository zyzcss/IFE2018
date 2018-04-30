import styles from "../../css/san-06.css"
let card=san.defineComponent({
    template:`<div>
        <slot s-for="msg in msgs"
        var-head="{{msg.head}}"
        var-title="{{msg.title}}" 
        var-content="{{msg.content}}" 
        var-time="{{msg.time}}"
        class="card">
            标题{{head}}{{title}}{{content}}{{time}}
        </slot>    
    </div>`,

});
let taskMenu=san.defineComponent({
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
       // console.log(this.data.get("msgs"))
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
