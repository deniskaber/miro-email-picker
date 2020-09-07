import styles from '../styles.scss';
import removeIcon from '../assets/icons/remove.svg';
import { checkEmailValidity } from '../utils/email';

const getTemplate = (email: string) => `
<span class="${styles.emailBlockText}">${email}</span>
<button class="${styles.emailBlockDeleteButton}" aria-label="Remove '${email}'">${removeIcon}</button>
`;

type Props = {
    email: string;
    onRemoveButtonClick: () => void;
};

export const EmailBlock = ({ email, onRemoveButtonClick }: Props): HTMLElement => {
    const element = document.createElement('div');

    element.innerHTML = getTemplate(email);
    element.classList.add(styles.emailBlock);
    element.dataset.email = email;

    if (!checkEmailValidity(email)) {
        element.classList.add(styles.emailBlockInvalid);
    }

    const removeButton = element.querySelector(`.${styles.emailBlockDeleteButton}`) as HTMLButtonElement;
    removeButton.addEventListener('click', () => {
        onRemoveButtonClick();
    });

    return element;
};
