// "use client"
// import { useEffect, useState } from "react"

// const CountDown = () => {
//     const [endTime,setEndTime] = useState(false)
//     const [days,setDays] = useState(0)
//     const [hours,setHours] = useState(0)
//     const [miniutes,setMiniutes] = useState(0)
//     const [seconds,setSeconds] = useState(0)
    
//    useEffect(()=>{
//     const target = new Date("6/30/2024 23:59:59")
//     const interval = setInterval(()=>{
//         const now = new Date()
//         const difference = target.getTime() - now.getTime()

//         const d = Math.floor(difference / (1000 * 60 * 60 * 24))
//         setDays(d)

//         const h = Math.floor(
//             (difference % ( 1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
//         )
//         setHours(h)

//         const m = Math.floor(
//             (difference / (1000 * 60 * 60)) / (1000 * 60)
//         )
//         setMiniutes(m)

//         const s = Math.floor((difference % (1000*60)) / 1000)
//         setSeconds(s)

//         // if(d <=0 && h <=0 && m <=0 && s <= 0){
        
//         // }
//     })

//    },[])
//   return (
//    <div>
//     {
//         endTime ? (
//             <h1>Time is Up!!</h1>
//         ):(
//             <div className="time-wrapper">
//             <div className="time-inner flex text-white">
//             <div className="timer-segment p-3 bg-[#FF6801]">
//             <span className="time">{days}</span>
//             <span className="label">Days</span>
//             </div>
//             <span className="">:</span>
//             <div className="timer-segment p-3 bg-[#FF6801]">
//             <span className="time">{hours}</span>
//             <span className="label">Hours</span>
//             </div>
//             <span>:</span>
//             <div className="timer-segment p-3 bg-[#FF6801]">
//             <span className="time">{miniutes}</span>
//             <span className="label">Miniutes</span>
//             </div>
//             <span>:</span>
//             <div className="timer-segment p-3 bg-[#FF6801]">
//             <span className="time">{seconds}</span>
//             <span className="label">Seconds</span>
//             </div>
//             </div>
//         </div>
//         )
//     }
//    </div>
//   )
// }

// export default CountDown