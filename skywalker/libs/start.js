import {EnemySpawn,EnemyFactory,EnemyZero,EnemyPartCover} from './enemy.js'
import {Background} from "./background.js"
import {Collider,CollideRect} from "./collider.js"
import {ConfigManager,Constants} from "./config.js";
import {Stage,StageManager} from './stage.js';
import {SceneMission1} from './mession1.js';
import {WeaponSetupPoint,Weapon} from './weapon.js';
import {StraightPath,BezierCurvePath,MissileTracePath} from './path.js';
import {Bullet,Missile} from './bullet.js';
import {Fighter,FighterPartCover,FighterPartFan,FighterPartShadow} from "./fighter.js";
// imoprt {FighterPartCover,FighterPartFan,FighterPartShadow,Fighter} from './fighter.js';
import {ResourceManager,Sound,AtlasImage,xImage,Atlas,ImageSequence,Animation} from './resource.js'

import {Director} from './director.js'

/***
 图片压缩网站：
 https://www.yasuotu.com/size

 */
const game_configs ={
    run_mode: 'p5js', // or 'p5js' 微信或者是p5js原生
    collider: { draw:false, color:'red'},    //绘制碰撞边界框


    stage: {
            id:'main',cls:  Stage, size:[480,720],
            scenes:[
                {   id:'mission1', cls: SceneMission1, cfgs:{},
                    sound: {
                        bg:{id:'bg_mission1',loop:true}
                    },
                    enemy_factory:{
                        cls: EnemyFactory,
                        groups:[
                        {
                               spawn:EnemySpawn, id:'zero',layer:'enemy',total:200,freqs:[0.2,2],num:[1,1],  path:{ cls:StraightPath, dx:0,dy:4 } // 出机数量
                              , // 出机数量
                            },
                            {
                               spawn:EnemySpawn, id:'zero',layer:'enemy',total:200,freqs:[2,3],num:[1,1],  //path:{ cls:StraightPath, dx:0,dy:4 }, // 出机数量
                               path:{ cls:BezierCurvePath, x1:[0.1,0.7],x2:[0.2,0.8],x3:[0.4,1],x4:[-0.2,1.2],
                                        y1:[-0.1,0.0],y2:[0.4,0.8],y3:[0.5,0.8],y4:[1.2,1.5],
                                        steps:200,draw:false,draw_color:'gray'
                                     }, // 出机数量
                            },
                            {
                               spawn:EnemySpawn, id:'j2m3',layer:'enemy',total:200,freqs:[2,4],num:[1,1],
                               path:{ cls:BezierCurvePath, x1:[0.1,0.7],x2:[0.2,0.6],x3:[0.4,1],x4:[0,1],
                                        y1:[-0.1,0.0],y2:[0.4,0.8],y3:[0.5,0.6],y4:[1.2,1.5],
                                        steps:200,draw:false,draw_color:'blue'
                                     }, // 出机数量
                            },
                            {
                               spawn:EnemySpawn, id:'ki46',layer:'enemy',total:200,freqs:[5,10],num:[1,1], path:{ cls:StraightPath, dx:0,dy:3 }
                                    , // 出机数量
                            }
                        ]
                    },
                    layers:[
                        {id:'bg'},

                        {id:'enemy'},
                        {id:'enemy_bullet'},
                        {id:'fighter_bullet'},
                        {id:'fighter'},
                    ],
                    fighter: 'spitfire', //
                    background:{id:'bg_01',cls:Background, atlas:'bg_01_atlas',freqs:0.01,scroll:2}, // scroll: 滚动速度

                 }
            ]

    },

    screen_size:{ w:480,h:720},
    atlas :[
        {id:'spitfire_atlas',path:'assets/spitfireu4.png',w:0,h:0},
        {id:'mission1_atlas',path:'assets/m1_2.png',w:0,h:0},
        {id:'bg_01_atlas',path:'assets/bg_01.png',w:0,h:0},
        // {id:'bg_02_atlas',path:'assets/bg_02.png',w:0,h:0},

        {id:'bullet_mg1_atlas',path:'assets/bullet1.png',w:0,h:0},// 机枪子弹
    ],

    images:[
    ],

    sounds:[
        {id:'bg_mission1',path:'assets/sound/Mission1.mp3'},
        {id:'machine_gun',path:'assets/sound/machine_gun.mp3'},

        {id:'bullet_hit',path:'assets/sound/bullet_hit.mp3',comment:'子弹命中'},
        {id:'enemy_hit',path:'assets/sound/enemy_hit.mp3',comment:'子弹命中'},
        {id:'enemy_explosion',path:'assets/sound/explode.mp3',comment:'爆炸声音'},
        {id:'missile_fire',path:'assets/sound/fire.mp3',comment:'火箭弹声音'},

        // {id:'bg_mission1',path:'assets/bg.ogg'}
    ],
    //图片序列
    image_seq_list:[  // 图片序列
        { id: 'ims_cover_spitfire', atlas: 'spitfire_atlas', x: 2, y:2,w:1456,h:108,num:13 },
        { id: 'ims_fan_spitfire', atlas: 'spitfire_atlas', x: 2, y:112,w:160,h:11,num:5 },
        { id: 'ims_shadow_spitfire', atlas: 'spitfire_atlas', x: 1460, y:2,w:585,h:45,num:13 },

        { id: 'ims_cover_zero', atlas: 'mission1_atlas', x: 2, y:2,w:1469,h:111,num:13 }, // 零式战机
        { id: 'ims_cover_j2m3', atlas: 'mission1_atlas', x: 2, y:115,w:1469,h:108,num:13 }, //

        { id: 'ims_cover_ki46', atlas: 'mission1_atlas', x: 2+ 240*4, y:225,w:240,h:181,num:1 }, // 中型飞机

        { id: 'ims_bullet_m1', atlas: 'mission1_atlas', x: 1901, y:1825,w:14,h:38,num:1 },

        { id: 'ims_missile_1', atlas: 'mission1_atlas', x: 2031, y:822,w:12,h:44,num:1 }, // 飞弹

        { id: 'ims_particle_cloud1', atlas: 'mission1_atlas', x: 1809, y:721,w:128,h:128,num:1 }, // 爆炸例子云


        { id: 'ims_bullet_mg1', atlas: 'bullet_mg1_atlas', x: 0, y:0,w:5,h:11,num:1 },

        { id: 'ims_explosion_2', path:'assets/explosion', start:1,end:19,x: 0, y:0,w:64,h:48,num:1 }, // 爆炸画面

    ]
    ,
    //动画
    animation_list:[
        {id:'ani_spitfire_turn_left',ims:'ims_cover_spitfire',start:0,end:5,
            reverse:true,repeat:false,rewind:false,interval:0.1},

        {id:'ani_spitfire_turn_right',ims:'ims_cover_spitfire',start:7,end:12,
            reverse:false,repeat:false,rewind:false,interval:0.1},

        {id:'ani_spitfire_shadow_trun_left',ims:'ims_shadow_spitfire',start:0,end:5,
            reverse:true,repeat:false,rewind:false,interval:0.1}, // 阴影左侧移动

        {id:'ani_spitfire_shadow_trun_right',ims:'ims_shadow_spitfire',start:7,end:12,
            reverse:false,repeat:false,rewind:false,interval:0.1}, // 阴影右侧移动

        {id:'ani_spitfire_fan',ims:'ims_fan_spitfire',start:0,end:4,
            reverse:true,repeat:true,rewind:true,interval:0.1},
        //敌机爆炸云
        {id:'ani_enemy_explosion1',ims:'ims_particle_cloud1',start:0,end:0, reverse:true,repeat:true,rewind:true,interval:0.1},

        {id:'ani_enemy_explosion2',ims:'ims_explosion_2',start:0,end:18, reverse:true,repeat:false,rewind:true,interval:0.02},
    ],

    bullet_list:[
        {   id:'fire_gun',cls:Bullet,speed:3,damage:120,ims: 'ims_bullet_m1',collider:[{id:'',cls:CollideRect,x:0,y:0,w:14,h:38},],
            sound:{fire:'machine_gun',hit:'enemy_hit'}
            }, // w:0 采用图片整个宽度
        {   id:'mechine_gun',cls:Bullet,speed:4,damage:30,ims: 'ims_bullet_mg1',collider:[{id:'',cls:CollideRect,x:0,y:0,w:5,h:11},],
            sound:{fire:'missile_fire',hit:'enemy_hit'}
         }, // w:0 采用图片整个宽度
         // 飞弹
         {   id:'missile',cls:Missile,speed:5,damage:250,ims: 'ims_missile_1',collider:[{id:'',cls:CollideRect,x:0,y:0,w:14,h:38},],
            sound:{fire:'missile_fire',hit:'enemy_hit'},scale:0.7 // 图片缩放
            },
    ],
    fly_path_list:[ // 飞行轨迹
        {id:'straight_fly'}
    ],
    // weapon_list:[
    //     {id:'m1_gun',cls:WeaponM1Gun,path:'straight_fly',shot_freq:0.1,bullet:'m1'}
    // ],
    fighters:[
        {
            id: 'spitfire',
            size: {w:112,h:108},
            speed: 3,
            health: 1000,
            blood_bar:{ draw:true,x:0.5,y:0.9,w:50,h:10,stroke:'grey',fill:'red'}, // 血条
            parts:[  // 飞机部件定义
                {
                    id:'shadow', cls: FighterPartShadow,
                    image:{ims:'ims_shadow_spitfire',index:6,atlas:null},
                    ani_turn_left:'ani_spitfire_shadow_trun_left',
                    ani_turn_right:'ani_spitfire_shadow_trun_right',
                    offx:-60 , offy:20, // 距离中心 x,y 的偏移的绝对值

                },
                {
                    id:'cover', cls:FighterPartCover,
                    image:{ims:'ims_cover_spitfire',index:6,atlas:null},
                    ani_turn_left:'ani_spitfire_turn_left',
                    ani_turn_right:'ani_spitfire_turn_right',
                    offx:0 , offy:0, // 距离中心 x,y 的偏移
                },
                {
                    id:'fan', cls: FighterPartFan,
                    image:null,
                    ani_fan:'ani_spitfire_fan', //发动机转叶
                    offx:0,offy:-55
                },


            ],
            collider:[ // 碰撞
                {id:'',cls:CollideRect,x:0,y:0,w:112,h:108}, // 矩形检测区域
            ],
            weapons:[
                {id:'fire_gun',cls:WeaponSetupPoint,image:null,freqs:0.4,x:0,y:-50,bullet:'fire_gun',play_sound:true,path:{ cls:StraightPath, dx:0,dy:-7 } }, // 武器安装点
                {id:'m11_gun',cls:WeaponSetupPoint,image:null,freqs:0.2,x:-12,y:-50,bullet:'mechine_gun',play_sound:true,path:{ cls:StraightPath, dx:0,dy:-5 } }, // 武器安装点
                {id:'m12_gun',cls:WeaponSetupPoint,image:null,freqs:0.2,x:12,y:-50,bullet:'mechine_gun',play_sound:false,path:{ cls:StraightPath, dx:0,dy:-5 }}, // 武器安装点

                {id:'missile_1',cls:WeaponSetupPoint,image:null,freqs:0.5,x:0,y:-50,bullet:'missile',play_sound:false,path:{ cls:MissileTracePath, speed:5 } }, // 武器安装点
                {id:'missile_2',cls:WeaponSetupPoint,image:null,freqs:0.5,x:0,y:-50,bullet:'missile',play_sound:false,path:{ cls:MissileTracePath, speed:5 } }, // 武器安装点
            ]

        }
    ], // end fighers

    enemy_list:[ // 敌机类型定义
       {
            id: 'zero', //零式战斗机
            cls: EnemyZero,
            size: {w:112/3*2,h:108/3*2,vw:56,vh:54},
            health: 150,
            explosion: {ani:'ani_enemy_explosion2',sound:'enemy_explosion'}, //爆炸效果
            hit: {ani:null,sound:'bullet_hit'},// 命中效果
            damage: 100,  // 撞击产生的损害值
            blood_bar:{ draw:true,x:0.5,y:0.3,w:30,h:6,stroke:'gray',fill:'red'}, // 血条
           score:100,
            parts:[  // 飞机部件定义
                {
                    id:'cover', cls:EnemyPartCover,
                    image:{ims:'ims_cover_zero',index:6,atlas:null},
                    // ani_turn_left:'ani_spitfire_turn_left',
                    // ani_turn_right:'ani_spitfire_turn_right',
                    offx:0 , offy:0, // 距离中心 x,y 的偏移
                    rotate:{ x:0,y:0,angle:180}
                },
            ],
            collider:[ // 碰撞
                {id:'',cls:CollideRect,x:0,y:0,w:112/3*2,h:108/3*2}, // 矩形检测区域
            ],
            weapons:[
                {id:'m1_gun',x:0,y:25}, // 飞机中心点参考 , 向下偏移
            ]

        },
        {
            id: 'j2m3', //零式战斗机
            cls: EnemyZero,
            // size: {w:112/3*2,h:108/3*2,vw:56,vh:54},
            size: {w:112,h:108,vw:56,vh:54},
            health: 250,
            explosion: {ani:'ani_enemy_explosion1',sound:'enemy_explosion'}, //爆炸效果
            hit: {ani:null,sound:'bullet_hit'},// 命中效果
            damage: 100,  // 撞击产生的损害值
            blood_bar:{ draw:true,x:0.5,y:0.3,w:30,h:6,stroke:'gray',fill:'red'}, // 血条
            score:150,
            parts:[  // 飞机部件定义
                {
                    id:'cover', cls:EnemyPartCover,
                    image:{ims:'ims_cover_j2m3',index:6,atlas:null},
                    // ani_turn_left:'ani_spitfire_turn_left',
                    // ani_turn_right:'ani_spitfire_turn_right',
                    offx:0 , offy:0, // 距离中心 x,y 的偏移
                    rotate:{ x:0,y:0,angle:180}
                },
            ],
            collider:[ // 碰撞
                {id:'',cls:CollideRect,x:0,y:0,w:112,h:108}, // 矩形检测区域
            ],
            weapons:[
                {id:'m1_gun',x:0,y:25}, // 飞机中心点参考 , 向下偏移
            ]

        },
        {
            id: 'ki46', //零式战斗机
            cls: EnemyZero,
            size: {w:240,h:181,vw:56,vh:54},
            health: 800,
            explosion: {ani:'ani_enemy_explosion1',sound:'enemy_explosion'}, //爆炸效果
            hit: {ani:null,sound:'bullet_hit'},// 命中效果
            damage: 500,  // 撞击产生的损害值
            blood_bar:{ draw:true,x:0.5,y:0.3,w:30,h:6,stroke:'gray',fill:'red'}, // 血条
            score:1000,
            parts:[  // 飞机部件定义
                {
                    id:'cover', cls:EnemyPartCover,
                    image:{ims:'ims_cover_ki46',index:0,atlas:null},
                    // ani_turn_left:'ani_spitfire_turn_left',
                    // ani_turn_right:'ani_spitfire_turn_right',
                    offx:0 , offy:0, // 距离中心 x,y 的偏移
                    rotate:{ x:0,y:0,angle:180}
                },
            ],
            collider:[ // 碰撞
                {id:'',cls:CollideRect,x:0,y:0,w:240,h:181}, // 矩形检测区域
            ],
            weapons:[
                {id:'m1_gun',x:0,y:25}, // 飞机中心点参考 , 向下偏移
            ]

        },


    ]
    ,

    enemy_factory_list:{
        groups:[
            {id:'zero',}
        ]


    },

    controll_pad:{
        x:100,y:-100,r:100,color:[250,120,0,230],off_y:3/4
    }
};


export function preload() {

    ConfigManager.instance.root = game_configs;

    ResourceManager.instance = new ResourceManager();
    ResourceManager.instance.init();
    Director.instance.init();
    // img = loadImage('assets/spitfireu4.png');
    // img_bg = loadImage('assets/background.png');
    // img = loadImage('assets/plane.png');
}


export function setup() {
    // createCanvas(400,600);
    // return ;
    // print("test...");
    StageManager.instance.init();
    Director.instance.setup();
    StageManager.instance.get().setup();
}

export function draw() {
    background('white');
    StageManager.instance.get().draw();
}



export {game_configs};


export function start(context){
    context.preload = preload;
    context.setup = setup;
    context.draw = draw;
}