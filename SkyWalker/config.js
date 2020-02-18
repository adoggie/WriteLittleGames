

game_configs ={
    screen_size:{ w:480,h:720},
    atlas :[
        {id:'spitfire_atlas',path:'assets/spitfireu4.png',w:0,h:0}
    ],
    images:[
    ],

    image_seq_list:[  // 图片序列
        { id: 'ims_cover_spitfire', altas: 'spitfire_atlas', x: 2, y:2,w:1456,h:108 }
    ]
    ,
    fighters:[
        {
            id: 'spitfire',
            size: {w:112,h:108},
            parts:[
                {
                    id:'cover',image:'ani_spitfire',
                        animation:{ id: 'ani_spitfire', altas: 'spitfire_atlas', x: 2, y:2,w:1456,h:108 }
                },
                {
                    id:'fan',image:'ani_spitfire_fan'
                }
            ],
            configs:{
                speed: 4 ,
                fan_speed: 0.2,
                turn_frame_freq:0.2,    // 转向刷新速度
            }
        }
    ]

};


function preload() {
    Director.instance.init();
}



function setup() {
    Director.instance.setup();

  bgsnd.setLoop(true);
  createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
  plane = new Plane( img_plane1,img_plane2);
  bgsnd.play();


}