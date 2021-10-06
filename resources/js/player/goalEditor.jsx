

import ReactDOM from 'react-dom';
import React, {useState, useEffect} from 'react'

// material
import { Button } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import axios from 'axios';

import SendIcon from '@mui/icons-material/Send';

import { Rating, RatingView } from 'react-simple-star-rating'
import { time } from 'faker';


// ----------------------------------------------------------------------

const  GoalEditor = () => {

    const [long_term_goal,   SetLongTermGoal] = useState('');
    const [medium_term_goal, SetMediumTermGoal] = useState('');
    const [short_term_goal,  SetShortTermGoal] = useState('');

    const [match_list,  setMatchList] = useState([]);
    const [task_list, setTaskList] = useState([]);
    //-----------------------------------------------------------------
    const [study_start_time, setStudyStartTime] = useState(new Date());
    const [study_end_time, setStudyEndTime] = useState(new Date());

    const [sleep_start_time, setSleepStartTime] = useState(new Date());
    const [sleep_end_time, setSleepEndTime] = useState(new Date());

    const [push_up, setPushUp] = useState(0);
    const [muscle, setMuscle] = useState(0);
    const [spine, setSpine] = useState(0);
    
    const [stretch_time, setStretchTime] = useState(new Date());

    const [rate_breakfast, setRateBreakfast] = useState(0)
    const [rate_lunch, setRateLunch] = useState(0)
    const [rate_dinner, setRateDinner] = useState(0)
    //-------------------------------------------------------------------
   
    
    useEffect(() => {

        var obj1 = [
            {icon:'/images/icons/icon-ball.svg', content:'',        detail:'技術的な課題1',       rates:0,   type:'star5'},
            {icon:'/images/icons/icon-ball.svg', content:'',        detail:'技術的な課題2',       rates:0,   type:'star5'},
            {icon:'/images/icons/icon-ball.svg', content:'',        detail:'技術的な課題3',       rates:0,   type:'star5'},
            {icon:'/images/icons/icon-dumbbell.svg', content:'',        detail:'フィジカル的な課題1', rates:0,   type:'star5' },
            {icon:'/images/icons/icon-dumbbell.svg', content:'',        detail:'フィジカル的な課題2', rates:0,   type:'star5' },
            {icon:'/images/icons/icon-dumbbell.svg', content:'',        detail:'フィジカル的な課題3', rates:0,   type:'star5' },
            {icon:'/images/icons/icon-mental.svg', content:'',        detail:'メンタル的な課題1',   rates:0,   type:'star5' },
            {icon:'/images/icons/icon-mental.svg', content:'',        detail:'メンタル的な課題2',   rates:0,   type:'star5' },
            {icon:'/images/icons/icon-mental.svg', content:'',        detail:'メンタル的な課題3',   rates:0,   type:'star5' },
            {icon:'/images/icons/icon-strategy.svg', content:'',        detail:'戦術的な課題1',       rates:0,   type:'star5' },
            {icon:'/images/icons/icon-strategy.svg', content:'',        detail:'戦術的な課題2',       rates:0,   type:'star5' },
            {icon:'/images/icons/icon-strategy.svg', content:'',        detail:'戦術的な課題3',       rates:0,   type:'star5' }
            ];

        setTaskList(obj1);

    }, []);

   
    const handleSubmit = (e) => {
        e.preventDefault();
        const formdata = new FormData();
     
        formdata.append('task_list', JSON.parse())
        // setSubmit(true)

        // document.getElementById('loader').style.display = 'block';
        // axios.post('/player/goal/store', formdata)
        // .then(response => {
        //     if(response.data=='success'){
        //         setSubmit(false);
        //         window.location.href = '/player/goal';
        //     }
        // })
    }

    const addMatchItem = () => {
        setMatchList([...match_list, { match_date: new Date(), match_name: "", match_goal:'' }]);
    };

    const removeMatchItem = () => {
        const list = [...match_list];
        list.pop();
        setMatchList(list);
    };
    
    const changeMatchItem = (e, index) => {
        const { id, value } = e.target;
        const list = [...match_list];
        list[index][id] = value;
        setMatchList(list);
    };

    const changeTaskItem = (e, index) => {
        const { id, value } = e.target;
        const list = [...task_list];
        list[index][id] = value;
        setTaskList(list);
    }

    const changeTaskItemRate = (rate, index) => {
        const list = [...task_list];
        list[index]['rates'] = rate;
        setTaskList(list);
    }

    return (
    <>
    <form  className="needs-validation"  onSubmit={handleSubmit} >
        <div className="mt-3 py-2 rounded-15 bg-white shadow-lg">
            <h3 className="mt-2 p-1  text-white bg-green text-center font-weight-bold">
                <span>選手管理</span>
            </h3>
            <p className="w-50 w-md-75 p-1 pl-2 mb-2 bg-black-4 rounded-right-20 text-white">近日予定の試合</p>
            <div className="px-2 mb-2">
                <div className="text-center mb-1">
                    <img src="/images/icon-minus-black.svg" width="25" className="pointer mr-1" onClick={removeMatchItem}/>
                    <img src="/images/icon-plus-black.svg" width="25" className="pointer" onClick={addMatchItem}/>
                </div>
                <table className="table table-bordered table-success mb-2 text-center">
                    <tbody>
                        <tr>
                            <th>
                                <span>日にち</span>
                            </th>
                            <th>試合名</th>
                            <th style={{width:'100px'}}>
                                <span>目標</span>
                            </th>
                        </tr>
                        {
                            match_list.map((x, i)=>{
                                return(
                                    <tr key={i}>
                                        <td><input type="date" id="match_date" className="w-100 bg-none border-0 text-center hide-calender"  value={x.match_date} onChange={e => changeMatchItem(e, i)} required/></td>
                                        <td><input type="text" id="match_name" className="w-100 bg-none border-0 text-center"  value={x.match_name} onChange={e => changeMatchItem(e, i)} required/></td>
                                        <td>
                                            <select className="bg-none w-100 text-center border-0" id="match_goal" value={x.match_goal} onChange={e => changeMatchItem(e, i)} required>
                                                <option value="勝つ">勝つ</option>
                                                <option value="優勝">優勝</option>
                                                <option value="準優勝">準優勝</option>
                                                <option value="Best4">Best4</option>
                                                <option value="Best8">Best8</option>
                                                <option value="Best16">Best16</option>
                                                <option value="Best32">Best32</option>
                                            </select>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        
                    </tbody>
                </table>
                <table className="table table-bordered table-info mb-2 text-center">
                    <tbody>
                        <tr>
                            <th>長期目標</th>
                            <td><input type="text" name="name" className="w-100 bg-none border-0 text-center" value={long_term_goal} onChange={(e)=>SetLongTermGoal(e.target.value)} required /></td>
                        </tr>
                        <tr>
                            <th>中期目標</th>
                            <td><input type="text" name="name" className="w-100 bg-none border-0 text-center" value={medium_term_goal} onChange={(e)=>SetMediumTermGoal(e.target.value)} required /></td>
                        </tr>
                        <tr>
                            <th>短期目標</th>
                            <td><input type="text" name="name" className="w-100 bg-none border-0 text-center" value={short_term_goal} onChange={(e)=>SetShortTermGoal(e.target.value)} required /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p className="w-50 w-md-75 p-1 pl-2 mb-2 bg-black-4 rounded-right-20 text-white">短期目標に向かっての課題</p>
            <div className="px-2 mb-2 d-block d-sm-flex">
                <div className="w-50 w-sm-100 mb-3 mb-sm-0">
                    {
                        task_list.map((x, i)=>{
                            return(
                                <div className="p-1 d-flex justify-content-center border-1" key={i}>
                                    <div className="text-center"><img src={x.icon} width="30" height="30" /></div>
                                    <div className="text-center">
                                        <input type="text" name="content" id="content" className="w-100 bg-none border-0 text-center" placeholder={x.detail} value={x.content} onChange={(e)=>changeTaskItem(e, i)} required />
                                        <Rating onClick={(rate)=>changeTaskItemRate(rate, i)} ratingValue={x.rates} stars={5}/>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="w-50 w-sm-100">
                    <table className="table table-bordered mb-2 text-center ft-16">
                        <tbody>
                            <tr>
                                <td><img src="/images/icons/icon-book.svg" width="30" height="30" /></td>
                                <td><p className="mb-0 text-center">勉強時間</p></td>
                                <td>
                                    <span className="mr-3">開始:</span>
                                        <input type="time" className="border-0 mb-1" 
                                            value={study_start_time} onChange={e=>setStudyStartTime(e.target.value)} required/>
                                            
                                    <br/>

                                    <span className="mr-3">終了:</span>
                                        <input type="time" className="border-0" 
                                            value={study_end_time} onChange={e=>setStudyEndTime(e.target.value)} required/>
                                </td>
                            </tr>
                            <tr>
                                <td><img src="/images/icons/icon-pushups.svg" width="30" height="30" /></td>
                                <td><p className="mb-0 text-center">腕立て</p></td>
                                <td>
                                    <input type="number" min="0" step="1" className="border-0 text-center" 
                                        value={push_up} onChange={e=>setPushUp(e.target.value)} required/> 
                                </td>
                            </tr>
                            <tr>
                                <td><img src="/images/icons/icon-pilates.svg" width="30" height="30" /></td>
                                <td><p className="mb-0 text-center">腹筋</p></td>
                                <td>
                                    <input type="number" min="0" step="1" className="border-0 text-center" 
                                        value={muscle} onChange={e=>setMuscle(e.target.value)} required/> 
                                </td>
                            </tr>
                            <tr>
                                <td><img src="/images/icons/icon-gymnastics.svg" width="30" height="30" /></td>
                                <td><p className="mb-0 text-center">背筋</p></td>
                                <td>
                                    <input type="number" min="0" step="1" className="border-0 text-center" 
                                        value={spine} onChange={e=>setSpine(e.target.value)} required/> 
                                </td>
                            </tr>
                            <tr>
                                <td><img src="/images/icons/icon-stretching.svg" width="30" height="30" /></td>
                                <td><p className="mb-0 text-center">ストレッチ</p></td>
                                <td>
                                    <input type="time" className="border-0 text-center" 
                                        value={stretch_time} onChange={e=>setStretchTime(e.target.value)} required/> 
                                </td>
                            </tr>
                            <tr>
                                <td><img src="/images/icons/icon-food.svg" width="30" height="30" /></td>
                                <td><p className="mb-0 text-center">朝食</p></td>
                                <td>
                                    <Rating stars={3} ratingValue={rate_breakfast} onClick={rate=>setRateBreakfast(rate)}/>
                                </td>
                            </tr>
                            <tr>
                                <td><img src="/images/icons/icon-food.svg" width="30" height="30" /></td>
                                <td><p className="mb-0 text-center">昼食</p></td>
                                <td>
                                    <Rating stars={3} ratingValue={rate_lunch} onClick={rate=>setRateLunch(rate)}/>
                                </td>
                            </tr>
                            <tr>
                                <td><img src="/images/icons/icon-food.svg" width="30" height="30" /></td>
                                <td><p className="mb-0 text-center">夕食</p></td>
                                <td>
                                    <Rating stars={3} ratingValue={rate_dinner} onClick={rate=>setRateDinner(rate)}/>
                                </td>
                            </tr>
                            <tr>
                                <td><img src="/images/icons/icon-bed.svg" width="30" height="30" /></td>
                                <td><p className="mb-0 text-center">睡眠時間</p></td>
                                <td>
                                    <span className="mr-3">開始:</span><input type="time" className="border-0 mb-1" value={sleep_start_time} onChange={e=>setSleepStartTime(e.target.value)} required/><br/>
                                    <span className="mr-3">終了:</span><input type="time" className="border-0" value={sleep_end_time} onChange={e=>setSleepEndTime(e.target.value)} required/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>


        <div className="mt-3">
            <div className="row">
                <div className="col-6">
                    <Button size="large" color="primary" fullWidth variant="contained" style={{backgroundColor: 'transparent', border: '2px solid white'}} onClick={(e)=>window.location.href = '/player/goal'}>キャンセル</Button>
                </div>
                <div className="col-6">
                    <LoadingButton size="large" type="submit" color="primary" fullWidth  variant="contained" style={{backgroundColor: 'transparent', border: '2px solid white'}} endIcon={<SendIcon />}>
                        送信
                    </LoadingButton>
                </div>
            </div>
        </div>
    </form>
    </>
    );
  }

var element = document.querySelector('#goal-editor');
if(element){
    ReactDOM.render(<GoalEditor/>, element);
}

