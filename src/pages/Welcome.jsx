import useTime from "../hooks/useTime"

export default function Welcome(){
  const {time} = useTime()
  
  return (
    <div id="welcome-page">
      <div className="time-welcome-page">
      {time}
      </div>
    </div>
  )
}