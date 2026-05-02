import { useEffect, useState } from "react"
import { checkHeading, replaceHeadingStars } from "../helper";



const Answer = ({ ans,totalResult, index}) => {

    const [heading, setHeading] = useState(false)
    const [answer, setAnswer] = useState(ans);
    console.log(index);
    // console.log(ans, key);
    useEffect(() => {
        if(checkHeading(ans)){
            setHeading(true)
            setAnswer(replaceHeadingStars(answer));
        }

    }, [])


    return (

        <>
        {
            index==0 && totalResult>1 ? <span className="text-2xl text-white">{answer}</span>:
            heading? <span className="pt-2 text-lg block text-white">{answer}</span>: <span className='pl-5'>{answer}</span>
        }
            {/* {ans} */}
            
        </>
    )
}
export default Answer