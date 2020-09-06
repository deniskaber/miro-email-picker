import styles from "./styles.css";

const EmailsInput = (rootNode: HTMLElement) => {
    rootNode.innerHTML = `
<div class="${styles.widgetContainer}">
    Widget will be added here. 
</div>
    `;
};

export default EmailsInput;
