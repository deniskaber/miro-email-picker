import styles from '../styles.scss';

// <div class="emailsContainer"></div>

export const EmailsContainer = (): HTMLElement => {
    const element = document.createElement('div');
    element.classList.add(styles.emailsContainer);

    return element;
};
