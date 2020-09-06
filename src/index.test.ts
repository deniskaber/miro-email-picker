import { fireEvent, getByPlaceholderText, getByRole, getByText, queryByText } from "@testing-library/dom";
import EmailsEditor from "./index";

const render = () => {
    const root = document.createElement("div");
    const emailEditorInstance = EmailsEditor(root);

    return { root, emailEditorInstance };
};

describe("Email input widget", () => {
    it("should display title", () => {
        const { root } = render();

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

    it("should display emails input field", () => {
        const { root } = render();

        expect(getByPlaceholderText(root, "add more people...")).toBeTruthy();
    });

    it('should display "Add email" button', () => {
        const { root } = render();

        expect(getByText(root, "Add email")).toBeTruthy();
    });

    it('should display "Get emails count" button', () => {
        const { root } = render();

        expect(getByText(root, "Get emails count")).toBeTruthy();
    });

    describe("Adding email block", () => {
        it("should add email block on email input blur", () => {
            const { root } = render();

            const inputField = getByPlaceholderText(root, "add more people...");

            fireEvent.change(inputField, {
                target: {
                    value: "email@example.com",
                },
            });

            fireEvent.blur(inputField);

            expect(getByText(root, "email@example.com")).toBeTruthy();
        });

        it("should add email block using widget api", () => {
            const { root, emailEditorInstance } = render();

            emailEditorInstance.addEmail("some-valid@email.com");

            expect(getByText(root, "some-valid@email.com")).toBeTruthy();
        });
    });

    describe("Removing email block", () => {
        it("should remove email block on it's remove button click", () => {
            const { root, emailEditorInstance } = render();

            emailEditorInstance.addEmail("some-valid@email.com");

            const emailBlock = getByText(root, "some-valid@email.com");
            expect(emailBlock).toBeTruthy();

            const removeButton = getByRole(emailBlock, "button");
            removeButton.click();

            expect(queryByText(root, "some-valid@email.com")).toBeFalsy();
        });
    });
});
