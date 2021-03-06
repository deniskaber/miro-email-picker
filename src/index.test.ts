import {
    fireEvent,
    getByPlaceholderText,
    getByRole,
    getByText,
    queryByText,
    queryAllByText,
} from '@testing-library/dom';
import EmailsPicker from './index';
import * as emailUtils from './utils/email';

const render = () => {
    const root = document.createElement('div');
    const emailEditorInstance = EmailsPicker(root);

    return { root, emailEditorInstance };
};

describe('Email input widget', () => {
    it('should display title', () => {
        const { root } = render();

        expect(
            getByText(root, 'Share', {
                exact: false,
            })
        ).toBeTruthy();
        expect(getByText(root, 'Board name')).toBeTruthy();
        expect(
            getByText(root, 'with others', {
                exact: false,
            })
        ).toBeTruthy();
    });

    it('should display emails input field', () => {
        const { root } = render();

        expect(getByPlaceholderText(root, 'add more people...')).toBeTruthy();
    });

    it('should display "Add email" button', () => {
        const { root } = render();

        expect(getByText(root, 'Add email')).toBeTruthy();
    });

    it('should display "Get emails count" button', () => {
        const { root } = render();

        expect(getByText(root, 'Get emails count')).toBeTruthy();
    });

    describe('Adding email block', () => {
        it('should add email block on email input blur', () => {
            const { root } = render();

            const inputField = getByPlaceholderText(root, 'add more people...');

            fireEvent.change(inputField, {
                target: {
                    value: 'email@example.com',
                },
            });

            fireEvent.blur(inputField);

            expect(getByText(root, 'email@example.com')).toBeTruthy();
        });

        it('should add email block using widget api', () => {
            const { root, emailEditorInstance } = render();

            emailEditorInstance.addEmail('some-valid@email.com');

            expect(getByText(root, 'some-valid@email.com')).toBeTruthy();
        });

        it('should add email block using "Add email" button', () => {
            const { root } = render();

            jest.spyOn(emailUtils, 'getRandomEmail').mockReturnValueOnce('very-random@email.com');

            const addEmailButton = getByText(root, 'Add email');
            addEmailButton.click();

            expect(getByText(root, 'very-random@email.com')).toBeTruthy();
        });

        it('should add email block on email input "Enter" key press', async () => {
            const { root } = render();

            const inputField = getByPlaceholderText(root, 'add more people...');

            fireEvent.change(inputField, {
                target: {
                    value: 'email@example.com',
                },
            });
            fireEvent.keyDown(inputField, { key: 'Enter', code: 'Enter' });

            expect(getByText(root, 'email@example.com')).toBeTruthy();
        });

        it('should add email block on email input "," key press', async () => {
            const { root } = render();

            const inputField = getByPlaceholderText(root, 'add more people...');

            fireEvent.change(inputField, {
                target: {
                    value: 'email@example.com',
                },
            });
            fireEvent.keyDown(inputField, { key: ',', code: ',' });

            expect(getByText(root, 'email@example.com')).toBeTruthy();
        });

        it('should add email blocks on paste to email input', async () => {
            const { root } = render();

            const inputField = getByPlaceholderText(root, 'add more people...');

            fireEvent.paste(inputField, {
                clipboardData: {
                    getData: () => 'email@example.com, some-other@email.com',
                },
            });

            expect(getByText(root, 'email@example.com')).toBeTruthy();
            expect(getByText(root, 'some-other@email.com')).toBeTruthy();
        });

        it('should not add email that already exists', async () => {
            const { root, emailEditorInstance } = render();

            emailEditorInstance.addEmail('some-valid@email.com');
            emailEditorInstance.addEmail('some-valid@email.com');

            const emailBlocks = queryAllByText(root, 'some-valid@email.com');
            expect(emailBlocks.length).toBe(1);

            emailEditorInstance.addEmail('some-invalid.email.com');
            emailEditorInstance.addEmail('some-invalid.email.com');

            const invalidEmailBlocks = queryAllByText(root, 'some-invalid.email.com');
            expect(invalidEmailBlocks.length).toBe(1);
        });

        it('should not add email block that is a space', async () => {
            const { root, emailEditorInstance } = render();

            emailEditorInstance.addEmail(' ');

            const emailBlocks = root.querySelectorAll(`[data-email=""]`);
            expect(emailBlocks.length).toBe(0);
        });

        it('should not add email block that is an empty string', async () => {
            const { root, emailEditorInstance } = render();

            emailEditorInstance.addEmail('');

            const emailBlocks = root.querySelectorAll(`[data-email=""]`);
            expect(emailBlocks.length).toBe(0);
        });
    });

    describe('Removing email block', () => {
        it("should remove email block on it's remove button click", () => {
            const { root, emailEditorInstance } = render();

            emailEditorInstance.addEmail('some-valid@email.com');

            const emailBlock = getByText(root, 'some-valid@email.com').parentElement as HTMLElement;
            expect(emailBlock).toBeTruthy();

            const removeButton = getByRole(emailBlock, 'button');
            removeButton.click();

            expect(queryByText(root, 'some-valid@email.com')).toBeFalsy();
        });

        it('should remove email block on "Backspace" key press', () => {
            const { root, emailEditorInstance } = render();

            emailEditorInstance.addEmail('some-valid@email.com');
            expect(queryByText(root, 'some-valid@email.com')).toBeTruthy();

            const inputField = getByPlaceholderText(root, 'add more people...');
            fireEvent.keyDown(inputField, { key: 'Backspace', code: 'Backspace' });

            expect(queryByText(root, 'some-valid@email.com')).toBeFalsy();
        });
    });

    it('should display amount of valid emails on "Get emails count" button click', () => {
        const { root, emailEditorInstance } = render();

        const alertSpy = jest.spyOn(window, 'alert').mockImplementationOnce(() => {});

        emailEditorInstance.addEmail('some-valid@email.com');
        emailEditorInstance.addEmail('some-valid2@email.com');
        emailEditorInstance.addEmail('some-not-valid-email.com');

        const getEmailsCountButton = getByText(root, 'Get emails count');
        getEmailsCountButton.click();

        expect(alertSpy).toHaveBeenCalledWith(2);
    });
});
