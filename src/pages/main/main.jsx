import { useNavigate } from "react-router-dom";
import ParticipantComp from "../../components/participant";
import { useEffect, useState } from "react";

function MainPage() {

  const [participants, setParticipants] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const getParticipants = async () => {
        const link = "http://localhost:3001/getAllparticipants";
        try {
        const response = await fetch(link, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log(data)
        setParticipants(data);
      } catch (error) {
        console.log(error);
      }
    };
    getParticipants();
  }, []);

  return (
    <div className="w-screen flex justify-center">
      <div className="flex flex-col items-center gap-5 mt-10">
        <div className="flex gap-2 items-center">
          <p>รายชื่อผู้สมัคร</p>
          <button
            className="bg-rose-500 p-2 rounded"
            onClick={() => navigate("/add-participant")}
          >
            เพิ่มผู้สมัคร
          </button>
        </div>
        <div>
          {participants?.map((participant) => {
            return <ParticipantComp participant={participant} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default MainPage;
