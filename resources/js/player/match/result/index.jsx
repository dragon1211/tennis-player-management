import React, {useState, useEffect} from 'react'
import { useHistory, Link } from 'react-router-dom'

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import moment from 'moment';

import { Button } from '@material-ui/core';
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
        background: 'radial-gradient(yellow, transparent)',
        cursor:'pointer',
    },
}));



const PlayerMatchResult = ({tournament}) => {

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [current_comment, setCurrentComment] = useState('');

    const tournament_result = tournament.tournament_result;
    var score_list, 
        about_oppenent,
        tactics,
        improvement,
        check_mental;
    if(tournament_result)
    {
        score_list = JSON.parse(tournament_result.score_list);
        about_oppenent = JSON.parse(tournament_result.about_opponent);
        tactics = tournament_result.tactics;
        improvement = tournament_result.improvement;
        check_mental = JSON.parse(tournament_result.check_mental);
    }

    const openModal = (comment) => {
        setOpen(true);
        setCurrentComment(comment);
    }

    const closeModal = ()=>{
        setOpen(false);
        setCurrentComment('');
    }


    return (
    <div id="result">
        <div className="mt-5 py-2 rounded-15 bg-white shadow-lg" style={{minHeight:'700px'}}>
            <h3 className="mt-2 p-1 text-white bg-green text-center font-weight-bold position-relative">
                <Link to="/player/match">
                    <IconButton style={{color:'white', position:'absolute', padding:'3px', left:'23px'}}>
                        <ArrowBackIcon/>
                    </IconButton>
                </Link>
                <span>??????????????????</span>
                {
                    tournament_result && 
                        <Link to={`/player/match/result/edit/${tournament?.id}`}>
                            <IconButton style={{color:'white', position:'absolute', padding:'3px', right:'23px'}}>
                                <EditIcon/>
                            </IconButton>
                        </Link>
                }
            </h3>
            {
                !tournament_result &&
                    <p className="mt-5 text-center">
                        ??????????????????????????????????????????????????????<br/>
                        <Link to={`/player/match/result/new/${tournament?.id}`}><span>?????????????????????????????????...</span></Link>
                    </p>
            }
            {
               tournament_result &&
                <>
                    <p className="w-50 w-md-75 p-1 pl-2 mb-2 bg-black-4 rounded-right-20 ft-xs-15 text-white">???????????????????????????</p>
                    <div className="px-2 mb-2">
                        <div>
                        {
                            JSON.parse(tournament_result.caution_rate).map((x, i)=>
                                <div className="d-block d-sm-flex justify-content-between mb-1" key={i}>
                                    <div>{x.caution}</div>
                                    <div><RatingView stars={10} ratingValue={x.rate} size={20}/></div>
                                </div>
                            )
                        }
                        </div>
                        <p className="w-25 w-md-50 p-1 pl-2 mb-2 bg-black-4 rounded-right-20 ft-xs-15 text-white">????????????</p>
                        <div className="mb-2">
                            <div className="d-block d-sm-flex justify-content-between mb-1">
                                <div>????????????????????????</div>
                                <div><RatingView stars={10} ratingValue={tournament_result.effort_eval} size={20}/></div>
                            </div>
                            <div className="d-block d-sm-flex justify-content-between">
                                <div>????????????????????????</div>
                                <div><RatingView stars={10} ratingValue={tournament_result.play_eval} size={20}/></div>
                            </div>
                            <div className="d-block d-sm-flex justify-content-between mb-1">
                                <div>??????????????????????????????</div>
                                <div><RatingView stars={5} ratingValue={tournament_result.mood} size={20}/></div>
                            </div>
                        </div>

                        <p className="w-25 w-md-50 p-1 pl-2 mb-2 bg-black-4 rounded-right-20 ft-xs-15 text-white">???????????????</p>
                        <div style={{overflowX:'scroll'}}>
                            <table className="table table-bordered text-center table-success mb-0" id="result-table-view">
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
                                                    yItem.round.map((xItem, ix)=>{
                                                        return(
                                                            xItem.keyGame ? 
                                                            <td key={ix} className={classes.comment_show} onClick={e=>openModal(xItem.comment)}>
                                                                <RatingView ratingValue={xItem.score} stars={1}/>
                                                            </td>
                                                            :<td key={ix}>
                                                                <RatingView ratingValue={xItem.score} stars={1}/>
                                                            </td>    
                                                        )           
                                                    })
                                                }
                                                <th className="w-65-px">{yItem.total}</th>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <p className="w-50 w-md-75 p-1 pl-2 mb-2 bg-black-4 rounded-right-20 ft-xs-15 text-white">??????????????????????????????</p>
                    <div className="px-2 mb-2 pre-scrollable">
                        <table className="table table-bordered text-center mb-0">
                            <tbody>
                                {
                                    about_oppenent.length > 0 ?
                                        about_oppenent.map((x, i)=>
                                            <tr key={i}>
                                                <td className="w-40-px"><span>{i+1}</span></td>
                                                <td>{x}</td>
                                            </tr>
                                        )
                                    : <tr><td>?????????????????????????????????????????????????????????</td></tr>
                                }
                            </tbody>
                        </table>
                    </div>

                    <div className="px-2 mb-2">
                        <table className="table table-bordered table-success mb-2 text-center">
                            <tbody>
                                <tr><th>??????????????????????????????????????????...</th></tr>
                                <tr><td className="text-left">{tactics}</td></tr>
                            </tbody>
                        </table>

                        <table className="table table-bordered table-success mb-2 text-center">
                            <tbody>
                                <tr><th>?????????????????????</th></tr>
                                <tr><td className="text-left">{improvement}</td></tr>
                            </tbody>
                        </table>
                    </div>

                    <p className="w-50 w-md-75 p-1 pl-2 mb-2 bg-black-4 rounded-right-20 ft-xs-15 text-white">???????????????????????????????????? </p>
                    <div className="mx-2 mb-2">
                        <table className="table mb-2 text-center ft-xs-16">
                            <tbody>
                            {
                                check_mental.map((x, i)=>
                                    <tr key={i}>
                                        <td className="w-40-px" >{i+1}</td>
                                        <td className="text-left">{x.sen1}</td>
                                        <td style={{minWidth:'110px'}}><RatingView stars={5} size={20} ratingValue={x.rate}/></td>
                                        <td className="text-right">{x.sen2}</td>
                                    </tr>
                                )
                            }
                            
                            </tbody>
                        </table>
                    </div>
               
                    <p className="w-100 p-1 pl-2 mb-2 bg-black-4 text-white text-right ft-xs-15 d-flex justify-content-between flex-column flex-sm-row">
                        <span>????????? : {moment(tournament_result.created_at).format('YYYY/MM/DD HH:mm')}</span>
                        <span>????????? : {moment(tournament_result.updated_at).format('YYYY/MM/DD HH:mm')}</span>
                    </p>

                    <Dialog
                        open={open}
                        TransitionComponent={Transition}
                        keepMounted
                        aria-describedby="alert-dialog-slide-description"
                        onClose={closeModal}
                        style={{minWidth:'300px'}}
                    >
                        <DialogTitle style={{fontSize:'18px', textAlign:'center'}}>{"????????????"}</DialogTitle>
                        <DialogContent className="px-2 py-0">
                            <pre id="alert-dialog-slide-description" className="p-2 table-info rounded" style={{minHeight:'150px'}}>
                                {current_comment}
                            </pre>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={closeModal} color="primary" variant="contained" size="small">??????</Button>
                        </DialogActions>
                    </Dialog>
                </>
            }
        </div>
    </div>
    );
}


export default PlayerMatchResult;