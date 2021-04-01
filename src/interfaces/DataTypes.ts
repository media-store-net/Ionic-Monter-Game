import LogMessageType from "@/interfaces/LogMessageType";

export default interface DataTypes {
    playerHealth: number;
    monsterHealth: number;
    currentRound: number;
    winner: string | null;
    logMessages: Array<LogMessageType>;
}
