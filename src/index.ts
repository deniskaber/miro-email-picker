import styles from "./styles.scss";
import { EmailInputField } from "./components/emailInputField";
import { EmailsContainer } from "./components/emailsContainer";

const template = `
<div class="${styles.widgetContainer}">
    <div class="${styles.panel}">
        <div class="${styles.panelBody}">
            <p class="${styles.titleText}">Share <span class="${styles.boldText}">Board name</span> with others</p>
        </div>
    </div> 
</div>
`;

const EmailsInput = (rootNode: HTMLElement) => {
    rootNode.innerHTML = template;

    const panel = rootNode.querySelector(`.${styles.panelBody}`) as HTMLElement;
    const emailsContainer = EmailsContainer();
    const inputField = EmailInputField();

    emailsContainer.append(inputField);
    panel.append(emailsContainer);
};

export default EmailsInput;
