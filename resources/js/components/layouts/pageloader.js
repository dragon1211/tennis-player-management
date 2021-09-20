import React, { useState, useEffect }from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';


export  default function PageLoader({id}){
  // save current window width in the state object
    let [width, setWidth] = useState(null);
    let [height, setHeight] = useState(null);

    const handleResize = () => {
        var w = document.getElementById(id).offsetWidth / 2 - 10;
        var h = document.getElementById(id).offsetHeight / 2 - 20;
        setWidth(w);
        setHeight(h);
        
        console.log(w, h)
    }

    useEffect(() => {

        handleResize();

        const resizeListener = () => {
            handleResize();
        };

        window.addEventListener('resize', resizeListener);

        return () => {
          window.removeEventListener('resize', resizeListener);
        }

    }, []);


  return (
    <CircularProgress color="secondary" style={{top:height, color:'#10580c', left:width, position:'absolute'}}/>
  );
}