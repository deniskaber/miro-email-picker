import './polyfills';
import styles from './styles.scss';
import { EmailInputField } from './components/emailInputField';
import { EmailsContainer } from './components/emailsContainer';
import { ActionButton } from './components/actionButton';
import { EmailBlock } from './components/emailBlock';
import { checkEmailValidity, getRandomEmail } from './utils/email';

const template = `
<div class="${styles.widgetContainer}">
    <div class="${styles.panel}">
        <div class="${styles.panelBody}">
            <p class="${styles.titleText}">Share <span class="${styles.boldText}">Board name</span> with others</p>
        </div>
        <div class="${styles.panelFooter}"></div>
    </div> 
</div>
`;

const initEmailsEditorTemplate = (rootNode: HTMLElement) => {
    rootNode.innerHTML = template;

    const panelBody = rootNode.querySelector(`.${styles.panelBody}`) as HTMLElement;
    const emailsContainer = EmailsContainer();
    const inputField = EmailInputField();

    emailsContainer.appendChild(inputField);
    panelBody.appendChild(emailsContainer);

    const panelFooter = rootNode.querySelector(`.${styles.panelFooter}`) as HTMLElement;
    const addEmailButton = ActionButton({ text: 'Add email' });
    const getEmailsCountButton = ActionButton({ text: 'Get emails count' });

    panelFooter.appendChild(addEmailButton);
    panelFooter.appendChild(getEmailsCountButton);

    return {
        emailsContainer,
        inputField,
        addEmailButton,
        getEmailsCountButton,
    };
};

const EmailsPicker = (rootNode: HTMLElement) => {
    const { emailsContainer, inputField, addEmailButton, getEmailsCountButton } = initEmailsEditorTemplate(rootNode);

    const addedEmails: string[] = [];

    const addEmail = (passedEmail: string) => {
        let email = passedEmail.trim();

        email = email.trim();

        if (!email.length) {
            return;
        }

        const index = addedEmails.findIndex((emailToFind) => emailToFind === email);
        if (index > -1) {
            // skip emails that has been already added
            return;
        }

        addedEmails.push(email);

        const emailBlock = EmailBlock({
            email,
            onRemoveButtonClick: () => {
                removeEmail(email);
            },
        });

        (inputField.parentElement as HTMLElement).insertBefore(emailBlock, inputField);
    };

    const removeEmail = (email: string): void => {
        const index = addedEmails.findIndex((emailToFind) => emailToFind === email);
        const emailBlock = rootNode.querySelector(`.${styles.emailBlock}[data-email="${email}"]`);

        if (index === -1 || !emailBlock) {
            throw new Error(`Failed to find email "${email}" to remove.`);
        }

        addedEmails.splice(index, 1);
        emailBlock.remove();
    };

    const getValidEmailsList = (): string[] => {
        return addedEmails.filter(checkEmailValidity);
    };

    const getEmailsCount = (): number => {
        const validEmails = getValidEmailsList();

        alert(validEmails.length);

        return validEmails.length;
    };

    const handleEmailInputFieldFocus = () => {
        emailsContainer.classList.add(styles.unrealFocus);
    };

    const handleEmailInputFieldBlur = (e: FocusEvent) => {
        e.stopPropagation();
        const input = e.currentTarget as HTMLInputElement;

        emailsContainer.classList.remove(styles.unrealFocus);

        const textValue = input.value;

        if (!textValue) {
            return;
        }

        addEmail(textValue);

        input.value = '';
    };

    const handleEmailInputFieldKeyPress = (e: KeyboardEvent) => {
        const input = e.currentTarget as HTMLInputElement;

        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();

            addEmail(input.value);

            input.value = '';
        }

        if (e.key === 'Backspace' && !input.value) {
            const lastEmail = addedEmails[addedEmails.length - 1];
            removeEmail(lastEmail);
        }
    };

    const handleEmailInputFieldPaste = (e: ClipboardEvent) => {
        if (!e.clipboardData) {
            return;
        }

        const paste = e.clipboardData.getData('text');

        e.preventDefault();

        paste.split(',').forEach((email) => {
            addEmail(email);
        });
    };

    inputField.addEventListener('focus', handleEmailInputFieldFocus);
    inputField.addEventListener('blur', handleEmailInputFieldBlur);
    inputField.addEventListener('keydown', handleEmailInputFieldKeyPress);
    inputField.addEventListener('paste', handleEmailInputFieldPaste);

    emailsContainer.addEventListener('click', (e: MouseEvent) => {
        if (e.target === e.currentTarget) {
            inputField.focus();
        }
    });

    addEmailButton.addEventListener('click', () => addEmail(getRandomEmail()));
    getEmailsCountButton.addEventListener('click', () => getEmailsCount());

    const destroy = () => {
        Array.from(rootNode.childNodes).forEach((child) => {
            child.remove();
        });
    };

    return {
        addEmail,
        removeEmail,
        getValue: getValidEmailsList,
        destroy,
    };
};

export default EmailsPicker;
