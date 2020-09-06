import styles from "./styles.scss";
import { EmailInputField } from "./components/emailInputField";
import { EmailsContainer } from "./components/emailsContainer";
import { ActionButton } from "./components/actionButton";
import { EmailBlock } from "./components/emailBlock";

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
    const addEmailButton = ActionButton({ text: "Add email" });
    const getEmailsCountButton = ActionButton({ text: "Get emails count" });

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
        const email = passedEmail.trim();

        const emailBlock = EmailBlock({
            text: email,
            onRemoveButtonClick: () => {
                emailBlock.remove();
            },
        });

        inputField.before(emailBlock);
    };

    const handleEmailInputFieldBlur = (e: FocusEvent) => {
        const input = e.currentTarget as HTMLInputElement;

        const textValue = input.value;

        if (!textValue) {
            return;
        }

        addEmail(textValue);

        input.value = "";
    };

    inputField.addEventListener("blur", handleEmailInputFieldBlur);

    return {
        addEmail,
    };
};

export default EmailsEditor;
