const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SETUSERS = "SETUSERS";

export type UsersType = {
  id: number;
  photos: {
    small: string | null;
    large: string | null;
  };
  foollowed: boolean;
  name: string;
  status: string;
  message: string;
  location: { city: string; contry: string };
};
export type InitialStateType = {
  users: UsersType[];
};

type FollowACType = ReturnType<typeof followAC>;
type UnFollowACType = ReturnType<typeof unfollowAC>;
type SetUsersAcType = ReturnType<typeof setUsersAC>;

type ActionType = FollowACType | UnFollowACType | SetUsersAcType;

const initialState: InitialStateType = {
  users: [],
};

const UsersRedusers = (
  state: InitialStateType = initialState,
  action: ActionType
): InitialStateType => {
  switch (action.type) {
    case FOLLOW: {
      return {
        ...state,
        users: [...state["users"]].map((item) =>
          item.id === action.payload.userId
            ? { ...item, foollowed: true }
            : item
        ),
      };
    }
    case UNFOLLOW: {
      return {
        ...state,
        users: [...state["users"]].map((item) =>
          item.id === action.payload.userId
            ? { ...item, foollowed: false }
            : item
        ),
      };
    }
    case SETUSERS: {
      return {
        ...state,
        users: [...state["users"], ...action.payload.users],
      };
    }

    default:
      return state;
  }
};

export const followAC = (id: number) =>
  ({
    type: FOLLOW,
    payload: {
      userId: id,
    },
  } as const);

export const unfollowAC = (id: number) =>
  ({
    type: UNFOLLOW,
    payload: {
      userId: id,
    },
  } as const);

export const setUsersAC = (users: UsersType[]) =>
  ({
    type: SETUSERS,
    payload: {
      users: users,
    },
  } as const);
export default UsersRedusers;
