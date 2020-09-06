import styles from '../styles.scss';

// <button class="actionButton">{text}</button>

type Props = {
    text: string;
};

export const ActionButton = ({ text }: Props): HTMLElement => {
    const element = document.createElement('button');
    element.classList.add(styles.actionButton);
    element.textContent = text;

    return element;
};
