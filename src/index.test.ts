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

        expect(getByText(root, "Type an email")).toBeTruthy();
    });
});
