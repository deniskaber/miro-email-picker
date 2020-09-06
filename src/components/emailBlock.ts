import styles from "../styles.scss";
import removeIcon from "../assets/icons/remove.svg";
import { checkEmailValidity } from "../utils/email";

const getTemplate = (email: string) => `
${email}
<button class="${styles.emailBlockDeleteButton}">${removeIcon}</button>
`;

type Props = {
    text: string;
    onRemoveButtonClick: () => void;
};

export const EmailBlock = ({ text, onRemoveButtonClick }: Props): HTMLElement => {
    const element = document.createElement("div");

    element.innerHTML = getTemplate(text);
    element.classList.add(styles.emailBlock);

    if (!checkEmailValidity(text)) {
        element.classList.add(styles.emailBlockInvalid);
    }

    const removeButton = element.querySelector(`.${styles.emailBlockDeleteButton}`) as HTMLButtonElement;
    removeButton.addEventListener("click", () => {
        onRemoveButtonClick();
    });

    return element;
};
