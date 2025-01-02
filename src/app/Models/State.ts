export class State{
    StateId;
    StateName;
    CountryId;
    constructor(StateId:number,StateName:string,CountryId:number){
        this.StateId=StateId;
        this.StateName=StateName;
        this.CountryId=CountryId;
    }
}