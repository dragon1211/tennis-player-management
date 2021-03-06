import React, {useState, useEffect} from 'react'
import { useHistory, Link } from 'react-router-dom'
import axios from 'axios';

// material
import CircularProgress from '@material-ui/core/CircularProgress';

import { Button } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import SendIcon from '@mui/icons-material/Send';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import { Rating, RatingView } from 'react-simple-star-rating';
import { makeStyles } from '@material-ui/styles';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
    comment_show:{
        background: 'radial-gradient(yellow, transparent)'
    }
}));


function PlayerMatchResultNew(props) {
    
    const history = useHistory();
    const classes = useStyles();
    const [load, setLoad] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [open, setOpen] = useState(false);
    const [curPos, setCurrentPos] = useState({y:'', x:''});
    const [comment, setComment] = useState('');
    //////////////////////////////////////////////////
    const [tournament, setTournament] = useState(null);
    const [analysis_list, setAnalysisList] = useState(null);

    const [score_list, setScoreList] = useState([
        {type:'1set_mine',  total:0, round:[
            {score:0, keyGame:false, comment:''},
            {score:0, keyGame:false, comment:''},
            {score:0, keyGame:false, comment:''},
            {score:0, keyGame:false, comment:''},
            {score:0, keyGame:false, comment:''},
            {score:0, keyGame:false, comment:''},
            {score:0, keyGame:false, comment:''},
            {score:0, keyGame:false, comment:''},
            {score:0, keyGame:false, comment:''},
            {score:0, keyGame:false, comment:''},
            {score:0, keyGame:false, comment:''},
            {score:0, keyGame:false, comment:''}
        ] },
        {type:'1set_opp',  total:0, round:[
            {score:0, keyGame:false, comment:''},
            {score:0, keyGame:false, comment:''},
            {score:0, keyGame:false, comment:''},
            {score:0, keyGame:false, comment:''},
            {score:0, keyGame:false, comment:''},
            {score:0, keyGame:false, comment:''},
            {score:0, keyGame:false, comment:''},
            {score:0, keyGame:false, comment:''},
            {score:0, keyGame:false, comment:''},
            {score:0, keyGame:false, comment:''},
            {score:0, keyGame:false, comment:''},
            {score:0, keyGame:false, comment:''}
        ] },
        {type:'2set_mine',  total:0, round:[
            {score:0, keyGame:false, comment:''},
            {score:0, keyGame:false, comment:''},
            {score:0, keyGame:false, comment:''},
            {score:0, keyGame:false, comment:''},
            {score:0, keyGame:false, comment:''},
            {score:0, keyGame:false, comment:''},
            {score:0, keyGame:false, comment:''},
            {score:0, keyGame:false, comment:''},
            {score:0, keyGame:false, comment:''},
            {score:0, keyGame:false, comment:''},
            {score:0, keyGame:false, comment:''},
            {score:0, keyGame:false, comment:''}
        ] },
        {type:'2set_opp',  total:0, round:[
            {score:0, keyGame:false, comment:''},
            {score:0, keyGame:false, comment:''},
            {score:0, keyGame:false, comment:''},
            {score:0, keyGame:false, comment:''},
            {score:0, keyGame:false, comment:''},
            {score:0, keyGame:false, comment:''},
            {score:0, keyGame:false, comment:''},
            {score:0, keyGame:false, comment:''},
            {score:0, keyGame:false, comment:''},
            {score:0, keyGame:false, comment:''},
            {score:0, keyGame:false, comment:''},
            {score:0, keyGame:false, comment:''}
        ] },
        {type:'3set_mine',  total:0, round:[
            {score:0, keyGame:false, comment:''},
            {score:0, keyGame:false, comment:''},
            {score:0, keyGame:false, comment:''},
            {score:0, keyGame:false, comment:''},
            {score:0, keyGame:false, comment:''},
            {score:0, keyGame:false, comment:''},
            {score:0, keyGame:false, comment:''},
            {score:0, keyGame:false, comment:''},
            {score:0, keyGame:false, comment:''},
            {score:0, keyGame:false, comment:''},
            {score:0, keyGame:false, comment:''},
            {score:0, keyGame:false, comment:''}
        ] },
        {type:'3set_opp',  total:0, round:[
            {score:0, keyGame:false, comment:''},
            {score:0, keyGame:false, comment:''},
            {score:0, keyGame:false, comment:''},
            {score:0, keyGame:false, comment:''},
            {score:0, keyGame:false, comment:''},
            {score:0, keyGame:false, comment:''},
            {score:0, keyGame:false, comment:''},
            {score:0, keyGame:false, comment:''},
            {score:0, keyGame:false, comment:''},
            {score:0, keyGame:false, comment:''},
            {score:0, keyGame:false, comment:''},
            {score:0, keyGame:false, comment:''}
        ] }
    ]);

    const [mood, setMood] = useState(0);
    const [caution_rate, setCautionRate] = useState([]);            //Object( {caution:'', rate:0})  //???????????????????????????
    const [effort_eval, setEffortEval] = useState(0);               //????????????????????????
    const [play_eval, setPlayEval] = useState(0);                   //????????????????????????
    // const [about_opponent, setAboutOpponent] = useState([]);        //??????????????????????????????
    const [tactics, setTactics] = useState('');            //?????????????????????????????????????????????????????????????????????????????????????????????
    const [improvement, setImprovement] = useState('');     //?????????????????????
    const [check_mental, setCheckMental] = useState([                  //????????????????????????????????????
        {sen1:'???????????????????????????',           rate:0, sen2:'??????????????????????????????'},
        {sen1:'????????????????????????????????????',  rate:0, sen2:'?????????????????????????????????????????????'},
        {sen1:'????????????????????????',                 rate:0, sen2:'?????????????????????'},
        {sen1:'???????????????????????????',            rate:0, sen2:'??????????????????????????????'},
        {sen1:'?????????????????????????????????????????????', rate:0, sen2:'????????????????????????????????????????????????'},
        {sen1:'?????????????????????????????????????????????',        rate:0, sen2:'????????????????????????????????????'},
        {sen1:'?????????????????????????????????????????????',   rate:0, sen2:'?????????????????????????????????????????????'},
        {sen1:'???????????????????????????',              rate:0, sen2:'???????????????????????????'},
        {sen1:'???????????????????????????',                rate:0, sen2:'????????????????????????'},
        {sen1:'???????????????????????????????????????????????????', rate:0, sen2:'???????????????????????????????????????????????????'},
        {sen1:'?????????????????????',                 rate:0, sen2:'?????????????????????'},
        {sen1:'?????????????????????????????????????????????',    rate:0, sen2:'??????????????????????????????????????????'}
    ])

    //////////////////////////////////////////////////

    useEffect( () => {
        setLoad(false);
        var id = Number(document.getElementById('player_id').value);
        axios.get(`/api/player/match/detail/${props.match.params?.id}`, {params:{player_id: id}})
        .then( response=>{
            setLoad(true);
            if(response.data.status_code == 200){

                setTournament(response.data.params.tournament);
                setAnalysisList(response.data.params.analysis);

                var arr = [];
                var caution_list = JSON.parse(response.data.params.tournament.caution_list);
                for(let i=0; i<caution_list.length; i++)
                    arr.push({caution:caution_list[i], rate:0});
                setCautionRate(arr);
            }
        })
    }, []);



    const handleSubmit = (e) => {
        e.preventDefault();

        var about_opponent = [];
        for(let i=0; i<analysis_list.length; i++)
        {
            if(document.getElementById('check'+i).checked)
                about_opponent.push(document.getElementById('check'+i).value);
        }

        setSubmit(true)
        const formdata = new FormData();
        formdata.append('caution_rate', JSON.stringify(caution_rate));
        formdata.append('effort_eval', effort_eval);
        formdata.append('play_eval', play_eval);
        formdata.append('tactics',    tactics);
        formdata.append('improvement', improvement);
        formdata.append('mood', mood);
        formdata.append('check_mental', JSON.stringify(check_mental));
        formdata.append('about_opponent', JSON.stringify(about_opponent));
        formdata.append('score_list',     JSON.stringify(score_list));

        axios.post('/api/player/match/result/store', formdata, {params:{tournament_id: tournament.id}})
        .then(response => {
            setSubmit(false);
            if(response.data.status_code == 200){
                history.push({
                    pathname: `/player/match/detail/${tournament.id}`,
                    state: {}
                });
            }
        })

    }

    const changeCautionRate = (rate, ix) => {
        const list = [...caution_rate];
        list[ix]['rate'] = rate;
        setCautionRate(list);
    }

    const changeCheckMental = (rate, ix) => {
        const list = [...check_mental];
        list[ix]['rate'] = rate;
        setCheckMental(list);
    }

    //-------------------------------
    const openModal = (y,x) => {
        setOpen(true);
        setComment(score_list[y]['round'][x]['comment']);
        setCurrentPos({y:y, x:x});
    };
    
    const commentOK = () => {
        if(comment == ''){
            document.getElementById('comment').focus();
            return;
        } 
        const list = [...score_list];
        list[curPos.y]['round'][curPos.x]['keyGame'] = true;
        list[curPos.y]['round'][curPos.x]['comment'] = comment;
        list[curPos.y]['round'][curPos.x]['score'] = 1;
        
        var sum = 0;
        for(let i=0; i<list[curPos.y]['round'].length; i++)
            sum += list[curPos.y]['round'][i]['score'];
        list[curPos.y]['total'] = sum;
        setScoreList(list);
        closeModal();
    };

    const commentCancel = () => {
        const list = [...score_list];
        list[curPos.y]['round'][curPos.x]['keyGame'] = false;
        list[curPos.y]['round'][curPos.x]['comment'] = '';
        list[curPos.y]['round'][curPos.x]['score'] = !list[curPos.y]['round'][curPos.x]['score'];
        
        var sum = 0;
        for(let i=0; i<list[curPos.y]['round'].length; i++)
            sum += list[curPos.y]['round'][i]['score'];
        list[curPos.y]['total'] = sum;
        setScoreList(list);
        closeModal();
    }

    const closeModal = () => {
        setOpen(false);
        setComment('');
    } 

    return (
    <form  className="needs-validation"  onSubmit={handleSubmit}>
        <div className="mt-3 py-2 rounded-15 bg-white shadow-lg" style={{minHeight:'700px'}}>
            <h3 className="mt-2 p-1 text-white bg-green text-center font-weight-bold position-relative">
                <span>??????????????????</span>
            </h3>
            {
                !load && 
                    <CircularProgress color="secondary" 
                        style={{top:'calc(40vh - 22px)', left:'calc(50% - 22px)', color:'green', position:'absolute'}}/>
            }
            {
                load && !tournament &&
                    <p className="mt-5 text-center">??????????????????????????????????????????</p>
            }
            {
                load && tournament &&
                <>
                    <p className="w-50 w-md-75 p-1 pl-2 mb-2 bg-black-4 rounded-right-20 text-white">???????????????????????????</p>
                    <div className="px-2 mb-2">
                        <table className="table text-left mb-2 ft-sm-16">
                            <tbody>
                            {
                                caution_rate?.map((x, i)=>
                                    <tr key={i}>
                                        <td className="w-40-px text-center" >{i+1}</td>
                                        <td>{x.caution}</td>
                                        <td style={{width: '210px'}}><Rating stars={10} size={20} ratingValue={x.rate} onClick={rate=>changeCautionRate(rate, i)}/></td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </table>
                        <p className="w-25 w-md-50 p-1 pl-2 mb-2 bg-black-4 rounded-right-20 text-white">????????????</p>
                        <table className="table text-left mb-2 ft-sm-16">
                            <tbody>
                                <tr>
                                    <td>????????????????????????</td>
                                    <td style={{width: '210px'}}><Rating stars={10} size={20} ratingValue={effort_eval} onClick={rate=>setEffortEval(rate)}/></td>
                                </tr>
                                <tr>
                                    <td>????????????????????????</td>
                                    <td style={{width: '210px'}}><Rating stars={10} size={20} ratingValue={play_eval} onClick={rate=>setPlayEval(rate)}/></td>
                                </tr>
                                <tr>
                                    <td>??????????????????????????????</td>
                                    <td><Rating stars={5} size={20} ratingValue={mood}  onClick={(rate)=>setMood(rate)} /></td>
                                </tr>
                            </tbody>
                        </table>
                        <p className="w-25 w-md-50 p-1 pl-2 mb-2 bg-black-4 rounded-right-20 text-white">???????????????</p>
                        <div style={{overflowX:'scroll'}}>
                            <table className="table table-bordered text-center table-success mb-0" id="result-table">
                                <tbody>
                                    <tr>
                                        <th colSpan="2"></th>
                                        <th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>10</th><th>11</th><th>12</th><th>T</th>
                                    </tr>
                                    {
                                        score_list.map((yItem, iy)=>
                                            <tr key={iy}>
                                                <th rowSpan="2" className={`align-middle ${iy%2==1 && 'd-none'}`}>{iy/2+1}set</th>
                                                <th className="w-60-px">{iy%2==0 ?'??????':'??????'}</th>
                                                {
                                                    yItem.round.map((xItem, ix)=>
                                                        <td key={ix} className={`${xItem.keyGame && classes.comment_show}`} onClick={e=>openModal(iy, ix)}>
                                                            <RatingView ratingValue={xItem.score} stars={1} />
                                                        </td>             
                                                    )
                                                }
                                                <th className="w-65-px">{yItem.total}</th>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <p className="w-50 w-md-75 p-1 pl-2 mb-2 bg-black-4 rounded-right-20 text-white">??????????????????????????????</p>
                    <div className="mx-2 mb-2 py-2 pl-3 pre-scrollable border">
                        {
                            analysis_list?.map((x, i)=>
                                <div className="form-check" key={i}>
                                    <input className="form-check-input" id={`check${i}`} type="checkbox" value={x.question}/>
                                    <label className="form-check-label pointer" htmlFor={`check${i}`}>
                                        {x.question}
                                    </label>
                                </div>
                            )
                        }
                    </div>
                    <div className="px-2 mb-2">
                        <table className="table table-bordered table-success mb-2 text-center">
                            <tbody>
                                <tr><th>??????????????????????????????????????????...</th></tr>
                                <tr><td><textarea name="tactics" className="w-100 bg-none border-0 p-1" cols="30" rows="4" placeholder="????????????????????????????????????????????????3???????????????????????????????????????" value={tactics} onChange={e => setTactics(e.target.value)} required/></td></tr>                                
                            </tbody>
                        </table>

                        <table className="table table-bordered table-success mb-2 text-center">
                            <tbody>
                                <tr><th>?????????????????????</th></tr>
                                <tr><td><textarea name="improvement" className="w-100 bg-none border-0 p-1"  cols="30" rows="4" value={improvement} onChange={e => setImprovement(e.target.value)} required/></td></tr>   
                            </tbody>
                        </table>
                    </div>

                    <p className="w-50 w-md-75 p-1 pl-2 mb-2 bg-black-4 rounded-right-20 text-white">???????????????????????????????????? </p>
                    <div className="mx-2 mb-2">
                        <table className="table mb-2 text-center ft-sm-16">
                            <tbody>
                            {
                                check_mental.map((x, i)=>
                                    <tr key={i}>
                                        <td className="w-40-px" >{i+1}</td>
                                        <td className="text-left">{x.sen1}</td>
                                        <td style={{minWidth:'110px'}}><Rating stars={5} size={20} ratingValue={x.rate} onClick={rate=>changeCheckMental(rate, i)}/></td>
                                        <td className="text-right">{x.sen2}</td>
                                    </tr>
                                )
                            }
                            
                            </tbody>
                        </table>
                    </div>


                    <div className="mt-3 mb-2 px-2 px-md-4">
                        <div className="row">
                            <div className="col-6">
                                <Link to="/player/match" style={{textDecoration:'none'}}>
                                    <Button size="large" fullWidth variant="contained" style={{backgroundColor: 'transparent', border: '1px solid green', color:'green', fontSize:'16px'}} >
                                        <span>?????????</span>
                                    </Button>
                                </Link>
                            </div>
                            <div className="col-6">
                                <LoadingButton size="large" type="submit" 
                                    fullWidth  
                                    variant="contained" 
                                    endIcon={<SendIcon />}
                                    style={{backgroundColor: 'green', fontSize:'16px'}}
                                    loading={submit}
                                >
                                    <span>??????</span>
                                </LoadingButton>
                            </div>
                        </div>
                    </div>

                    <Dialog
                        open={open}
                        TransitionComponent={Transition}
                        keepMounted
                        aria-describedby="alert-dialog-slide-description"
                        onClose={closeModal}
                    >
                        <DialogTitle style={{fontSize:'18px', textAlign:'center'}}>{"???????????????????????????????????????"}</DialogTitle>
                        <DialogContent className="px-3 py-0" style={{width:'350px'}}>
                            <textarea rows="5" className="w-100 p-2 ft-16" placeholder="??????????????????" id="comment" value={comment} onChange={e=>setComment(e.target.value)} required/>
                        </DialogContent>
                        <DialogActions className="pt-0 px-3">
                            <Button onClick={commentCancel} color="secondary" variant="contained" size="small">?????????</Button>
                            <Button type="submit" onClick={commentOK} color="primary" variant="contained" size="small">??????</Button>
                        </DialogActions>
                    </Dialog>
                </>
            }
        </div>
    </form>
    );
}



export default PlayerMatchResultNew;