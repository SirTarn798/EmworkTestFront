import { useNavigate } from "react-router-dom";

function ParticipantComp(props) {
    const navigate = useNavigate();
    console.log(props.participant)
    return (
        <div className="grid grid-cols-3 items-center gap-4 p-4 w-full border rounded-lg hover:bg-gray-50">
            <div className="text-gray-800">
                {props.participant.first_name + " " + props.participant.last_name}
            </div>
            <div className="flex justify-center">
                <img 
                    className="w-6 h-6 object-contain"
                    src={props.participant.final_status === "ผ่านการทดสอบ" ? "/check.png" : props.participant.final_status === "รอพิจารณา" ? "/wait.png" : "/cancel.png"}
                />
            </div>
            <div className="text-blue-600 hover:text-blue-800 cursor-pointer" onClick={() => navigate(`/edit/participant?id=${props.participant.id}`)}>
                ดูข้อมูลผู้เข้าทดสอบ
            </div>
        </div>
    );
}

export default ParticipantComp;