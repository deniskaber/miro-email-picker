import styles from "./styles.scss";
import { EmailInputField } from "./components/emailInputField";
import { EmailsContainer } from "./components/emailsContainer";
import { ActionButton } from "./components/actionButton";

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

const EmailsInput = (rootNode: HTMLElement) => {
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
};

export default EmailsInput;
