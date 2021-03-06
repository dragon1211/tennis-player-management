import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

import { LoadingButton } from '@material-ui/lab';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

import moment from 'moment';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


function PlayerMatch() {

    const [open, setOpen] = useState(false);
    const [load, setLoad] = useState(false);
    const [tournament_list, setTournamentList] = useState([]);
    const [deleteIndex, setDeleteIndex] = useState(null);
    const [submit, setSubmit] = useState(false);

    useEffect( () => {

        setLoad(false);
        
        var id = Number(document.getElementById('player_id').value);
        axios.get('/api/player/match/list', {params:{player_id: id}})
        .then( response=>{
            setLoad(true);
            if(response.data.status_code == 200){
                setTournamentList(response.data.params);
            }
        })
    }, []);


    const openModal = (ix) => {
        setOpen(true);
        setDeleteIndex(ix);
    };
    
    const handleOK = () => {
        
        setSubmit(true);

        var id = Number(document.getElementById('player_id').value);
        axios.delete('/api/player/match/delete/'+ deleteIndex, {params:{player_id: id}})
        .then(response=>{
            setSubmit(false);
            closeModal();
            if(response.data.status_code == 200){
                notify();
                setTournamentList(response.data.params)
            }
        })
    };

    const closeModal = () => {
        setOpen(false);
    } 


    const notify = () => 
    toast.success("????????????", {
        position: "top-right",
        autoClose: 5000,
        className:"bg-danger",
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        style:{ color: '#ffffff'}
    });

    return (
    <div id="match">
        <div className="mt-3 py-2 rounded-15 bg-white shadow-lg" style={{minHeight:'700px'}}>
            <h3 className="mt-2 p-1 position-relative text-white bg-green text-center font-weight-bold">
                <Link to="/player/match/prepare/new">
                    <IconButton style={{color:'white', position:'absolute', padding:'3px', left:'23px'}}>
                        <AddIcon/>
                    </IconButton>
                </Link>
                <span>????????????</span>
                <Link to="/player/match/prepare/new">
                    <IconButton style={{color:'white', position:'absolute', padding:'3px', right:'23px'}}>
                        <AddIcon/>
                    </IconButton>
                </Link>
            </h3>
            {
                !load && <CircularProgress color="secondary" style={{top:'calc(40vh - 22px)', left:'calc(50% - 22px)', color:'green', position:'absolute'}}/>
            }
            {
                load &&
                <>
                    <p className="w-50 w-md-75 p-1 pl-2 mb-2 bg-black-4 rounded-right-20 text-white">??????????????????????????????</p>
                    {
                        tournament_list &&
                            <p className="mb-2 pl-2 ft-xs-15">?????????:{tournament_list.length}</p>
                    }
                    <div className="pl-2 mb-2">
                        <div style={{overflowX:'scroll', overflowY:'scroll', maxHeight:'600px'}}>
                            <table className="table table-bordered mb-0 text-center ft-xs-15">
                                <tbody>
                                    <tr>
                                        <th className="w-25-px"></th>
                                        <th>?????????</th>
                                        <th>??????</th>
                                        <th>?????????</th>
                                        <th>??????????????????</th>
                                        <th className="w-25-px"></th>
                                    </tr>
                                    {
                                        tournament_list.length > 0 ?
                                            tournament_list?.map((x, i)=>
                                                <tr className="pointer" key={i}>
                                                    <td>{i+1}</td>
                                                    <td>
                                                        <Link to={`/player/match/detail/${x.id}`}>  
                                                            {moment(x.tournament_date).format("YYYY/MM/DD")}
                                                        </Link>
                                                    </td>
                                                    <td>{x.opponent_name}</td>
                                                    <td>{x.opponent_club}</td>
                                                    {
                                                        x.tournament_result ? 
                                                            <td>                         
                                                                {moment(x.tournament_result.created_at).format('YYYY/MM/DD  HH:mm')}
                                                            </td>
                                                            :<td>
                                                                <Link to={`/player/match/result/new/${x.id}`}>                                
                                                                    ?????????
                                                                </Link>
                                                            </td>
                                                    }
                                                    <td className="p-0">
                                                        <IconButton color="error" size="small" onClick={e=>openModal(x.id)}>
                                                            <DeleteIcon fontSize="small"/>
                                                        </IconButton>
                                                    </td> 
                                                </tr>
                                            )
                                        : <tr><td colSpan="5">?????????????????????????????????????????????</td></tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                        
                    </div>
                </>
            }
        </div>
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle style={{fontSize:'18px', textAlign:'center'}}>{"??????????????????????????????"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description" style={{fontSize:'16px'}}>
                    ?????????????????????????????????????????????????????????<br/>
                    ?????????????????????????????????
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeModal} size="small" color="secondary" variant="contained">?????????</Button>
                <LoadingButton loading={submit} onClick={handleOK} size="small" color="primary" variant="contained">??????</LoadingButton>
            </DialogActions>
        </Dialog>
        

        <ToastContainer />
    </div>
    );
}



export default PlayerMatch;