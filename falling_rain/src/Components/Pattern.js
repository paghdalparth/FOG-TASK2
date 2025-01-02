/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect} from "react";
const FrameWidth = 20;
const FrameHeight = 15;
let curr=0;
export default function Pattern() {
	const [initalFrame,setInitalFrame] = useState(
		Array.from({ length: FrameHeight }, () =>
			Array.from({ length: FrameWidth }, () => "#000000")
		)
	);

    function changeColorFinalAlgo(z){
        console.log(z);
    
        let y;
        if(z<=255){
            y=255-z;
            z = z.toString(16).toLocaleUpperCase();
            if (z.length === 0) z = "00";
            if (z.length === 1) z = "0" + z;
            y = y.toString(16).toLocaleUpperCase();
            if (y.length === 0) y = "00";
            if (y.length === 1) y = "0" + z;
            z='#'+z+y+'00';
        }
        else if(z>255&&z<=510){
            z-=255;
            y=255-z;
            z = z.toString(16).toLocaleUpperCase();
            if (z.length === 0) z = "00";
            if (z.length === 1) z = "0" + z;
            y = y.toString(16).toLocaleUpperCase();
            if (y.length === 0) y = "00";
            if (y.length === 1) y = "0" + z;
            z='#00'+z+y;
        }
        else{
            z-=510;
            y=255-z;
            z = z.toString(16).toLocaleUpperCase();
            if (z.length === 0) z = "00";
            if (z.length === 1) z = "0" + z;
            y = y.toString(16).toLocaleUpperCase();
            if (y.length === 0) y = "00";
            if (y.length === 1) y = "0" + z;
            z='#'+y+'00'+z;
        }
        console.log(z);
        return z;
    }

    function changeNextPixel(cell) {
        let r = cell.substring(1, 3);
        r = parseInt(r, 16);
        r /= 1.3;
        r = Math.floor(r);
        let g = cell.substring(3, 5);
        g = parseInt(g, 16);
        g /= 1.3;
        g = Math.floor(g);
        let b = cell.substring(5, 7);
        b = parseInt(b, 16);
        b /= 1.3;
        b = Math.floor(b);
        r = r.toString(16).toLocaleUpperCase();
        g = g.toString(16).toLocaleLowerCase();
        b = b.toString(16).toLocaleUpperCase();
        if (r.length === 0) r = "00";
        if (r.length === 1) r = "0" + r;
        if (g.length === 0) g = "00";
        if (g.length === 1) g = "0" + g;
        if (b.length === 0) b = "00";
        if (b.length === 1) b = "0" + b;
        return '#'+r+g+b;
    }
    

    function handleclick(){
        let top_row=Array.from({ length: FrameWidth }, () => "#000000");
        let y=Math.floor(Math.random()*FrameWidth);
        setInitalFrame((pre)=>{
            // eslint-disable-next-line array-callback-return
            pre[0].map((cell,index)=>{
                top_row[index]=changeNextPixel(cell);
            });
            top_row[y]= changeColorFinalAlgo(curr);
            curr+=8;
            curr%=765;
            pre.unshift(top_row);
            pre.pop();
            // setTimeout(handleclick,225);
            return  [...pre.map(p=>[...p])];
        })
    }
    useEffect(() => {
        // Your code here (side effect)
        const inter=setInterval(handleclick,225);
        return () => clearInterval(inter);
      }, [handleclick]);
	return (
		<>  
			{initalFrame.map((row, rowIndex) => (
				<>
					{row.map((cell, colIndex) => (
						
							<div
								key={`${rowIndex}-${colIndex}`}
								className={
									colIndex === FrameWidth-1  ? "divpixelnew" : "divpixel"
								}
								style={{ backgroundColor: cell }}
							></div>
						
					))}
				</>
			))}
            {}
		</>
	);
}
