const CROSS_STATE_BTN = document.querySelector('.cross_state_btn');
const CIRCLE_STATE_BTN = document.querySelector('.circle_state_btn');
const CROSS_GM_STATE_BTN = document.querySelector('.cross_gm_btn');
const CIRCLE_GM_STATE_BTN = document.querySelector('.circle_gm_btn');
const CROSS_CHAOS_BTN = document.querySelector('.cross_chaos_btn');
const CIRCLE_CHAOS_BTN = document.querySelector('.circle_chaos_btn');
const CLEAR_STATE_BTN = document.querySelector('.clear_state_btn');
const CLEAR_SLOTS_BTN = document.querySelector('.clear_slots_btn');
const RUN_GAME_1VS1_BTN = document.querySelector('.rungame_1vs1_btn');
const BREAK_GAME_1VS1_BTN = document.querySelector('.breakgame_1vs1_btn');
const RUN_GAME_AGAINST_AI_CROSS = document.querySelector('.against-ai-cross-btn');
const RUN_GAME_AGAINST_AI_CIRCLE = document.querySelector('.against-ai-circle-btn');
//DEBUG MENU BUTTONS////
const PLAYBOARD = document.querySelector('.playboard');
const CROSS_CHOOSING_CLASS = document.querySelector('.crosschoosing');
const CIRCLE_CHOOSING_CLASS = document.querySelector('.circlechoosing');
const LINE_STATE = document.querySelector('.win-line-img');
const LINE_CONTAINER = document.querySelector('.win-line-container');
const TIMER_COUNTDOWN_TEXT = document.querySelector('.countdown-el-time');
const TIMER_CONTAINER = document.querySelector('.timer-thumbnail-container');
const REPLAY_BTN_CONTAINER = document.querySelector('.replay-btn-container');
const REPLAY_BTN = document.querySelector('.replay-btn');
const WIN_SCREEN_CONTAINER = document.querySelector('.win-image-container');
const WIN_IMAGE = document.querySelector('.win-image');
//MAIN MENU BUTTONS////
const AI_MODE_BTN = document.querySelector('.vs-ai-mode');
const PVP_MODE_BTN = document.querySelector('.vs-mode');
const RETURN_MENU_BTN = document.querySelector('.return-menu-btn');
//DOM ELEMS////////////

//SLOTS////////////////
const SLOT_ALL = document.querySelectorAll('.slot');
const SL1 = document.querySelector('.slot1');
const SL2 = document.querySelector('.slot2');
const SL3 = document.querySelector('.slot3');
const SL4 = document.querySelector('.slot4');
const SL5 = document.querySelector('.slot5');
const SL6 = document.querySelector('.slot6');
const SL7 = document.querySelector('.slot7');
const SL8 = document.querySelector('.slot8');
const SL9 = document.querySelector('.slot9');
/////////////////////


//PARAMS//////////////
const winning_combinations = [
    [SL1, SL2, SL3, 'stylesheets/img/lines/x/123line.png'],
    [SL4, SL5, SL6, 'stylesheets/img/lines/x/456line.png'],
    [SL7, SL8, SL9, 'stylesheets/img/lines/x/789line.png'],
    [SL1, SL4, SL7, 'stylesheets/img/lines/y/147line.png'],
    [SL2, SL5, SL8, 'stylesheets/img/lines/y/258line.png'],
    [SL3, SL6, SL9, 'stylesheets/img/lines/y/369line.png'],
    [SL1, SL5, SL9, 'stylesheets/img/lines/xy/159line.png'],
    [SL3, SL5, SL7, 'stylesheets/img/lines/xy/357line.png']
  ];  
const DEFAULT_MODE = 0;
const GOD_MODE = 1;
const CLEAR_ALL = 1;
const VS_AI = 1
const CROSSED = 'crossed';
const CIRCLED = 'circled';
const EMPTY = 'unused';
//CONFIG//////////////
let SOUND_MODE = 1;
let LOG_MODE = 0;
let CURRENT_REPLAY_MODE;
//////////////////////

//DEBUG MENU BUTTONS//
function CLEAR_SLOTS(){FILL_SLOTS('unused', 'crossed', 'circled'); SOUND_MODE?cleanall_sfx.play():0;};
function CROSS_CHAOS(){FILL_SLOTS('crossed', 'unused', 'circled')};
function CIRCLE_CHAOS(){FILL_SLOTS('circled', 'unused', 'crossed')};
//////////////////////

//SFX etc.////////////
let cleanall_sfx;
let timer_sfx;
let timer5s_alert_sfx;
let timer_end_sfx;
soundManager.setup({
    preferFlash: false,
    onready: () => {
        pencil_sfx = soundManager.createSound({
            id: 'pencil_sfx',
            url: 'stylesheets/sfx/pencil_mark.mp3'
        });
        cleanall_sfx = soundManager.createSound({
            id: 'cleanall_sfx',
            url: 'stylesheets/sfx/eraser.mp3'
        });
        timer_sfx = soundManager.createSound({
            id: 'timer_sfx',
            url: 'stylesheets/sfx/timer.mp3'
        });
        timer5s_alert_sfx = soundManager.createSound({
            id: 'timer5s_alert_sfx',
            url: 'stylesheets/sfx/timer5s.mp3'
        });
        timer_end_sfx = soundManager.createSound({
            id: 'timer_end_sfx',
            url: 'stylesheets/sfx/slizzing_bell.mp3'
        });
        win_sfx = soundManager.createSound({
            id: 'win_sfx',
            url: 'stylesheets/sfx/win.mp3'
        });
        gotomenu_sfx = soundManager.createSound({
            id: 'gotomenu_sfx',
            url: 'stylesheets/sfx/gotomenu.mp3'
        })
    }
});
//////////////////////

function CROSS_CHOOSING_MODE(DEV_MODE, VS_AI=0, RESOLVE_RETURN_VALUE=0) {
    CHOOSING('crosschoosing', 'circlechoosing');
    if (DEV_MODE){
        PLAYBOARD.classList.contains('god-mode')?0:PLAYBOARD.classList.add('god-mode');
        $(document).on('click', function(e) {
            if (e.target.classList.contains('slot') && PLAYBOARD.classList.contains('crosschoosing') && PLAYBOARD.classList.contains('god-mode')){
                SOUND_MODE?pencil_sfx.play():0;
                e.target.classList.remove('circled');
                e.target.classList.remove('unused');
                e.target.classList.add('crossed');
            }
        });
    }
    else {
        async function CROSS_CHOOSING_ASYNC() {
            return new Promise(resolve => {
                $(document).on('click', function CROSS_CHOOSING_LISTENER(e) {
                    if (e.target.classList.contains('unused') && PLAYBOARD.classList.contains('crosschoosing') && !PLAYBOARD.classList.contains('god-mode')) {
                        SOUND_MODE ? pencil_sfx.play() : 0;
                        e.target.classList.remove('unused');
                        e.target.classList.add('crossed');
                        $(document).off('click', CROSS_CHOOSING_LISTENER);
                        USED_SLOTS+=1;
                        CLEAR_STATUS();
                        resolve();
                    }
                });
            });
          }
          
    (async ()=> {
        PLAYBOARD.classList.contains('god-mode') ? PLAYBOARD.classList.remove('god-mode') : 0;
        await CROSS_CHOOSING_ASYNC();
        VS_AI?1:SWITCH_SIDE_1VS1();
        RESOLVE_RETURN_VALUE?RESOLVE_RETURN_VALUE():1;
        })()
    }
};

function SWITCH_SIDE_1VS1(){
    CROSS_TURN = !CROSS_TURN;
    clearInterval(local_interval_link);
    RUN_GAME_1VS1();
}

function CIRCLE_CHOOSING_MODE(DEV_MODE=0, VS_AI=0, RESOLVE_RETURN_VALUE=0) {
    CHOOSING('circlechoosing', 'crosschoosing')
    if (DEV_MODE){
        PLAYBOARD.classList.contains('god-mode')?0:PLAYBOARD.classList.add('god-mode');
        $(document).on('click', function(e) {
            if (e.target.classList.contains('slot') && PLAYBOARD.classList.contains('circlechoosing') && PLAYBOARD.classList.contains('god-mode')){
                SOUND_MODE?pencil_sfx.play():0;
                e.target.classList.remove('crossed');
                e.target.classList.remove('unused');
                e.target.classList.add('circled');
            }
        });
    } else {
        async function CIRCLE_CHOOSING_ASYNC() {
            return new Promise(resolve => {
                $(document).on('click', function CIRCLE_CHOOSING_LISTENER(e) {
                    if (e.target.classList.contains('unused') && PLAYBOARD.classList.contains('circlechoosing') && !PLAYBOARD.classList.contains('god-mode')) {
                        SOUND_MODE ? pencil_sfx.play() : 0;
                        e.target.classList.remove('unused');
                        e.target.classList.add('circled');
                        $(document).off('click', CIRCLE_CHOOSING_LISTENER);
                        USED_SLOTS+=1;
                        CLEAR_STATUS();
                        resolve();
                    }
                });
            });
          }
        
        (async ()=> {
            PLAYBOARD.classList.contains('god-mode') ? PLAYBOARD.classList.remove('god-mode') : 0;
            await CIRCLE_CHOOSING_ASYNC();
            VS_AI?1:SWITCH_SIDE_1VS1();
            RESOLVE_RETURN_VALUE?RESOLVE_RETURN_VALUE():1;
        })()
    }
};

function IS_MARKED(slot){
    return slot.classList.contains('crossed')||slot.classList.contains('circled');
};

function MARKED_BY_WHO(slot){
    if (slot.classList.contains('crossed')) return 1;
    else if (slot.classList.contains('circled')) return 0;
};

function CHECK_FOR_WIN_COMBINATION(){
    let result;
    winning_combinations.forEach((item) => {
        let summ = MARKED_BY_WHO(item[0])+MARKED_BY_WHO(item[1])+MARKED_BY_WHO(item[2]);
        if (summ == 3 || summ == 0){
            result = item;
        }
    });
    if (result) return result;
    else return 0;
}


function FILL_SLOTS(add, remove_1, remove_2){
    function REPLACE(remove, add){
        for (let i = 1; i<=9; i++){
            document.querySelector(`.slot${i}`).classList.remove(remove);
            document.querySelector(`.slot${i}`).classList.add(add);
        }
    }
    for (let i = 1; i<=9; i++){
        document.querySelector(`.slot${i}`).classList.contains(remove_1)?REPLACE(remove_1,add):document.querySelector(`.slot${i}`).classList.contains(remove_2)?REPLACE(remove_2, add):0;
    }
}

function CHOOSING(state_add, state_remove=0){
    if (PLAYBOARD.classList.contains(state_remove)) {
        PLAYBOARD.classList.remove(state_remove);
        PLAYBOARD.classList.add(state_add);
    } else if (!PLAYBOARD.classList.contains(state_add)) {
        PLAYBOARD.classList.add(state_add);
    }
}

function CLEAR_STATUS(){
    PLAYBOARD.classList.contains('crosschoosing')?(PLAYBOARD.classList.remove('crosschoosing')):(PLAYBOARD.classList.contains('circlechoosing')?(PLAYBOARD.classList.remove('circlechoosing')):0)
}

function CHANGE_SLOT(result_class, class_to_remove){
    for (let i = 1; i<=9; i++){
        document.querySelector(`.slot${i}`).classList.contains(class_to_remove)?document.querySelector(`.slot${i}`).classList.remove(class_to_remove):0;
        document.querySelector(`.slot${i}`).classList.add(result_class);
    }
}

//////////////////////

function SET_COUNTDOWN(number, action=(()=>{1})){
    let seconds = number;
    timer_sfx.playState = 1?timer_sfx.stop():0;
    TIMER_CONTAINER.style.display = 'block';
    (function local_timer() {
        local_interval_link = setInterval(() => {
            TIMER_COUNTDOWN_TEXT.style.color = 'black';
            seconds--;
            TIMER_COUNTDOWN_TEXT.textContent = format_time(seconds);
            if (seconds <= 0) {
                clearInterval(local_interval_link);
                TIMER_COUNTDOWN_TEXT.textContent = 'NEXT!';
                SOUND_MODE ? timer_end_sfx.play() : 0;
                action();
            }
            else if (seconds == 9){
                SOUND_MODE ? timer_sfx.play():0;
            }
            else if (seconds == 5){
                SOUND_MODE ? timer5s_alert_sfx.play() : 0;
                TIMER_COUNTDOWN_TEXT.style.color = 'red';
            }
            else if (seconds <= 5){
                TIMER_COUNTDOWN_TEXT.style.color = 'red';
            }
        }, 1000);
    })()
    function format_time(seconds) {
      const remainingSeconds = seconds % 60;
      return `${0}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
}

function BREAK_COUNTDOWN(){
    clearInterval(local_interval_link);
}

let CROSS_TURN = 1;
let USED_SLOTS = 0;
$('.win-image').hide();

function RUN_GAME_1VS1(){
    CURRENT_REPLAY_MODE = '1VS1';
    BREAK_FADEOUT_WIN_TIMEOUT();
    (LINE_CONTAINER.style.display = 'none')?1:LINE_CONTAINER.style.display = 'none';
    (REPLAY_BTN_CONTAINER.style.display = 'none')?1:REPLAY_BTN_CONTAINER.style.display = 'none';
    let WIN_SLOTS = 0||(CHECK_FOR_WIN_COMBINATION()?CHECK_FOR_WIN_COMBINATION():0);
    if (USED_SLOTS == 9 && !WIN_SLOTS){
        WIN_IMAGE.src = 'stylesheets/img/win/nowinner.png';
        WIN_SCREEN_CONTAINER.style.display = 'block';
        SOUND_MODE?win_sfx.play():0;
        $('.win-image').fadeIn(133);
        BREAK_GAME_1VS1(DEFAULT_MODE, WIN_SLOTS);
        delete WIN_SLOTS;
        CROSS_TURN = 1;
        REPLAY_BTN_CONTAINER.style.display = 'block';
        return;
    }
    else if (WIN_SLOTS) {
        if (MARKED_BY_WHO(WIN_SLOTS[0])){
            WIN_IMAGE.src = 'stylesheets/img/win/crosswin.png';
            WIN_SCREEN_CONTAINER.style.display = 'block';
            SOUND_MODE?win_sfx.play():0;
            $('.win-image').fadeIn(133);
            BREAK_GAME_1VS1(DEFAULT_MODE);
            delete WIN_SLOTS;
            CROSS_TURN = 1;
        } else {
            WIN_IMAGE.src = 'stylesheets/img/win/circlewin.png';
            WIN_SCREEN_CONTAINER.style.display = 'block';
            SOUND_MODE?win_sfx.play():0;
            $('.win-image').fadeIn(133);
            delete WIN_SLOTS;
            BREAK_GAME_1VS1(DEFAULT_MODE);
            CROSS_TURN = 1;
        }
        LINE_CONTAINER.style.display = 'block';
        REPLAY_BTN_CONTAINER.style.display = 'block';
        LINE_CONTAINER.style.transition = '0.133s';
        LINE_STATE.src = WIN_SLOTS[3];
        return;

    };
    SET_COUNTDOWN(11, SWITCH_SIDE_1VS1);
    if (CROSS_TURN) {
        CROSS_CHOOSING_MODE(DEFAULT_MODE);

    } else {
        CIRCLE_CHOOSING_MODE(DEFAULT_MODE);
    }
}

let break_interval_1;
let break_interval_2;

function BREAK_FADEOUT_WIN_TIMEOUT(){
    clearInterval(break_interval_1);
    clearInterval(break_interval_2);
}

function BREAK_GAME_1VS1(CLEAR_ALL=0, CLEAR_VARIABLE=0){
    CLEAR_VARIABLE = 0;
    CROSS_TURN = 1;
    TIMER_CONTAINER.style.display = 'none';
    BREAK_COUNTDOWN();
    CLEAR_STATUS();
    break_interval_1 = setTimeout(()=>{
        break_interval_1 = setTimeout(()=>{
            WIN_SCREEN_CONTAINER.style.display = 'none';
        }, 1000)
        $('.win-image').fadeOut(266);
    }, 1500)
    USED_SLOTS = 0;
    CLEAR_ALL?CLEAR_SLOTS():0;
    CLEAR_ALL?(LINE_CONTAINER.style.display = 'none'):0;
    CLEAR_ALL?((REPLAY_BTN_CONTAINER.style.display = 'block')?(REPLAY_BTN_CONTAINER.style.display = 'none'):1):1;
}

//////GAME AI/////////////////////////////////////////////////////////////

const AI = {
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    },
    CHOOSE_RANDOM_SLOT(){
        for (let i = 1; i<10; i++){
            if (document.querySelector(`.slot${i}`).classList.contains(EMPTY)) return document.querySelector(`.slot${i}`);
        }
    },
    MAKE_A_MOVE(slot, addclass, delaytime=Math.random(0,3)*1000, optional_func=()=>1){
        setTimeout(()=>{
            slot=slot.classList.contains(EMPTY)?slot:AI.CHOOSE_RANDOM_SLOT();
            SOUND_MODE ? pencil_sfx.play() : 0;
            USED_SLOTS+=1;
            slot.classList.contains(EMPTY)?slot.classList.remove(EMPTY):1;
            slot.classList.add(addclass);
            optional_func();
        }, delaytime)
    },
    
    FIND_AVAILABLE_SLOTS(arrayforscan, arrayforreturn, side=EMPTY){
        for (let i = 0; i<arrayforscan.length; i++){
            if (document.querySelector(`.slot${arrayforscan[i]}`).classList.contains(side)){
                arrayforreturn.push(arrayforscan[i]);
            }
        }
    },
    IS_MARKED(slot, side){
        if (slot.classList.contains(side)) return 1;
        else return 0;
    },
    CHECK_FOR_WIN_COMBINATION(side, what_to_return=1){
        let result;
        winning_combinations.forEach((item) => {
            let summ = +(AI.IS_MARKED(item[0], side)+AI.IS_MARKED(item[1], side)+AI.IS_MARKED(item[2], side));
            if (summ == 2 && (item[0].classList.contains(EMPTY) || item[1].classList.contains(EMPTY) || item[2].classList.contains(EMPTY))){
                if (what_to_return){
                    for (let i = 0; i<3; i++){
                        (!AI.IS_MARKED(item[i], side)&&(item[i].classList.contains(EMPTY)))?result=item[i]:0;
                    }
                } else {
                    result = item
                }
            }
        });
        if (result) return result;
        else return 0;
    },
    RETURN_WINNER_INFO(side){
        let result = 0;
        winning_combinations.forEach((item) => {
            let summ = AI.IS_MARKED(item[0], side)+AI.IS_MARKED(item[1], side)+AI.IS_MARKED(item[2], side);
            if (summ == 3){
                result = item;
            }
        });
        if (result) return result;
        else return 0;
    }, 
    CHOOSE_FIRST_SLOT(choosing_mode, f){
        const correct_slots = [1,3,5,7,9];
        let correct_unused_slots = [];
        AI.FIND_AVAILABLE_SLOTS(correct_slots, correct_unused_slots);
        const random_slot_id = correct_unused_slots[AI.getRandomInt(0, (correct_unused_slots.length-1))]
        const random_slot = document.querySelector(`.slot${random_slot_id}`);
        AI.MAKE_A_MOVE(random_slot, choosing_mode, Math.random(0,3)*1000, f);
    },
    FIND_TACTIC(choosing_mode){
        let result, POSSIBLE_TACTICS;
        const TACTIC_SLOTS = [
            //for 1
            [3,7,9],
            //for 3
            [1,7,9],
            //for 5
            [1,3,7,9],
            //for 7
            [1,3,9],
            //for 9
            [1,3,7],
            //for 2
            [1,8,3],
            //for 4
            [1,6,7],
            //for 6
            [3,4,9],
            //for 8
            [7,2,9]
        ];
        const SLOTS = [SL1,SL3,SL5,SL7,SL9,SL2,SL4,SL6,SL8];
        SLOTS.forEach((slot)=>{
            if (slot.classList.contains(choosing_mode)) {
                POSSIBLE_TACTICS = TACTIC_SLOTS[SLOTS.indexOf(slot)];
            }
        });
        LOG_MODE ? console.log('Before: ' + POSSIBLE_TACTICS) : 0;
        if (POSSIBLE_TACTICS){
            POSSIBLE_TACTICS.forEach((slot)=>{
                if (!document.querySelector(`.slot${slot}`).classList.contains(CIRCLED)||
                    !document.querySelector(`.slot${slot}`).classList.contains(CROSSED)){
                    POSSIBLE_TACTICS.splice([POSSIBLE_TACTICS.indexOf(slot)], 1)
                };
            });
            LOG_MODE ? console.log('After: ' + POSSIBLE_TACTICS) : 0;
            result = POSSIBLE_TACTICS.length==1?
                /*true*/document.querySelector(`.slot${POSSIBLE_TACTICS[0]}`):
                /*false*/document.querySelector(`.slot${POSSIBLE_TACTICS[AI.getRandomInt(0,POSSIBLE_TACTICS.length)]}`);
            LOG_MODE ? console.log('Tactic move for: ') : 0;
            LOG_MODE ? console.log(result) : 0;
        } else {
            result = AI.CHOOSE_RANDOM_SLOT();
        }
        return result;
    },

    ///////////////////////////////////////////////////
    //// AI PLAY PROCESS //////////////////////////////
    ///////////////////////////////////////////////////  
    
    FIRST_STEP(choosing_mode){
        return new Promise((resolve)=>{
            this.CHOOSE_FIRST_SLOT(choosing_mode, resolve);
            LOG_MODE ? console.log(current_hms + ': First step') : 0;
        });
    },
    FIND_TACTIC_STEP(choosing_mode, f=()=>{return 1}){
        AI.MAKE_A_MOVE(AI.FIND_TACTIC(choosing_mode), choosing_mode);
        f();
        LOG_MODE ? console.log(current_hms + ': Tactic found') : 0;
    },
    KILL_PLAYERS_TACTIC(choosing_mode, f=()=>{return 1}){
        let player_mode
        player_mode=choosing_mode==CROSSED?CIRCLED:CROSSED;
        AI.MAKE_A_MOVE(AI.CHECK_FOR_WIN_COMBINATION(player_mode), choosing_mode);
        f();
        LOG_MODE ? console.log(current_hms + ': Player\'s tactic killed') : 0;
    },
    MAKE_A_WINNING_MOVE(choosing_mode, resolve=()=>{return 1}, optional_func=()=>{return 1}, delaytime){
        AI.MAKE_A_MOVE(AI.CHECK_FOR_WIN_COMBINATION(choosing_mode), choosing_mode, delaytime);
        optional_func();
        resolve();
        LOG_MODE ? console.log(current_hms + ': Winning move made') : 0;
    },
    IS_WIN(SIDE){
        return AI.RETURN_WINNER_INFO(SIDE)?true:false;
    },
    CHOOSE_WIN_LINE(SIDE){
        return AI.RETURN_WINNER_INFO(SIDE)[3]?AI.RETURN_WINNER_INFO(SIDE)[3]:0;
    }
}

    ///////////////////////////////////////////////////
    //// PLAYER PLAY PROCESS IN VS AI MODE ////////////
    /////////////////////////////////////////////////// 

//for logs
let now = new Date();
const hour = now.getHours();
const minute = now.getMinutes();
const second = now.getSeconds();
const current_hms = `${hour}:${minute}:${second}`;


async function RUN_GAME_AGAINST_AI(AI_SIDE){
    USED_SLOTS = 0;
    CURRENT_REPLAY_MODE = 'VSAI';
    let WINNER_EXISTS = 0;
    let PLAYER_SIDE = (AI_SIDE==CROSSED)?CIRCLED:CROSSED;
    let AI_WIN_IMAGE = (AI_SIDE==CROSSED)?'stylesheets/img/win/crosswin.png':'stylesheets/img/win/circlewin.png';
    let PLAYER_WIN_IMAGE = (AI_SIDE==CROSSED)?'stylesheets/img/win/circlewin.png':'stylesheets/img/win/crosswin.png';
    async function PLAYER_SELECT_MODE() {
        return new Promise((resolve) =>{
            //PLAYER MODE//
            (PLAYER_SIDE==CROSSED?async ()=>{ 
                //FOR CROSSED
                CROSS_CHOOSING_MODE(DEFAULT_MODE, VS_AI, resolve);
            }:async ()=>{ 
                //FOR CIRCLED
                CIRCLE_CHOOSING_MODE(DEFAULT_MODE, VS_AI, resolve);
            })();
        })
    };
    
    let CONTINUE_RECURSION = 1;

    //BEGINNING
    let PLAYER_TURN = AI_SIDE==CROSSED?0:1;
    (LINE_CONTAINER.style.display = 'none')?1:LINE_CONTAINER.style.display = 'none';
    (REPLAY_BTN_CONTAINER.style.display = 'none')?1:REPLAY_BTN_CONTAINER.style.display = 'none';
    CLEAR_STATUS();
    (AI_SIDE==CROSSED)?AI.FIRST_STEP(AI_SIDE):1;
    await PLAYER_SELECT_MODE();
    (AI_SIDE==CIRCLED)?await AI.FIRST_STEP(AI_SIDE):1;
    let aitimeout, playertimeout;
    
    //MAIN GAME PROCESS
    AI_WIN_SLOTS = AI.RETURN_WINNER_INFO(AI_SIDE)?AI.RETURN_WINNER_INFO(AI_SIDE).slice(0, 3):0;
    (async function AGAINST_AI_RECURSION(){
        (LINE_CONTAINER.style.display = 'none')?1:LINE_CONTAINER.style.display = 'none';
        (REPLAY_BTN_CONTAINER.style.display = 'none')?1:REPLAY_BTN_CONTAINER.style.display = 'none';
        CLEAR_STATUS();
        if (!PLAYER_TURN){ //AI TURN
            await (()=>{
                return new Promise((resolve)=>{
                    /*CHECK #1*/AI.CHECK_FOR_WIN_COMBINATION(AI_SIDE)?
                    /*true*/
                    /*AI WIN CASE*/
                    (async ()=>{
                        let delay=Math.random(0.5,1.5)*1000
                        WINNER_EXISTS = 1;
                        let CHECK_SLOT = AI.CHECK_FOR_WIN_COMBINATION(AI_SIDE);
                        LINE_STATE.src=AI.CHECK_FOR_WIN_COMBINATION(AI_SIDE, 0)[3];
                        PLAYER_TURN=!PLAYER_TURN
                        await AI.MAKE_A_WINNING_MOVE(AI_SIDE, resolve, ()=>{
                            LINE_STATE.src=AI.CHECK_FOR_WIN_COMBINATION(AI_SIDE, 0)[3];
                            setTimeout(()=>{
                                SOUND_MODE ? pencil_sfx.play() : 0;
                                LINE_CONTAINER.style.display = 'block';
                                setTimeout(()=>{
                                    WIN_IMAGE.src = AI_WIN_IMAGE;
                                    WIN_SCREEN_CONTAINER.style.display = 'block';
                                    REPLAY_BTN_CONTAINER.style.display = 'block';
                                    $('.win-image').fadeIn(133);
                                    SOUND_MODE?win_sfx.play():0;
                                    setTimeout(()=>{
                                        aitimeout = setTimeout(()=>{
                                            WIN_SCREEN_CONTAINER.style.display = 'none';
                                        }, 1000)
                                        $('.win-image').fadeOut(266);
                                    }, 1500);
                                }, 188);
                            }, delay+333)
                            CONTINUE_RECURSION=0;
                        }, delay)
                    })():
                    /*false CHECK #2*/
                    AI.CHECK_FOR_WIN_COMBINATION(PLAYER_SIDE)?
                        /*true*/(()=>{
                            let randomValue = Math.random(); // For 50/50 chance, it's an imitation 
                            //of smth like the human factor so that the bot isn't too strong :)
                            if (randomValue < 0.5) {
                                PLAYER_TURN=!PLAYER_TURN;
                                AI.KILL_PLAYERS_TACTIC(AI_SIDE, resolve, AI_WIN_SLOTS);
                            } else {
                                PLAYER_TURN=!PLAYER_TURN;
                                AI.FIND_TACTIC_STEP(AI_SIDE, resolve);
                            }
                        })():
                        /*false*/(()=>{
                            PLAYER_TURN=!PLAYER_TURN;
                            AI.FIND_TACTIC_STEP(AI_SIDE, resolve);
                        })();
                })
            })();
        } else { // PLAYER_TURN
            await PLAYER_SELECT_MODE();
            if (CHECK_FOR_WIN_COMBINATION()){
                // PLAYER WIN CASE
                LINE_STATE.src=CHECK_FOR_WIN_COMBINATION()[3];
                CONTINUE_RECURSION=0;
                WINNER_EXISTS = 1;
                setTimeout(()=>{
                    SOUND_MODE ? pencil_sfx.play() : 0;
                    LINE_CONTAINER.style.display = 'block';
                    aitimeout = setTimeout(()=>{
                        WIN_IMAGE.src = PLAYER_WIN_IMAGE;
                        WIN_SCREEN_CONTAINER.style.display = 'block';
                        REPLAY_BTN_CONTAINER.style.display = 'block';
                        $('.win-image').fadeIn(133);
                        SOUND_MODE?win_sfx.play():0;
                        playertimeout = setTimeout(()=>{
                            setTimeout(()=>{
                                WIN_SCREEN_CONTAINER.style.display = 'none';
                            }, 1000)
                            $('.win-image').fadeOut(266);
                        }, 1500)
                    }, 188);
                }, 333);
            }
            PLAYER_TURN=!PLAYER_TURN
        }
        if (USED_SLOTS==8 && !WINNER_EXISTS && !(aitimeout&&playertimeout)) {
            setTimeout(()=>{
                WIN_IMAGE.src = 'stylesheets/img/win/nowinner.png';
                WIN_SCREEN_CONTAINER.style.display = 'block';
                REPLAY_BTN_CONTAINER.style.display = 'block';
                $('.win-image').fadeIn(133);
                SOUND_MODE?win_sfx.play():0;
                setTimeout(()=>{
                    setTimeout(()=>{
                        WIN_SCREEN_CONTAINER.style.display = 'none';
                    }, 1000)
                    $('.win-image').fadeOut(266);
                }, 1500)
            }, 1000);
        }
        CONTINUE_RECURSION?AGAINST_AI_RECURSION():0;
    })();
}    


//////////////////////////////////////////////////////////////////////////

function initializeEvents() {
    'use strict';
    //***DEBUG MENU***//
    //selectors//
    CROSS_GM_STATE_BTN.addEventListener('click', () => CROSS_CHOOSING_MODE(GOD_MODE));
    CIRCLE_GM_STATE_BTN.addEventListener('click', () => CIRCLE_CHOOSING_MODE(GOD_MODE));
    CROSS_STATE_BTN.addEventListener('click', () => CROSS_CHOOSING_MODE(DEFAULT_MODE));
    CIRCLE_STATE_BTN.addEventListener('click', () => CIRCLE_CHOOSING_MODE(DEFAULT_MODE));
    CLEAR_STATE_BTN.addEventListener('click', CLEAR_STATUS);
    //slots//
    CROSS_CHAOS_BTN.addEventListener('click', CROSS_CHAOS);
    CIRCLE_CHAOS_BTN.addEventListener('click', CIRCLE_CHAOS);
    CLEAR_SLOTS_BTN.addEventListener('click', CLEAR_SLOTS);
    //Game modes//
    RUN_GAME_1VS1_BTN.addEventListener('click', () => RUN_GAME_1VS1());
    BREAK_GAME_1VS1_BTN.addEventListener('click', () => BREAK_GAME_1VS1(CLEAR_ALL));
    RUN_GAME_AGAINST_AI_CROSS.addEventListener('click', ()=> RUN_GAME_AGAINST_AI(CROSSED));
    // RUN_GAME_AGAINST_AI_CIRCLE.addEventListener('click', ()=> RUN_GAME_AGAINST_AI(CIRCLED));
    //***GAME***//
    REPLAY_BTN.addEventListener('click', () => {
        if (CURRENT_REPLAY_MODE=='1VS1'){
            BREAK_GAME_1VS1(CLEAR_ALL);
            RUN_GAME_1VS1();
        } 
        else if (CURRENT_REPLAY_MODE=='VSAI'){
            USED_SLOTS=0;
            CLEAR_SLOTS();
            CLEAR_STATUS();
            setTimeout(()=>{
                RUN_GAME_AGAINST_AI(CROSSED);
            }, 333);
        }
    });
    AI_MODE_BTN.addEventListener('click', ()=>{
        SOUND_MODE?pencil_sfx.play():0;
        document.querySelector('.select-mode-menu').style.display = 'none';
        document.querySelector('.main').style.display = 'flex';
        RUN_GAME_AGAINST_AI(CROSSED);
    });
    PVP_MODE_BTN.addEventListener('click', ()=>{
        SOUND_MODE?pencil_sfx.play():0;
        document.querySelector('.select-mode-menu').style.display = 'none';
        document.querySelector('.main').style.display = 'flex';
        RUN_GAME_1VS1();
    });
    RETURN_MENU_BTN.addEventListener('click', ()=>{
        document.querySelector('.main').style.display = 'none';
        document.querySelector('.select-mode-menu').style.display = 'block';
        soundManager.stopAll();
        if (CURRENT_REPLAY_MODE=='1VS1'){
            SOUND_MODE?gotomenu_sfx.play():0;
            SOUND_MODE = 0;
            BREAK_GAME_1VS1(CLEAR_ALL);
            SOUND_MODE = 1;
        } 
        else if (CURRENT_REPLAY_MODE=='VSAI'){
            SOUND_MODE?gotomenu_sfx.play():0;
            SOUND_MODE = 0;
            USED_SLOTS=0;
            CLEAR_SLOTS();
            CLEAR_STATUS();
            REPLAY_BTN_CONTAINER.style.display = 'block';
            SOUND_MODE = 1;
        }
    })
}

initializeEvents();
