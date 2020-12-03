import {} from "../types";

import { Action, UserState } from "context";

const UserReducer = (
  state: UserState,
  { payload, type }: Action
): UserState => {
  switch (type) {
    default:
      return state;
  }
};

export default UserReducer;
