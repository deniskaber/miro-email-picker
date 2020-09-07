import styles from '../styles.scss';

// <input type="text" class="emailInput" placeholder="add more people..." spellcheck="false" />

export const EmailInputField = (): HTMLElement => {
    const element = document.createElement('input');
    element.type = 'text';
    element.classList.add(styles.emailInput);
    element.placeholder = 'add more people...';
    element.spellcheck = false;
    element.setAttribute('aria-label', 'add more people');

    return element;
};
