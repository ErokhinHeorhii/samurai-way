import ProfileReducer, {
    addPostActionCreater,
    deletePostACForTest,
    InitialStateTypeForProfile
} from "./ProfileReduser";
import {v1} from "uuid";
import {myPostType} from "../../Profile/MyPost/MyPost";
let initialState: InitialStateTypeForProfile
const id_0 = v1()
const id_1 = v1()
const id_2 = v1()

beforeEach(()=>{

     initialState = {
        posts: [
            {id: id_0, message: "Hi", likeCount: 10},
            {id: id_1, message: "How are you", likeCount: 2},
            {id: id_2, message: "yooo", likeCount: 4},
        ],
        profile: null,
        status: "Hello"
    }
})

test('new post shout be added', () => {

    const action = addPostActionCreater("Hello")

    const endState = ProfileReducer(initialState, action)

    expect(endState.posts.length).toBe(4)
})

test('new post shout be this message', () => {

    const action = addPostActionCreater("Hello Everybody")

    const endState = ProfileReducer(initialState, action)

    expect(endState.posts[0].message).toBe("Hello Everybody")
})

test('after delete posts length shout be less', () => {

    const action = deletePostACForTest(id_0)

    const endState = ProfileReducer(initialState, action)

    expect(endState.posts.length).toBe(2)
    expect(endState.posts[0].message).toBe("How are you")
})
