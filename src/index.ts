import styles from "./styles.scss";

const EmailsInput = (rootNode: HTMLElement) => {
    rootNode.innerHTML = `
<div class="${styles.widgetContainer}">
    <p class="${styles.titleText}">Share <span class="${styles.boldText}">Board name</span> with others</p> 
</div>
    `;
};

export default EmailsInput;
