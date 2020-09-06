import styles from './styles.scss';
import { EmailInputField } from './components/emailInputField';
import { EmailsContainer } from './components/emailsContainer';
import { ActionButton } from './components/actionButton';
import { EmailBlock } from './components/emailBlock';
import { getRandomEmail } from './utils/email';

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

const initWidgetTemplate = (rootNode: HTMLElement) => {
    rootNode.innerHTML = template;

    const panelBody = rootNode.querySelector(`.${styles.panelBody}`) as HTMLElement;
    const emailsContainer = EmailsContainer();
    const inputField = EmailInputField();

    emailsContainer.append(inputField);
    panelBody.append(emailsContainer);

    const panelFooter = rootNode.querySelector(`.${styles.panelFooter}`) as HTMLElement;
    const addEmailButton = ActionButton({ text: 'Add email' });
    const getEmailsCountButton = ActionButton({ text: 'Get emails count' });

    panelFooter.append(addEmailButton);
    panelFooter.append(getEmailsCountButton);

    return {
        emailsContainer,
        inputField,
        addEmailButton,
        getEmailsCountButton,
    };
};

const EmailsEditor = (rootNode: HTMLElement) => {
    const { emailsContainer, inputField, addEmailButton, getEmailsCountButton } = initWidgetTemplate(rootNode);

    const addEmail = (passedEmail: string) => {
        let email = passedEmail.trim();

        email = email.trim();

        const emailBlock = EmailBlock({
            text: email,
            onRemoveButtonClick: () => {
                emailBlock.remove();
            },
        });

        inputField.before(emailBlock);
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

    inputField.addEventListener('focus', handleEmailInputFieldFocus);
    inputField.addEventListener('blur', handleEmailInputFieldBlur);

    emailsContainer.addEventListener('click', (e: MouseEvent) => {
        if (e.target === e.currentTarget) {
            inputField.focus();
        }
    });

    addEmailButton.addEventListener('click', () => addEmail(getRandomEmail()));

    return {
        addEmail,
    };
};

export default EmailsEditor;
