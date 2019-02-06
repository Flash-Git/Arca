const AppAddress = "0x34d418E6019704815F626578eb4df5839f1a445d";
const executedStatus = Object.freeze({ "TRUE":1, "FALSE":2, "TOTRUE":3, "TOFALSE":4 });
const sendStatus = Object.freeze({ "UNSENT":1, "SENDING":2, "SENT":3 });
const satisfiedStatus = Object.freeze({ "TRUE":1, "FALSE":2, "TOTRUE":3, "TOFALSE":4 });
const userBoxStatus = Object.freeze({ "NO_BOX":0, "FIRST_BOX":2, "SECOND_BOX":3 });

export {
  AppAddress,
  executedStatus,
  sendStatus,
  satisfiedStatus,
  userBoxStatus
}