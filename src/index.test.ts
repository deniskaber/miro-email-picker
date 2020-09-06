import { getByText } from "@testing-library/dom";
import EmailsInput from "./index";

const render = () => {
    const root = document.createElement("div");
    EmailsInput(root);

    return root;
};

describe("Email input", () => {
    it("should display title", () => {
        const root = render();

        expect(
            getByText(root, "Share", {
                exact: false,
            })
        ).toBeTruthy();
        expect(getByText(root, "Board name")).toBeTruthy();
        expect(
            getByText(root, "with others", {
                exact: false,
            })
        ).toBeTruthy();
    });
});