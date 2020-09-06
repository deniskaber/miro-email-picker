import styles from "../styles.scss";
import removeIcon from "../assets/icons/remove.svg";

const getTemplate = (email: string) => `
${email}
<button class="${styles.emailBlockDeleteButton}">${removeIcon}</button>
`;

type Props = {
    text: string;
};

export const EmailBlock = ({ text }: Props): HTMLElement => {
    const element = document.createElement("div");

    element.innerHTML = getTemplate(text);
    element.classList.add(styles.emailBlock);

    return element;
};
