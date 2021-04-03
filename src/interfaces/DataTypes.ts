import LogMessageType from "@/interfaces/LogMessageType";
import {heartCircleOutline, rocketOutline} from "ionicons/icons";

export default interface DataTypes {
    heartCircleOutline: any;
    rocketOutline: any;
    sendOutline: any;
    logOutOutline: any;
    playerHealth: number;
    monsterHealth: number;
    currentRound: number;
    winner: string | null;
    logMessages: Array<LogMessageType>;
}
