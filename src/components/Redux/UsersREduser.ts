const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SETUSERS = "SETUSERS";

type UsersType = {
  id: number;
  foollowed: boolean;
  fullName: string;
  status: string;
  location: { city: string; contry: string };
};
type InitialStateType = {
  users: UsersType[];
};

type FollowACType = ReturnType<typeof followAC>;
type UnFollowACType = ReturnType<typeof unfollowAC>;
type SetUsersAcType = ReturnType<typeof setUsersAC>;

type ActionType = FollowACType | UnFollowACType | SetUsersAcType;

const initialState: InitialStateType = {
  users: [
    {
      id: 1,
      foollowed: false,
      fullName: "George",
      status: "boss",
      location: { city: "Brest", contry: "Belarus" },
    },
    {
      id: 2,
      foollowed: true,
      fullName: "Marc",
      status: "boss",
      location: { city: "Minsk", contry: "Belarus" },
    },
    {
      id: 3,
      foollowed: false,
      fullName: "Pit",
      status: "boss",
      location: { city: "Moskow", contry: "Russia" },
    },
    {
      id: 4,
      foollowed: true,
      fullName: "Anna",
      status: "boss",
      location: { city: "Kiev", contry: "Ukraine" },
    },
  ],
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
