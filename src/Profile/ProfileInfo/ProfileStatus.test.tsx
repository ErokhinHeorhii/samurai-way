
import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {
    test("status from props shout be in the state",  async () => {
        const component = create(<ProfileStatus  status={"Hello"} updateStatusThunkCreator={()=>{}}/>);
        const instance =  await component.getInstance()
        //@ts-ignore
        expect(instance!.state.status).toBe("Hello");
    });

    test("<span> should be in the component", async () => {
        const component = create(<ProfileStatus  status={"Hello"} updateStatusThunkCreator={()=>{}}/>);
        const root = component.root
        let span = await root.findByType("span")
        expect(span).not.toBeNull();
    });
    test("<span> should not to be in the component", async () => {
        const component = create(<ProfileStatus  status={"Hello"} updateStatusThunkCreator={()=>{}}/>);
        const root = component.root
        await expect(async () => {
            let input = await root.findByType("input")
        }).rejects.toThrow();
    });
    test("<span> should contains correct status", async () => {
        const component = create(<ProfileStatus  status={"Hello"} updateStatusThunkCreator={()=>{}}/>);
        const root = component.root
        let span= await root.findByType("span")
        expect(span.children[0]).toBe("Hello");
    });
    test("<input> should be displayed in editMode instead of span", async () => {
        const component = create(<ProfileStatus  status={"Hello"} updateStatusThunkCreator={()=>{}}/>);
        const root = component.root
        let span= await root.findByType("span")
        span.props.onDoubleClick()
        let input = await root.findByType("input")
        expect(input.props.value).toBe("Hello");
    });

});