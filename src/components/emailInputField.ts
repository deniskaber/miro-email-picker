import styles from '../styles.scss';

// <input type="text" class="emailInput" placeholder="add more people..." />

export const EmailInputField = (): HTMLElement => {
    const element = document.createElement('input');
    element.type = 'text';
    element.classList.add(styles.emailInput);
    element.placeholder = 'add more people...';

    return element;
};
